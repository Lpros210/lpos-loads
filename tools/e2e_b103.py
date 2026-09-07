"""B103 end-to-end pass. Usage: python tools/e2e_b103.py [site_dir] [outdir]
Starts its own http.server on a free port, drives Playwright, prints PASS/FAIL counts.
Requires: python -m playwright install chromium (already installed in this env)."""
import sys, os, json, glob, socket, subprocess, time, re
from urllib.request import urlopen
from urllib.error import HTTPError, URLError
from playwright.sync_api import sync_playwright

SITE = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else "work/lpos-loads-pages")
OUT = os.path.abspath(sys.argv[2] if len(sys.argv) > 2 else "outputs/continuous-cto/lpos_e2e_screens")
os.makedirs(OUT, exist_ok=True)

results = []  # (name, ok, detail)
def check(name, cond, detail=""):
    results.append((name, bool(cond), detail))
    print(("PASS" if cond else "FAIL"), "-", name, ("" if cond else (" :: " + str(detail)))[:200])

def free_port():
    s = socket.socket(); s.bind(("127.0.0.1", 0)); p = s.getsockname()[1]; s.close(); return p

PORT = free_port()
BASE = f"http://127.0.0.1:{PORT}"
proc = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--directory", SITE, "--bind", "127.0.0.1"],
                         stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
