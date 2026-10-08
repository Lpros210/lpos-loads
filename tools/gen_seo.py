"""Generate static (no-JS-required) JSON-LD and inject it into the site HTML.

Why: the site already emits Product/FAQPage JSON-LD client-side (js/app.js), which
is fine for Google but invisible to AI/LLM crawlers (ClaudeBot, GPTBot, etc.) that
fetch raw HTML and don't execute JavaScript. This script writes the same facts as
static <script type="application/ld+json"> blocks between marker comments, so the
JSON-LD is present in the HTML source regardless of JS.

Usage: python tools/gen_seo.py   (run from work/lpos-site-v1/, edits files in place)

Regenerate whenever data/loads.json changes, or the FAQS list below changes (keep
it in sync with the FAQS constant in js/app.js — same convention as the manual
sitemap.xml regen note already in that file).
"""
import json, os, re

from site_config import PHONE_E164

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://lpros210.github.io/lpos-loads/"
WA = "https://wa.me/" + PHONE_E164

with open(os.path.join(ROOT, "data", "loads.json"), encoding="utf-8") as f:
    LOADS = json.load(f)

ORG = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "additionalType": "https://schema.org/Store",
    "name": "Liquidation Pros LLC",
    "url": BASE,
    "image": BASE + "assets/photos/sample/walmart-01.jpg",
    "telephone": "+" + PHONE_E164,
    "email": "juan@lpros.biz",
    "priceRange": "$$",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "709 W Joe Pate Blvd",
        "addressLocality": "Hidalgo",
        "addressRegion": "TX",
        "postalCode": "78557",
        "addressCountry": "US",
    },
    "areaServed": [
        {"@type": "State", "name": "Texas"},
        {"@type": "Country", "name": "Mexico"},
    ],
    "knowsLanguage": ["es", "en"],
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "18:00",
    },
    "contactPoint": [{
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": "+" + PHONE_E164,
        "url": WA,
        "areaServed": ["US", "MX"],
        "availableLanguage": ["Spanish", "English"],
    }],
    "sameAs": [WA],
}

# Public listing data only (price_pickup / status) — never the internal PNL/margin
# figures in outputs/continuous-cto/LOAD_PNL_*.csv, which are confidential vendor
# cost/margin data and must not be published on the public site.
def product_items():
    items = []
    for l in LOADS["loads"]:
        url = BASE + "load.html?id=" + l["id"]
        items.append({
            "@type": "Product",
            "name": l["title"]["es"],
            "sku": l["id"],
            "brand": {"@type": "Brand", "name": l["retailer"]},
            "url": url,
            "offers": {
                "@type": "Offer",
                "url": url,
                "priceCurrency": "USD",
                "price": l["price_pickup"],
                "availability": "https://schema.org/InStock" if l["status"] == "available" else "https://schema.org/SoldOut",
                "itemCondition": "https://schema.org/UsedCondition",
                "seller": {"@type": "Organization", "name": "Liquidation Pros LLC"},
            },
        })
    return items

PRODUCTS = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "item": item}
        for i, item in enumerate(product_items())
    ],
}

