/* Liquidation Pros site v1 — vanilla JS, no build. ES first, EN toggle. */
(function () {
  "use strict";

  /* ---------- i18n dictionary (single source for both languages) ---------- */
  const T = {
    es: {
      tagline: "Tráileres de liquidación · Texas → México",
      nav_loads: "Cargas", nav_how: "Cómo funciona", nav_waitlist: "Lista de espera", nav_faq: "Preguntas", nav_contact: "Contacto",
      hero_eyebrow: "Mayorista B2B · Hidalgo, Texas",
      hero_h1: "Tráileres completos de Walmart y Target, a precio fijo. Sin subastas.",
      hero_lead: "Compre la carga completa hoy, recoja en Texas o pídanos cotización puesta en su bodega. Las cargas llegan y se venden en 24 horas: entre a la lista de espera para que le avisemos primero.",
      hero_cta_loads: "Ver cargas disponibles", hero_cta_wait: "Entrar a la lista de espera",
      fact_loads: "cargas disponibles", fact_window: "para vender cada carga", fact_border: "frontera con Reynosa",
      hero_caption: "Foto real de un tráiler Target que vendimos (julio 2026).",
      loads_h2: "Cargas disponibles", loads_sub: "Precio fijo por tráiler completo. Reserve o compre; primero en reservar, primero en cargar.",
      loads_sold_h2: "Vendidas recientemente", loads_sold_sub: "Para que vea lo que normalmente llega.",
      status_available: "Disponible", status_sold: "Vendida", status_reserved: "Reservada",
      units: "Unidades", pallets: "Tarimas", location: "Ubicación", weight: "Peso aprox.", condition: "Condición",
      price_pickup: "Precio recogiendo en Texas", price_pickup_short: "recogiendo en TX", per_unit: "por unidad",
      delivered_quote: "Puesto en su bodega: cotizamos", see_load: "Ver carga", reserve: "Reservar", buy: "Comprar ahora", quote: "Cotizar flete",
      photo_pending: "Fotos pendientes", photo_pending_sub: "Se toman cuando el tráiler llega. Pídalas por WhatsApp.",
      how_h2: "Cómo funciona", how_sub: "Cuatro pasos. Sin cuenta, sin subasta.",
      how1_h: "Vea la carga", how1_p: "Unidades, tarimas, condición, ubicación y precio fijo en la misma pantalla.",
      how2_h: "Reserve o compre", how2_p: "Reservar aparta la carga 24 h mientras confirma pago. Comprar ahora la cierra.",
      how3_h: "Pague", how3_p: "Transferencia, wire o depósito. Le enviamos factura de Zoho al confirmar.",
      how4_h: "Recoja o se la enviamos", how4_p: "Recoja con su transportista o pídanos flete a Reynosa, Monterrey, Guadalajara o CDMX.",
      wait_h2: "Lista de espera de compradores", wait_sub: "Las cargas nuevas se avisan primero a la lista. Díganos qué busca y le escribimos por WhatsApp cuando llegue algo que le sirva.",
      f_name: "Nombre", f_company: "Empresa (opcional)", f_phone: "WhatsApp / teléfono", f_email: "Correo (opcional)", f_city: "Ciudad de entrega",
      f_retailers: "Qué le interesa", f_budget: "Presupuesto por tráiler (USD)", f_notes: "Comentarios",
      f_consent: "Acepto que Liquidation Pros me contacte por WhatsApp o correo sobre cargas disponibles.",
      f_submit_wait: "Entrar a la lista", f_send_wa: "Enviar por WhatsApp", f_send_mail: "Enviar por correo",
      f_qty: "Tarimas o unidades", f_dest: "Destino (ciudad, estado)", f_zip: "Código postal / CP",
      f_offer: "Su oferta (USD)", f_offer_hint: "Ofertas razonables se responden el mismo día.",
      form_saved: "Guardado en este teléfono. Ahora envíelo por WhatsApp o correo para que lo recibamos:",
      faq_h2: "Preguntas frecuentes",
      faq1_q: "¿Qué condición tiene la mercancía?", faq1_a: "Cargas Walmart RC Bulk son devoluciones de tienda y sobrantes sin revisar, mezcladas: nuevo en caja, caja abierta y algo dañado. No se garantiza pieza por pieza; se vende por tráiler completo tal como está.",
      faq2_q: "¿Puedo ver el manifiesto?", faq2_a: "Sí. Cada carga trae el manifiesto (CSV) del vendedor con categorías y cantidades. Pídalo por WhatsApp con el número de carga.",
      faq3_q: "¿Cuánto tiempo tengo para decidir?", faq3_a: "Las cargas se venden en 24 horas desde que llegan. Reservar aparta la carga 24 h; si no confirma pago, pasa al siguiente de la lista.",
      faq4_q: "¿Cómo pago?", faq4_a: "Transferencia bancaria (wire/ACH) o depósito en USD. Emitimos factura formal desde Zoho. No aceptamos crédito en la primera compra.",
      faq5_q: "¿Envían a México?", faq5_a: "Cotizamos flete hasta su bodega en México con transportistas conocidos. El cruce y la importación corren por cuenta del comprador o de su agente aduanal.",
      faq6_q: "¿Venden por tarima?", faq6_a: "Normalmente por tráiler completo. Si una carga se abre por tarimas lo indicamos en la ficha.",
      contact_h2: "Contacto", contact_sub: "Hablamos español e inglés. Respondemos más rápido por WhatsApp.",
      contact_wa: "WhatsApp", contact_phone: "Llamar", contact_mail: "Correo", contact_addr: "Bodega",
      contact_form_h: "Escríbanos", f_msg: "Mensaje",
      ftr_about: "Liquidation Pros LLC compra tráileres de liquidación de Walmart, Target, Sam's Club y otros directamente en EE. UU. y los vende a mayoristas en Texas y México.",
      ftr_fine: "Precios en USD, recogiendo en Texas salvo indicación. Mercancía vendida tal como está. Los nombres de tiendas son marcas de sus dueños y se usan solo para describir el origen.",
      back: "Todas las cargas", ref: "Ref.", listed: "Llegó", sale_window: "Se vende en 24 h", window_note: "Ventana de venta: 24 h desde que llega el tráiler. Primero que reserve, primero que carga.",
      condition_h: "Condición", manifest_h: "Manifiesto por categoría", photos_h: "Fotos del tráiler",
      manifest_pending: "El manifiesto completo (CSV del vendedor) está disponible. Pídalo por WhatsApp con la referencia de la carga; el desglose por categoría se mostrará aquí cuando lo importemos.",
      manifest_none: "Esta carga se vendió sin manifiesto por categoría. Categorías vistas en el tráiler:",
      cat: "Categoría", qty: "Unidades", retail: "Valor de tienda", note: "Nota",
      retail_note: "Valor de tienda ≠ precio de reventa.",
      cond_returns_mixed: "Devoluciones y sobrantes sin revisar, mezclados",
      cond_returns_mixed_p: "Mercancía general de centro de devoluciones Walmart: nuevo en caja, caja abierta y piezas dañadas mezcladas. Sin clasificar. Se vende el tráiler completo tal como está.",
      cond_salvage: "Salvage (dañado / caja abierta)",
      cond_salvage_p: "Tarimas marcadas salvage por Target: empaques abiertos o dañados, producto usable en su mayoría. Se vende tal como está.",
      pickup_h: "Recogiendo en", pickup_p: "Usted o su transportista cargan en la ubicación indicada. Cita previa.",
      delivered_h: "Puesto en su bodega", delivered_p: "Cotizamos flete a la frontera o al interior de México. Diga su ciudad.",
      fine_buybox: "Precio fijo por tráiler completo, USD, sin IVA de EE. UU. Sin comisiones de plataforma.",
      wa_open: "Se abrirá WhatsApp con el mensaje listo.", mail_open: "Se abrirá su correo con el mensaje listo.",
      dlg_reserve: "Reservar esta carga", dlg_buy: "Comprar esta carga", dlg_quote: "Cotizar flete", dlg_wait: "Lista de espera",
      opt_pickup: "Recojo en Texas", opt_delivered: "Puesto en mi bodega (cotizar)",
      sold_banner: "Esta carga ya se vendió. Entre a la lista de espera para la siguiente.",
      err_required: "Faltan datos obligatorios.",
      any: "Cualquiera",
    },
    en: {
      tagline: "Liquidation truckloads · Texas → Mexico",
      nav_loads: "Loads", nav_how: "How it works", nav_waitlist: "Waitlist", nav_faq: "FAQ", nav_contact: "Contact",
      hero_eyebrow: "B2B wholesaler · Hidalgo, Texas",
      hero_h1: "Full Walmart and Target truckloads at a fixed price. No auctions.",
      hero_lead: "Buy the whole load today, pick up in Texas or ask for a delivered quote to your warehouse. Loads land and sell within 24 hours — join the waitlist to hear first.",
      hero_cta_loads: "See available loads", hero_cta_wait: "Join the waitlist",
      fact_loads: "loads available", fact_window: "to sell each load", fact_border: "on the Reynosa border",
      hero_caption: "Real photo of a Target truckload we sold (July 2026).",
      loads_h2: "Available loads", loads_sub: "Fixed price per full truckload. Reserve or buy; first to reserve, first to load.",
      loads_sold_h2: "Recently sold", loads_sold_sub: "So you can see what usually comes in.",
      status_available: "Available", status_sold: "Sold", status_reserved: "Reserved",
      units: "Units", pallets: "Pallets", location: "Location", weight: "Approx. weight", condition: "Condition",
      price_pickup: "Price picked up in Texas", price_pickup_short: "picked up in TX", per_unit: "per unit",
      delivered_quote: "Delivered to your warehouse: we quote", see_load: "View load", reserve: "Reserve", buy: "Buy now", quote: "Shipping quote",
      photo_pending: "Photos pending", photo_pending_sub: "Taken when the trailer lands. Ask on WhatsApp.",
      how_h2: "How it works", how_sub: "Four steps. No account, no auction.",
      how1_h: "Look at the load", how1_p: "Units, pallets, condition, location and fixed price on one screen.",
      how2_h: "Reserve or buy", how2_p: "Reserve holds the load 24 h while you confirm payment. Buy now closes it.",
      how3_h: "Pay", how3_p: "Wire, ACH or deposit. We send a Zoho invoice on confirmation.",
      how4_h: "Pick up or we ship", how4_p: "Pick up with your carrier or ask us for freight to Reynosa, Monterrey, Guadalajara or CDMX.",
      wait_h2: "Buyer waitlist", wait_sub: "New loads go to the waitlist first. Tell us what you want and we message you on WhatsApp when a fit lands.",
      f_name: "Name", f_company: "Company (optional)", f_phone: "WhatsApp / phone", f_email: "Email (optional)", f_city: "Delivery city",
      f_retailers: "What you want", f_budget: "Budget per truckload (USD)", f_notes: "Notes",
      f_consent: "I agree that Liquidation Pros may contact me on WhatsApp or email about available loads.",
      f_submit_wait: "Join the waitlist", f_send_wa: "Send via WhatsApp", f_send_mail: "Send via email",
      f_qty: "Pallets or units", f_dest: "Destination (city, state)", f_zip: "ZIP / postal code",
      f_offer: "Your offer (USD)", f_offer_hint: "Reasonable offers get a same-day answer.",
      form_saved: "Saved on this device. Now send it on WhatsApp or email so we receive it:",
      faq_h2: "Frequently asked questions",
      faq1_q: "What condition is the merchandise?", faq1_a: "Walmart RC Bulk loads are unsorted store returns and overstock, mixed: new in box, open box and some damaged. Not guaranteed piece by piece; sold by the full truckload as-is.",
      faq2_q: "Can I see the manifest?", faq2_a: "Yes. Every load comes with the seller's manifest (CSV) with categories and quantities. Ask on WhatsApp with the load number.",
      faq3_q: "How long do I have to decide?", faq3_a: "Loads sell within 24 hours of arrival. A reservation holds the load 24 h; if payment is not confirmed it goes to the next buyer on the list.",
      faq4_q: "How do I pay?", faq4_a: "Bank wire/ACH or USD deposit. We issue a formal Zoho invoice. No credit on a first purchase.",
      faq5_q: "Do you ship to Mexico?", faq5_a: "We quote freight to your warehouse in Mexico with carriers we know. Border crossing and import are the buyer's or their broker's responsibility.",
      faq6_q: "Do you sell by the pallet?", faq6_a: "Usually by the full truckload. If a load is split into pallets we say so on the listing.",
      contact_h2: "Contact", contact_sub: "We speak Spanish and English. WhatsApp gets the fastest reply.",
      contact_wa: "WhatsApp", contact_phone: "Call", contact_mail: "Email", contact_addr: "Warehouse",
      contact_form_h: "Message us", f_msg: "Message",
      ftr_about: "Liquidation Pros LLC buys Walmart, Target, Sam's Club and other liquidation truckloads directly in the US and sells them to wholesalers in Texas and Mexico.",
      ftr_fine: "Prices in USD, picked up in Texas unless stated. Merchandise sold as-is. Retailer names are trademarks of their owners and are used only to describe origin.",
      back: "All loads", ref: "Ref.", listed: "Landed", sale_window: "Sells in 24 h", window_note: "Sale window: 24 h from when the trailer lands. First to reserve, first to load.",
      condition_h: "Condition", manifest_h: "Manifest by category", photos_h: "Truck photos",
      manifest_pending: "The full manifest (seller CSV) is available. Ask on WhatsApp with the load reference; the category breakdown will show here once imported.",
      manifest_none: "This load sold without a category manifest. Categories seen in the truck:",
      cat: "Category", qty: "Units", retail: "Retail value", note: "Note",
      retail_note: "Retail value ≠ resale price.",
      cond_returns_mixed: "Unsorted returns and overstock, mixed",
      cond_returns_mixed_p: "General merchandise from a Walmart return center: new in box, open box and damaged pieces mixed together. Unsorted. Sold as a full truckload, as-is.",
      cond_salvage: "Salvage (damaged / open box)",
      cond_salvage_p: "Pallets marked salvage by Target: open or damaged packaging, product mostly usable. Sold as-is.",
      pickup_h: "Picked up at", pickup_p: "You or your carrier load at the listed location. By appointment.",
      delivered_h: "Delivered to your warehouse", delivered_p: "We quote freight to the border or inland Mexico. Tell us your city.",
      fine_buybox: "Fixed price per full truckload, USD, no US sales tax. No platform fees.",
      wa_open: "WhatsApp will open with the message ready.", mail_open: "Your email app will open with the message ready.",
      dlg_reserve: "Reserve this load", dlg_buy: "Buy this load", dlg_quote: "Shipping quote", dlg_wait: "Waitlist",
      opt_pickup: "I pick up in Texas", opt_delivered: "Delivered to my warehouse (quote)",
      sold_banner: "This load has sold. Join the waitlist for the next one.",
      err_required: "Required fields are missing.",
      any: "Any",
    },
  };

  /* ---------- state ---------- */
  let lang = "es";
  try { lang = localStorage.getItem("lpos.lang") || "es"; } catch (e) {}
  if (lang !== "en") lang = "es"; // Spanish-first default; EN only when the buyer chose it
  let DATA = null;
  const t = (k) => (T[lang] && T[lang][k]) || T.es[k] || k;
  const L = (obj) => (obj && typeof obj === "object" ? (obj[lang] || obj.es || "") : (obj || ""));
  const money = (n) => n == null ? "—" : new Intl.NumberFormat(lang === "es" ? "es-MX" : "en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  const num = (n) => n == null ? "—" : new Intl.NumberFormat(lang === "es" ? "es-MX" : "en-US").format(n);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtDate = (iso) => iso ? new Date(iso + "T12:00:00").toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { day: "numeric", month: "short" }) : "";

  function applyStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  }

  function setLang(l) {
    lang = l === "en" ? "en" : "es";
    try { localStorage.setItem("lpos.lang", lang); } catch (e) {}
    render();
  }

  /* ---------- contact links ---------- */
  function waLink(text) { return "https://wa.me/" + DATA.contact.whatsapp_e164 + "?text=" + encodeURIComponent(text); }
  function mailLink(subject, body) { return "mailto:" + DATA.contact.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body); }

  function fillContact() {
    const c = DATA.contact;
    document.querySelectorAll("[data-wa]").forEach((a) => { a.href = waLink(a.dataset.wa || (lang === "es" ? "Hola, vi su sitio de cargas." : "Hi, I saw your loads site.")); });
    document.querySelectorAll("[data-tel]").forEach((a) => { a.href = "tel:+" + c.whatsapp_e164; a.textContent = c.phone_display; });
    document.querySelectorAll("[data-mail]").forEach((a) => { a.href = "mailto:" + c.email; a.textContent = c.email; });
    document.querySelectorAll("[data-addr]").forEach((el) => { el.textContent = c.address; });
    document.querySelectorAll("[data-hours]").forEach((el) => { el.textContent = L(c.hours); });
  }

  /* ---------- cards ---------- */
  function photoBlock(load, cls) {
    if (load.photos && load.photos.length) {
      const p = load.photos[0];
      return `<img src="${esc(p.src)}" alt="${esc(L(p.alt))}" loading="lazy" width="1600" height="1200">`;
    }
    return `<div class="ph-placeholder" role="img" aria-label="${esc(t("photo_pending"))}"><div><b>${esc(t("photo_pending"))}</b>${esc(t("photo_pending_sub"))}</div></div>`;
  }
  function statusPill(load) {
    const k = "status_" + load.status;
    const cls = load.status === "available" ? "pill-live" : "pill-sold";
    return `<span class="pill ${cls}">${esc(t(k))}</span>`;
  }
  function card(load) {
    const perUnit = load.units && load.price_pickup ? (load.price_pickup / load.units) : null;
    const href = "load.html?id=" + encodeURIComponent(load.id);
    return `<article class="card">
      <a class="ph" href="${href}" aria-label="${esc(L(load.title))}">${photoBlock(load)}
        <div class="tags">${statusPill(load)}${load.status === "available" ? `<span class="pill pill-red">${esc(t("sale_window"))}</span>` : ""}</div>
      </a>
      <div class="body">
        <div class="retailer">${esc(load.retailer)} · ${esc(t("ref"))} ${esc(load.id)}</div>
        <h3><a href="${href}" style="text-decoration:none">${esc(L(load.title))}</a></h3>
        <div class="meta">
          <div>${esc(t("units"))}: <b>${num(load.units)}</b></div>
          <div>${esc(t("pallets"))}: <b>${esc(load.pallets)}</b></div>
          <div>${esc(t("location"))}: <b>${esc(load.location.city)}</b></div>
          <div>${esc(t("condition"))}: <b>${esc(t("cond_" + load.condition_code).split(" (")[0].split(",")[0])}</b></div>
        </div>
        <div class="price">
          <div><strong>${money(load.price_pickup)}</strong><br><small>${esc(t("price_pickup_short"))}</small></div>
          <div class="unit">${perUnit ? `<b>${money2(perUnit)}</b><br><small>${esc(t("per_unit"))}</small>` : `<small>${esc(t("delivered_quote"))}</small>`}</div>
        </div>
        ${load.status === "available"
          ? `<div class="cta-row"><a class="btn btn-red btn-sm" href="${href}#reserve">${esc(t("reserve"))}</a><a class="btn btn-line btn-sm" href="${href}">${esc(t("see_load"))}</a></div>`
          : `<div class="cta-row"><a class="btn btn-line btn-sm" href="${href}">${esc(t("see_load"))}</a></div>`}
      </div>
    </article>`;
  }
  function money2(n) { return new Intl.NumberFormat(lang === "es" ? "es-MX" : "en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n); }

  function renderHome() {
    const avail = DATA.loads.filter((l) => l.status === "available");
    const sold = DATA.loads.filter((l) => l.status !== "available");
    const g = document.getElementById("loads-grid");
    if (g) g.innerHTML = avail.length ? avail.map(card).join("") : `<div class="empty">${lang === "es" ? "No hay cargas publicadas ahora. Entre a la lista de espera." : "No loads listed right now. Join the waitlist."}</div>`;
    const s = document.getElementById("sold-grid");
    if (s) s.innerHTML = sold.map(card).join("");
    const n = document.getElementById("fact-loads"); if (n) n.textContent = String(avail.length);
    const hp = document.getElementById("hero-photo");
    if (hp) {
      const withPhoto = DATA.loads.find((l) => l.photos && l.photos.length);
      hp.innerHTML = withPhoto ? `<img src="${esc(withPhoto.photos[0].src)}" alt="${esc(L(withPhoto.photos[0].alt))}" width="1600" height="1200" fetchpriority="high">` : "";
    }
  }

  /* ---------- load detail ---------- */
  function renderDetail() {
    const id = new URLSearchParams(location.search).get("id");
    const load = DATA.loads.find((l) => l.id === id) || DATA.loads[0];
    const root = document.getElementById("detail");
    if (!root) return;
    document.title = `${L(load.title)} · ${load.id} · Liquidation Pros`;
    const perUnit = load.units && load.price_pickup ? load.price_pickup / load.units : null;
    const condKey = "cond_" + load.condition_code;
    const photos = load.photos && load.photos.length
      ? `<div class="gallery" id="gallery" aria-label="${esc(t("photos_h"))}">${load.photos.map((p, i) => `<figure id="ph${i}"><img src="${esc(p.src)}" alt="${esc(L(p.alt))}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} width="1600" height="1200"><figcaption>${esc(L(p.alt))}</figcaption></figure>`).join("")}</div>
         <div class="thumbs">${load.photos.map((p, i) => `<button type="button" data-ph="${i}" aria-current="${i === 0}" aria-label="${lang === "es" ? "Foto" : "Photo"} ${i + 1}"><img src="${esc(p.src)}" alt="" loading="lazy"></button>`).join("")}</div>`
      : `<div class="gallery"><figure><div class="ph-placeholder"><div><b>${esc(t("photo_pending"))}</b>${esc(t("photo_pending_sub"))}</div></div></figure></div>`;

    let manifest;
    if (load.manifest && load.manifest.length) {
      manifest = `<div class="table-wrap"><table><thead><tr><th>${esc(t("cat"))}</th><th class="num">${esc(t("qty"))}</th><th class="num">${esc(t("retail"))}</th><th>${esc(t("note"))}</th></tr></thead><tbody>${load.manifest.map((m) => `<tr><td>${esc(L(m.category))}</td><td class="num">${num(m.units)}</td><td class="num">${money(m.retail)}</td><td>${esc(L(m.note))}</td></tr>`).join("")}</tbody></table></div><p class="hint" style="color:var(--muted);font-size:.8rem;margin-top:.5rem">${esc(t("retail_note"))}</p>`;
    } else if (load.manifest_status === "csv_attached_in_zoho") {
      manifest = `<div class="notice">${esc(t("manifest_pending"))} <a data-wa="${esc((lang === "es" ? "Hola, me interesa el manifiesto de la carga " : "Hi, I'd like the manifest for load ") + load.id)}" href="#">WhatsApp →</a></div>`;
    } else {
      manifest = `<p style="color:var(--ink-2)">${esc(t("manifest_none"))}</p><div class="chips">${(load.categories_seen || []).map((c) => `<span>${esc(L(c))}</span>`).join("")}</div>`;
    }

    const isAvail = load.status === "available";
    root.innerHTML = `
      <div class="main">
        <div class="d-head">
          <div class="retailer">${esc(load.retailer)} · ${esc(L(load.program))}</div>
          <h1>${esc(L(load.title))}</h1>
          <div class="sub">${statusPill(load)} <span>${esc(t("ref"))} ${esc(load.id)}</span>${load.po ? `<span>· ${esc(load.po)}</span>` : ""}<span>· ${esc(t("listed"))} ${esc(fmtDate(load.listed))}</span></div>
        </div>
        ${!isAvail ? `<div class="notice" style="margin-bottom:1rem">${esc(t("sold_banner"))} <a href="index.html#waitlist">${esc(t("nav_waitlist"))} →</a></div>` : ""}
        ${photos}
        <div class="kv">
          <div><span>${esc(t("units"))}</span><b>${num(load.units)}</b></div>
          <div><span>${esc(t("pallets"))}</span><b>${esc(load.pallets)}</b></div>
          <div><span>${esc(t("weight"))}</span><b>${load.weight_lb ? num(load.weight_lb) + " lb" : "—"}</b></div>
          <div><span>${esc(t("location"))}</span><b>${esc(load.location.city)}</b></div>
        </div>
        <section class="block"><h2>${esc(t("condition_h"))}</h2><div class="cond"><p><b>${esc(t(condKey))}.</b> ${esc(t(condKey + "_p"))}</p></div></section>
        <section class="block"><h2>${esc(t("manifest_h"))}</h2>${manifest}</section>
        <section class="block"><h2>${esc(t("location"))}</h2><div class="cond"><p><b>${esc(t("pickup_h"))} ${esc(load.location.name)}, ${esc(load.location.city)}.</b> ${esc(t("pickup_p"))}</p><p style="margin-top:.5rem"><b>${esc(t("delivered_h"))}.</b> ${esc(t("delivered_p"))}</p></div></section>
      </div>
      <aside class="side">
        <div class="buybox" id="reserve">
          <div class="p-main"><strong>${money(load.price_pickup)}</strong><span>USD</span></div>
          <div class="p-sub">${esc(t("price_pickup"))}${perUnit ? ` · ${money2(perUnit)} ${esc(t("per_unit"))}` : ""}</div>
          <div class="opts">
            <div class="opt"><div><b>${esc(t("opt_pickup"))}</b><small>${esc(load.location.city)}</small></div><div class="amt">${money(load.price_pickup)}</div></div>
            <div class="opt"><div><b>${esc(t("opt_delivered"))}</b><small>MX / TX</small></div><div class="amt">${load.price_delivered ? money(load.price_delivered) : (lang === "es" ? "Cotizar" : "Quote")}</div></div>
          </div>
          ${isAvail ? `<div class="actions">
            <button class="btn btn-red" data-open="reserve">${esc(t("reserve"))}</button>
            <button class="btn btn-dark" data-open="buy">${esc(t("buy"))}</button>
            <button class="btn btn-line" data-open="quote">${esc(t("quote"))}</button>
            <a class="btn btn-wa" data-wa="${esc((lang === "es" ? "Hola, me interesa la carga " : "Hi, I'm interested in load ") + load.id + " (" + L(load.title) + ")")}" href="#">WhatsApp</a>
          </div>` : `<div class="actions"><a class="btn btn-red" href="index.html#waitlist">${esc(t("hero_cta_wait"))}</a></div>`}
          <p class="fine">${esc(t("window_note"))}<br>${esc(t("fine_buybox"))}</p>
        </div>
      </aside>`;
    const sticky = document.getElementById("sticky");
    if (sticky) {
      sticky.hidden = !isAvail;
      sticky.innerHTML = `<div class="price">${money(load.price_pickup)}<small>${esc(t("price_pickup_short"))}</small></div><button class="btn btn-red" data-open="reserve">${esc(t("reserve"))}</button><a class="btn btn-wa" data-wa="${esc((lang === "es" ? "Hola, me interesa la carga " : "Hi, I'm interested in load ") + load.id)}" href="#" aria-label="WhatsApp">WA</a>`;
    }
    root.querySelectorAll("[data-ph]").forEach((b) => b.addEventListener("click", () => {
      document.getElementById("ph" + b.dataset.ph).scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      root.querySelectorAll("[data-ph]").forEach((x) => x.setAttribute("aria-current", x === b));
    }));
    document.querySelectorAll("[data-open]").forEach((b) => b.addEventListener("click", () => openDialog(b.dataset.open, load)));
    if (location.hash === "#reserve" && isAvail) setTimeout(() => openDialog("reserve", load), 200);
  }

  /* ---------- dialogs / forms (localStorage + WhatsApp/mailto) ---------- */
  function openDialog(kind, load) {
    const d = document.getElementById("dlg");
    const isQuote = kind === "quote", isBuy = kind === "buy";
    document.getElementById("dlg-title").textContent = t("dlg_" + kind);
    document.getElementById("dlg-body").innerHTML = `
      <form class="form" id="f-${kind}" novalidate>
        <div class="notice" style="background:var(--bg-2);border-left-color:var(--black)"><b>${esc(load.retailer)} · ${esc(load.id)}</b> · ${money(load.price_pickup)} ${esc(t("price_pickup_short"))}</div>
        <div class="row">
          <label>${esc(t("f_name"))} *<input name="name" required autocomplete="name"></label>
          <label>${esc(t("f_company"))}<input name="company" autocomplete="organization"></label>
        </div>
        <div class="row">
          <label>${esc(t("f_phone"))} *<input name="phone" type="tel" required autocomplete="tel" inputmode="tel"></label>
          <label>${esc(t("f_email"))}<input name="email" type="email" autocomplete="email"></label>
        </div>
        ${isQuote ? `<div class="row"><label>${esc(t("f_dest"))} *<input name="dest" required></label><label>${esc(t("f_zip"))}<input name="zip" inputmode="numeric"></label></div>`
          : `<label>${lang === "es" ? "Entrega" : "Delivery"}<select name="delivery"><option value="pickup">${esc(t("opt_pickup"))}</option><option value="delivered">${esc(t("opt_delivered"))}</option></select></label>`}
        ${kind === "reserve" ? `<label>${esc(t("f_offer"))}<input name="offer" inputmode="numeric" placeholder="${load.price_pickup}"><span class="hint">${esc(t("f_offer_hint"))}</span></label>` : ""}
        <label>${esc(t("f_notes"))}<textarea name="notes"></textarea></label>
        <label class="check"><input type="checkbox" name="consent" required><span>${esc(t("f_consent"))}</span></label>
        <div id="dlg-out"></div>
        <button class="btn btn-red btn-block" type="submit">${esc(isBuy ? t("buy") : isQuote ? t("quote") : t("reserve"))}</button>
      </form>`;
    const form = document.getElementById("f-" + kind);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const f = Object.fromEntries(new FormData(form).entries());
      const rec = { kind, load: load.id, ts: new Date().toISOString(), lang, ...f };
      saveLocal("lpos.requests", rec);
      const subject = `${t("dlg_" + kind)} · ${load.id}`;
      const body = [subject, `${load.retailer} · ${L(load.title)}`, `${t("price_pickup")}: ${money(load.price_pickup)}`, "",
        `${t("f_name")}: ${f.name}`, f.company ? `${t("f_company")}: ${f.company}` : null, `${t("f_phone")}: ${f.phone}`, f.email ? `${t("f_email")}: ${f.email}` : null,
        f.delivery ? `${lang === "es" ? "Entrega" : "Delivery"}: ${f.delivery === "pickup" ? t("opt_pickup") : t("opt_delivered")}` : null,
        f.dest ? `${t("f_dest")}: ${f.dest} ${f.zip || ""}` : null, f.offer ? `${t("f_offer")}: ${f.offer}` : null, f.notes ? `${t("f_notes")}: ${f.notes}` : null].filter(Boolean).join("\n");
      showSendLinks(document.getElementById("dlg-out"), subject, body);
    });
    d.showModal();
  }
  function saveLocal(key, rec) {
    try { const arr = JSON.parse(localStorage.getItem(key) || "[]"); arr.push(rec); localStorage.setItem(key, JSON.stringify(arr)); } catch (e) {}
  }
  function showSendLinks(out, subject, body) {
    out.innerHTML = `<div class="notice ok"><p style="margin:0 0 .6rem">${esc(t("form_saved"))}</p>
      <div style="display:grid;gap:.5rem"><a class="btn btn-wa" href="${waLink(body)}" target="_blank" rel="noopener">${esc(t("f_send_wa"))}</a><a class="btn btn-line" href="${mailLink(subject, body)}">${esc(t("f_send_mail"))}</a></div></div>`;
    out.scrollIntoView({ block: "nearest" });
  }

  function bindWaitlist() {
    const form = document.getElementById("f-wait");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const f = Object.fromEntries(new FormData(form).entries());
      saveLocal("lpos.waitlist", { ts: new Date().toISOString(), lang, ...f });
      const subject = t("dlg_wait") + " · Liquidation Pros";
      const body = [subject, "", `${t("f_name")}: ${f.name}`, f.company ? `${t("f_company")}: ${f.company}` : null, `${t("f_phone")}: ${f.phone}`, f.email ? `${t("f_email")}: ${f.email}` : null,
        `${t("f_city")}: ${f.city}`, `${t("f_retailers")}: ${f.retailers}`, f.budget ? `${t("f_budget")}: ${f.budget}` : null, f.notes ? `${t("f_notes")}: ${f.notes}` : null].filter(Boolean).join("\n");
      showSendLinks(document.getElementById("wait-out"), subject, body);
    });
    const cf = document.getElementById("f-contact");
    if (cf) cf.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!cf.reportValidity()) return;
      const f = Object.fromEntries(new FormData(cf).entries());
      saveLocal("lpos.contact", { ts: new Date().toISOString(), lang, ...f });
      const subject = (lang === "es" ? "Mensaje desde el sitio" : "Message from the site") + " · " + f.name;
      showSendLinks(document.getElementById("contact-out"), subject, `${f.name} (${f.phone})\n\n${f.msg}`);
    });
  }

  /* ---------- boot ---------- */
  function render() {
    applyStatic();
    if (document.getElementById("loads-grid")) renderHome();
    if (document.getElementById("detail")) renderDetail();
    fillContact();
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".lang button"); if (b) setLang(b.dataset.lang);
    if (e.target.closest("[data-close]")) document.getElementById("dlg").close();
  });
  fetch("data/loads.json").then((r) => r.json()).then((d) => { DATA = d; render(); bindWaitlist(); })
    .catch(() => { const g = document.getElementById("loads-grid") || document.getElementById("detail"); if (g) g.innerHTML = `<div class="empty">${lang === "es" ? "No se pudieron cargar las cargas. Escríbanos por WhatsApp." : "Could not load the listings. Message us on WhatsApp."}</div>`; });
})();