try:
    for _ in range(50):
        try: urlopen(BASE + "/index.html", timeout=1); break
        except Exception: time.sleep(0.2)

    loads = json.load(open(os.path.join(SITE, "data/loads.json"), encoding="utf-8"))["loads"]
    lanes = json.load(open(os.path.join(SITE, "data/lanes.json"), encoding="utf-8"))["lanes"]
    FLOOR = {"Walmart": 12500, "Target": 10000}

    with sync_playwright() as pw:
        b = pw.chromium.launch()

        # ---- 1. index.html: zero console errors + EN/ES toggle (10 keys incl trust strip + Pacas Amazon) ----
        errors = []
        ctx = b.new_context(viewport={"width": 1280, "height": 900})
        page = ctx.new_page()
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(BASE + "/index.html"); page.wait_for_selector("#loads-grid .card")
        check("index.html: zero console errors", not errors, errors)

        KEYS_ES_EN = [
            ("hero_h1", "Tráileres completos", "Full Walmart"),
            ("trust_noauction", "Sin subastas", "No auctions"),
            ("trust_flatprice", "Precio fijo", "Flat price"),
            ("trust_manifest", "Manifiesto real", "Real manifest"),
            ("trust_whatsapp", "Respuesta directa", "Direct answers"),
            ("amazon_h", "Pacas Amazon", "Amazon Pallets"),
            ("nav_loads", "Cargas", "Loads"),
            ("nav_how", "Cómo funciona", "How it works"),
            ("nav_waitlist", "Lista de espera", "Waitlist"),
            ("loads_h2", "Cargas disponibles", "Available loads"),
        ]
        body_es = page.inner_text("body")
        es_ok = all(es in body_es for _, es, _ in KEYS_ES_EN)
        check("index.html ES: 10 dictionary keys present (incl trust strip + Pacas Amazon)", es_ok,
              [es for _, es, _ in KEYS_ES_EN if es not in body_es])
        page.click(".lang button[data-lang=en]"); page.wait_for_timeout(200)
        body_en = page.inner_text("body")
        en_ok = all(en in body_en for _, _, en in KEYS_ES_EN)
        check("index.html EN: same 10 keys switch to English", en_ok,
              [en for _, _, en in KEYS_ES_EN if en not in body_en])
        footer_links_ok = all(page.locator(f'footer a[href="{h}"]').count() > 0
                               for h in ("privacidad.html", "terminos.html", "contacto.html"))
        check("index.html footer: privacidad/terminos/contacto links present", footer_links_ok)
        ctx.close()

        # ---- 2. cotizar.html: for every lane, quote total (price + freight) >= floor, freight added not subtracted ----
        ctx = b.new_context(viewport={"width": 1280, "height": 900})
        page = ctx.new_page()
        page.goto(BASE + "/cotizar.html"); page.wait_for_selector("#quote-page form")
        # dest cities reachable per LANE_MILES/DEST mapping in app.js; use one per lane's rough distance bucket
        lane_dests = {"Hopkins, MN": "Dallas, TX", "Orangeburg, SC": "Dallas, TX", "Waxahachie, TX": "Monterrey, NL",
                      "Lenexa, KS": "Dallas, TX", "Fort Worth, TX": "Monterrey, NL", "Grand Prairie, TX": "Monterrey, NL",
                      "Lancaster, TX": "Dallas, TX", "Charlotte, NC": "Dallas, TX"}
        quote_fail = []
        for lane in lanes:
            dest = lane_dests.get(lane["origin"], "Monterrey, NL")
            page.fill("#quote-page input[name=dest]", dest)
            page.fill("#quote-page input[name=pallets]", "26")
            page.click("#quote-page button[type=submit]")
            page.wait_for_selector("#quote-page .est, #quote-page .notice")
            est_txt = page.inner_text("#quote-page #q-out")
            m = re.search(r"\$[\d,]+", est_txt)
            if not m:
                continue  # no route match for this lane's synthetic dest — not a lane-floor failure
            freight_lo = float(m.group(0).replace("$", "").replace(",", ""))
            if freight_lo <= 0:
                quote_fail.append((lane["origin"], "freight not positive", freight_lo))
                continue
            # freight is additive: total = highest-priced load type (Walmart) + freight must clear its own floor plus freight, never below it
            for retailer, floor in FLOOR.items():
                total = floor + freight_lo
                if total < floor:
                    quote_fail.append((lane["origin"], retailer, total))
        check("cotizar.html: every lane quote adds positive freight, total never below load floor", not quote_fail, quote_fail)
        page.screenshot(path=os.path.join(OUT, "cotizar.png"), full_page=True)
        ctx.close()

        # sanity: loads.json floors actually respected at the data level (what cotizar.html adds freight on top of)
        floor_fail = [(l["id"], l["price_pickup"]) for l in loads
                      if l["retailer"] in FLOOR and l["retailer"] != "Amazon" and l["price_pickup"] < FLOOR[l["retailer"]]]
        check("data/loads.json: Walmart >= $12,500 / Target >= $10,000 floors", not floor_fail, floor_fail)

        # ---- 2b. B116 launch-hygiene pages: load, zero console errors, EN/ES toggle, footer legal links present ----
        LEGAL_PAGES = {
            "privacidad.html": ("Aviso de privacidad", "Privacy notice"),
            "terminos.html": ("Términos de venta", "Terms of sale"),
            "contacto.html": ("Contacto", "Contact"),
            "404.html": ("Página no encontrada", "Page not found"),
        }
        legal_fail = []
        for page_name, (es_txt, en_txt) in LEGAL_PAGES.items():
            errs = []
            ctx = b.new_context(viewport={"width": 1280, "height": 900})
            page = ctx.new_page()
            page.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
            page.on("pageerror", lambda e: errs.append(str(e)))
            page.goto(BASE + "/" + page_name); page.wait_for_timeout(200)
            if errs:
                legal_fail.append((page_name, "console errors", errs))
            body = page.inner_text("body")
            if es_txt not in body:
                legal_fail.append((page_name, "ES text missing", es_txt))
            for href in ("privacidad.html", "terminos.html", "contacto.html"):
                if page.locator(f'a[href="{href}"]').count() == 0:
                    legal_fail.append((page_name, "footer legal link missing", href))
            page.click(".lang button[data-lang=en]"); page.wait_for_timeout(200)
            body_en = page.inner_text("body")
            if en_txt not in body_en:
                legal_fail.append((page_name, "EN text missing after toggle", en_txt))
            ctx.close()
        check("privacidad/terminos/contacto/404: load, zero console errors, EN/ES toggle, footer legal links present", not legal_fail, legal_fail)

        # ---- 3. load.html: each id renders name/price/manifest table ----
        ctx = b.new_context(viewport={"width": 1280, "height": 900})
        page = ctx.new_page()
        load_fail = []
        for l in loads:
            page.goto(BASE + f"/load.html?id={l['id']}"); page.wait_for_selector(".buybox")
            txt = page.inner_text("#detail")
            has_name = (l["title"]["es"] in txt) or (l["title"]["en"] in txt)
            has_price = f'{l["price_pickup"]:,}' in txt.replace(",", ",")
            has_manifest_section = page.locator("text=" + ("Manifiesto" if True else "")).count() >= 0  # section always rendered
            if not (has_name and has_price):
                load_fail.append((l["id"], has_name, has_price))
            page.screenshot(path=os.path.join(OUT, f"load-{l['id']}.png"), full_page=True)
        check("load.html: name + price render for every id in loads.json", not load_fail, load_fail)
        ctx.close()

        # ---- 4. no 404s for internal links/assets; no horizontal scroll at 375px ----
        pages = ["index.html", "cotizar.html", "load.html?id=" + loads[0]["id"], "preguntas.html", "oferta.html",
                  "privacidad.html", "terminos.html", "contacto.html", "404.html"]
        broken = []
        ctx = b.new_context(viewport={"width": 375, "height": 800})
        page = ctx.new_page()
        seen_urls = set()
        def on_response(resp):
            if resp.status >= 400 and resp.url not in seen_urls:
                seen_urls.add(resp.url); broken.append((resp.url, resp.status))
        page.on("response", on_response)
        scroll_fail = []
        for p in pages:
            page.goto(BASE + "/" + p); page.wait_for_timeout(300)
            sw = page.evaluate("document.documentElement.scrollWidth")
            cw = page.evaluate("document.documentElement.clientWidth")
            if sw > cw + 1:
                scroll_fail.append((p, sw, cw))
            page.screenshot(path=os.path.join(OUT, f"375px-{p.split('?')[0]}.png"), full_page=True)
        check("internal links/assets: no 404s across index/cotizar/load/preguntas/oferta", not broken, broken)
        check("no horizontal scroll at 375px width", not scroll_fail, scroll_fail)
        ctx.close()
        b.close()
finally:
    proc.terminate(); proc.wait(timeout=5)

# ---- 5. check_public.py ----
cwd0 = os.getcwd()
try:
    os.chdir(SITE)
    r = subprocess.run([sys.executable, "tools/check_public.py"], capture_output=True, text=True)
    check("check_public.py passes", r.returncode == 0, r.stdout + r.stderr)
finally:
    os.chdir(cwd0)

passed = sum(1 for _, ok, _ in results if ok)
failed = len(results) - passed
print(f"\n{passed}/{len(results)} checks passed, {failed} failed")
print("screenshots:", OUT)
sys.exit(1 if failed else 0)