# Kept in sync by hand with the FAQS constant in js/app.js (topics: manifests,
# pricing, freight, pickup, border, payment, timing) — verbatim ES text, source
# outputs/ads/FAQ_AND_ANSWERS_2026-09-07.md.
FAQS_ES = [
    "¿El manifiesto es real o es genérico?",
    "¿Puedo ver el manifiesto antes de pagar?",
    "¿El precio incluye el flete o es solo la mercancía?",
    "¿Ustedes organizan el flete o solo venden la mercancía?",
    "¿Cuánto cuesta el flete de Waco o Hidalgo hasta mi bodega?",
    "¿Puedo usar mi propio transportista para recoger la carga?",
    "He tenido problemas con la transportista que ustedes usan — ¿qué pasa si el flete falla o se cancela?",
    "¿Dónde recojo la mercancía?",
    "¿Necesito cita para recoger o puedo llegar directo?",
    "¿Cómo confirmo que mi pago (Zelle/transferencia) ya fue recibido?",
    "¿Con qué frecuencia tienen cargas nuevas disponibles?",
    "¿Tienen mercancía disponible ahora mismo?",
    "¿Puedo recoger directo en la frontera para ahorrar en flete?",
    "¿Qué necesito para cruzar la carga a México como exportador?",
]
FAQ_ANSWERS_ES = [
    "Real — los manifiestos vienen de los datos reales del listado del minorista, no de una plantilla genérica. Los manifiestos pueden tener un pequeño margen de error, igual que en toda la industria — es estándar.",
    "Sí — le enviamos el manifiesto para que revise el contenido y el valor estimado de venta al menudeo antes de comprometerse con una carga.",
    "El precio de la mercancía y el flete se cotizan por separado — así puede elegir recoger usted mismo (Hidalgo/Waco, TX) o que le coticemos el flete hasta su bodega. Le damos ambos números para que quede claro.",
    "Las dos opciones dentro de EE. UU. — puede organizar su propio flete/recolección, o le cotizamos el flete usando costos reales recientes de esa ruta hasta su bodega. Para México no organizamos ni cotizamos flete transfronterizo: recoja usted mismo, mande su propio transportista, o indíquenos su empresa de flete preferida para que recoja en nuestra bodega de Hidalgo, TX.",
    "Depende de la ruta, cantidad de tarimas, peso y si necesita rampa hidráulica. Mándenos por WhatsApp su destino y el tamaño de la carga y le damos un estimado basado en cargas recientes comparables — el costo final se confirma con la transportista antes de darle un número en firme.",
    "Sí — puede mandar su propio transportista a recoger en Hidalgo o Waco, TX. Solo confirme con nosotros la fecha/hora de recolección antes.",
    "Nos tomamos en serio la confiabilidad de la transportista y estamos trabajando activamente en problemas de flete en algunas rutas. Avísenos de inmediato si una recolección se reprograma o se cae una cita y lo escalamos — es un problema conocido que estamos resolviendo activamente, no algo que vamos a ignorar.",
    "La recolección es en nuestras ubicaciones de Hidalgo, TX y Waco, TX, según dónde esté la carga específica. Le confirmamos la dirección exacta una vez que su carga esté lista.",
    "Por favor confirme una cita de recolección con nosotros primero por WhatsApp para tener la carga lista y el papeleo correcto preparado.",
    "Mándenos por WhatsApp una captura de pantalla o el número de confirmación de su pago y lo verificamos y le confirmamos.",
    "Nos movemos rápido — no almacenamos inventario, así que las cargas rotan en cuestión de un día tras llegar. La disponibilidad depende de lo que esté entrando. Escríbanos por WhatsApp y le decimos qué hay disponible ahora mismo.",
    "Escríbanos por WhatsApp y le decimos exactamente qué tenemos disponible hoy — la disponibilidad cambia rápido porque no almacenamos las cargas.",
    "Sí — recolección en 709 W Joe Pate Blvd, Hidalgo, TX 78557, a un paso del puente Hidalgo–Reynosa. El flete arreglado por el vendedor en estas rutas cortas de Texas puede costar $4–7 por milla; recogiendo usted mismo en la frontera, cargas comparables corren más cerca de $2 por milla.",
    "Antes de que liberemos la carga tenga listo: identificación oficial del chofer, nombre de la transportista y placas del tractocamión/remolque, ventana de recolección confirmada, comprobante de pago recibido (wire o Zelle), RFC del exportador, pedimento de exportación o documento aduanal correspondiente, y una persona de contacto en sitio para firmar la lista de empaque.",
]
assert len(FAQS_ES) == len(FAQ_ANSWERS_ES)

FAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
        for q, a in zip(FAQS_ES, FAQ_ANSWERS_ES)
    ],
}


def block(marker, obj):
    payload = json.dumps(obj, ensure_ascii=False, indent=2)
    return f'<!-- SEO:{marker} -->\n<script type="application/ld+json">\n{payload}\n</script>\n<!-- /SEO:{marker} -->'


def inject(path, marker, obj):
    with open(path, encoding="utf-8") as f:
        html = f.read()
    pattern = re.compile(
        rf"<!-- SEO:{marker} -->.*?<!-- /SEO:{marker} -->", re.DOTALL
    )
    if not pattern.search(html):
        return False
    html = pattern.sub(lambda _m: block(marker, obj), html, count=1)
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    return True


def main():
    pages = [f for f in os.listdir(ROOT) if f.endswith(".html")]
    touched = []
    for page in pages:
        path = os.path.join(ROOT, page)
        if inject(path, "ORG", ORG):
            touched.append(f"{page}:ORG")
        if inject(path, "PRODUCTS", PRODUCTS):
            touched.append(f"{page}:PRODUCTS")
        if inject(path, "FAQ", FAQ):
            touched.append(f"{page}:FAQ")
    print("injected:", ", ".join(touched))


if __name__ == "__main__":
    main()
