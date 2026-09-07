/* Liquidation Pros site v1 — vanilla JS, no build. ES first, EN toggle. */
(function () {
  "use strict";

  /* WhatsApp number for every button/link on the site (E.164, no "+"). Taken from BOL records — CONFIRM with Juan before publishing. */
  const WHATSAPP = "13239613868";
  const FREIGHTQUOTE_URL = "https://www.freightquote.com/"; // no-signup instant quote; URL params not verified, so we give a copyable summary

  /* ---------- i18n dictionary (single source for both languages) ---------- */
  const T = {
    es: {
      tagline: "Tráileres de liquidación · Texas → México",
      nav_quote: "Cotizar envío",
      lead_h2: "Entra a la lista de compradores", lead_sub: "Las cargas nuevas se avisan primero a la lista. Déjenos su WhatsApp y le escribimos cuando llegue algo que le sirva.",
      f_wa: "WhatsApp", f_buy: "Qué compra", lead_submit: "Entrar a la lista",
      lead_done: "Guardado. Se abrió WhatsApp y su correo con el mensaje listo; si no se abrieron, use los botones:",
      sample_h: "Camión de muestra", sample_badge: "Muestra", sample_note_card: "Foto de muestra de un tráiler similar",
      video_h: "Video del tráiler",
      ship_seller: "Envío: lo controla el vendedor (cotiza aquí)", ship_pickup: "Recogida en",
      quote_h: "Cotizar envío", quote_sub: "Estimado al instante con fletes reales que hemos pagado; después, la cotización oficial.",
      q_load: "Carga", q_any_load: "Sin carga específica (sale de Hidalgo, TX)", q_dest: "Destino (ciudad, estado)", q_pallets: "Tarimas", q_btn: "Calcular estimado",
      q_est: "Estimado de flete", q_based: "basado en", q_ships: "envíos reales", q_lane: "tramo de referencia", q_from: "desde",
      q_disc: "Referencia histórica de fletes que pagamos en EE. UU.; no es una cotización. Cruce e importación a México no incluidos.",
      q_mx: "Destino en México: el estimado cubre el tramo en EE. UU. hasta la frontera (Hidalgo / Reynosa). El tramo mexicano se cotiza aparte.",
      q_mx_border: "Esta carga ya está en la frontera (Hidalgo, TX). El tramo mexicano se cotiza por WhatsApp.",
      q_none: "No tenemos historial para ese destino. Pida la cotización oficial.",
      q_official: "Cotización oficial", q_fq: "Cotizar en Freightquote.com (sin registro)", q_fq_p: "Copie este resumen y péguelo en el cotizador:",
      q_copy: "Copiar resumen", q_copied: "Copiado ✓",
      q_wa: "Cotización oficial en 1 hora por WhatsApp", q_wa_p: "En esta carga el flete lo coordina el vendedor (B-Stock). Le confirmamos el precio en 1 hora en horario de oficina.",
      q_wa_lpos_p: "¿Prefiere que lo cotizemos nosotros? Escríbanos y le respondemos en 1 hora.",
      nav_loads: "Cargas", nav_how: "Cómo funciona", nav_waitlist: "Lista de espera", nav_faq: "Preguntas", nav_contact: "Contacto",
      hero_eyebrow: "Mayorista B2B · Hidalgo, Texas",
      hero_h1: "Tráileres completos de Walmart y Target, a precio fijo. Sin subastas.",
      hero_lead: "Compre la carga completa hoy, recoja en Texas o pídanos cotización puesta en su bodega. Las cargas llegan y se venden en 24 horas: entre a la lista de espera para que le avisemos primero.",
      hero_cta_loads: "Ver cargas disponibles", hero_cta_wait: "Entrar a la lista de espera",
      fact_loads: "cargas disponibles", fact_window: "para vender cada carga", fact_border: "frontera con Reynosa",
      hero_caption: "Camión de muestra: foto real de un tráiler Walmart que recibimos (mayo 2026).",
      loads_h2: "Cargas disponibles", loads_sub: "Precio fijo por tráiler completo. Reserve o compre; primero en reservar, primero en cargar.",
      loads_sold_h2: "Vendidas recientemente", loads_sold_sub: "Para que vea lo que normalmente llega.",
      status_available: "Disponible", status_sold: "Vendida", status_reserved: "Reservada",
      units: "Unidades", pallets: "Tarimas", location: "Ubicación", weight: "Peso aprox.", condition: "Condición",
      price_pickup: "Precio recogiendo en Texas", price_pickup_short: "recogiendo en TX", per_unit: "por unidad",
      delivered_quote: "Puesto en su bodega: cotizamos", see_load: "Ver carga", reserve: "Reservar", buy: "Comprar ahora", quote: "Cotizar flete",
      photo_pending: "Fotos pendientes", photo_pending_sub: "Se toman cuando el tráiler llega. Pídalas por WhatsApp.", photo_none_sample: "Sin fotos de muestra todavía.",
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
      faq1_q: "¿Puedo ver el manifiesto antes de pagar?", faq1_a: "Sí — te enviamos el manifiesto para que revises el contenido y el valor estimado de venta al menudeo antes de comprometerte con una carga.",
      faq2_q: "¿El precio incluye el flete o es solo la mercancía?", faq2_a: "El precio de la mercancía y el flete se cotizan por separado — así puedes elegir recoger tú mismo (Hidalgo/Waco, TX) o que te coticemos el flete hasta tu bodega. Te damos ambos números para que quede claro.",
      faq3_q: "¿Ustedes organizan el flete o solo venden la mercancía?", faq3_a: "Las dos opciones — puedes organizar tu propio flete/recolección, o te cotizamos el flete usando costos reales recientes de esa ruta hasta tu bodega.",
      faq4_q: "¿Dónde recojo la mercancía?", faq4_a: "La recolección es en nuestras ubicaciones de Hidalgo, TX y Waco, TX, según dónde esté la carga específica. Te confirmamos la dirección exacta una vez que tu carga esté lista.",
      faq5_q: "¿Cómo confirmo que mi pago (Zelle/transferencia) ya fue recibido?", faq5_a: "Mándanos por WhatsApp una captura de pantalla o el número de confirmación de tu pago y lo verificamos y te confirmamos.",
      faq6_q: "¿Con qué frecuencia tienen cargas nuevas disponibles?", faq6_a: "Nos movemos rápido — no almacenamos inventario, así que las cargas rotan en cuestión de un día tras llegar. La disponibilidad depende de lo que esté entrando de B-Stock. Escríbenos por WhatsApp y te decimos qué hay disponible ahora mismo.",
      faq_see_all: "Ver todas las preguntas →",
      faqp_h1: "Preguntas frecuentes", faqp_lead: "Respuestas directas a lo que más nos preguntan los compradores por WhatsApp. Si no está aquí, escríbenos.",
      faqp_cta_h: "¿Otra pregunta?", faqp_cta_p: "Escríbenos por WhatsApp y te respondemos directo.", faqp_cta_btn: "Preguntar por WhatsApp",
      faqp_t_manifests: "Manifiestos", faqp_t_pricing: "Precios y depósitos", faqp_t_freight: "Flete y cotizaciones",
      faqp_t_pickup: "Recolección en Hidalgo / Waco, TX", faqp_t_payment: "Formas de pago", faqp_t_timing: "Disponibilidad",
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
      nav_quote: "Shipping quote",
      lead_h2: "Join the buyer list", lead_sub: "New loads go to the list first. Leave your WhatsApp and we message you when a fit lands.",
      f_wa: "WhatsApp", f_buy: "What you buy", lead_submit: "Join the list",
      lead_done: "Saved. WhatsApp and your email app opened with the message ready; if they didn't, use the buttons:",
      sample_h: "Sample truck", sample_badge: "Sample", sample_note_card: "Sample photo of a similar trailer",
      video_h: "Trailer video",
      ship_seller: "Shipping: seller-controlled (quote here)", ship_pickup: "Pickup in",
      quote_h: "Shipping quote", quote_sub: "Instant estimate from real freight we have paid; then the official quote.",
      q_load: "Load", q_any_load: "No specific load (ships from Hidalgo, TX)", q_dest: "Destination (city, state)", q_pallets: "Pallets", q_btn: "Estimate",
      q_est: "Freight estimate", q_based: "based on", q_ships: "real shipments", q_lane: "reference lane", q_from: "from",
      q_disc: "Historical reference from freight we paid in the US; not a quote. Mexico border crossing and import not included.",
      q_mx: "Mexico destination: the estimate covers the US leg to the border (Hidalgo / Reynosa). The Mexican leg is quoted separately.",
      q_mx_border: "This load is already at the border (Hidalgo, TX). The Mexican leg is quoted on WhatsApp.",
      q_none: "No history for that destination. Ask for the official quote.",
      q_official: "Official quote", q_fq: "Quote on Freightquote.com (no signup)", q_fq_p: "Copy this summary and paste it into the quote tool:",
      q_copy: "Copy summary", q_copied: "Copied ✓",
      q_wa: "Official quote in 1 hour on WhatsApp", q_wa_p: "Freight on this load is coordinated by the seller (B-Stock). We confirm the price within 1 hour during office hours.",
      q_wa_lpos_p: "Prefer we quote it? Message us and we answer within 1 hour.",
      nav_loads: "Loads", nav_how: "How it works", nav_waitlist: "Waitlist", nav_faq: "FAQ", nav_contact: "Contact",
      hero_eyebrow: "B2B wholesaler · Hidalgo, Texas",
      hero_h1: "Full Walmart and Target truckloads at a fixed price. No auctions.",
      hero_lead: "Buy the whole load today, pick up in Texas or ask for a delivered quote to your warehouse. Loads land and sell within 24 hours — join the waitlist to hear first.",
      hero_cta_loads: "See available loads", hero_cta_wait: "Join the waitlist",
      fact_loads: "loads available", fact_window: "to sell each load", fact_border: "on the Reynosa border",
      hero_caption: "Sample truck: real photo of a Walmart trailer we received (May 2026).",
      loads_h2: "Available loads", loads_sub: "Fixed price per full truckload. Reserve or buy; first to reserve, first to load.",
      loads_sold_h2: "Recently sold", loads_sold_sub: "So you can see what usually comes in.",
      status_available: "Available", status_sold: "Sold", status_reserved: "Reserved",
      units: "Units", pallets: "Pallets", location: "Location", weight: "Approx. weight", condition: "Condition",
      price_pickup: "Price picked up in Texas", price_pickup_short: "picked up in TX", per_unit: "per unit",
      delivered_quote: "Delivered to your warehouse: we quote", see_load: "View load", reserve: "Reserve", buy: "Buy now", quote: "Shipping quote",
      photo_pending: "Photos pending", photo_pending_sub: "Taken when the trailer lands. Ask on WhatsApp.", photo_none_sample: "No sample photos yet.",
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
      faq1_q: "Can I see the manifest before I pay?", faq1_a: "Yes — we send the manifest so you can review contents and estimated retail value before you commit to a load.",
      faq2_q: "Does the price include freight, or is that separate?", faq2_a: "Merchandise price and freight are quoted separately — that lets you choose your own pickup (Hidalgo/Waco, TX) or have us quote freight to your dock. We'll give you both numbers so it's clear.",
      faq3_q: "Do you arrange freight, or do you only sell the merchandise?", faq3_a: "Both — you're welcome to arrange your own pickup/trucking, or we can quote freight for you based on real recent lane costs to get it to your dock.",
      faq4_q: "Where do I pick up the merchandise?", faq4_a: "Pickup is available at our Hidalgo, TX and Waco, TX locations, depending on where the specific load is. We'll confirm the exact pickup address once your load is set.",
      faq5_q: "How do I confirm my payment (Zelle/wire) was received?", faq5_a: "Send us a screenshot or confirmation number of your payment on WhatsApp and we'll verify it and confirm back to you.",
      faq6_q: "How often do you have new loads available?", faq6_a: "We move fast — we don't warehouse inventory, so loads turn over roughly within a day of arrival. Availability depends on what's coming in from B-Stock. Message us on WhatsApp and we'll tell you what's available right now.",
      faq_see_all: "See all questions →",
      faqp_h1: "Frequently asked questions", faqp_lead: "Direct answers to what buyers ask us most on WhatsApp. Not here? Message us.",
      faqp_cta_h: "Another question?", faqp_cta_p: "Message us on WhatsApp and we'll answer directly.", faqp_cta_btn: "Ask on WhatsApp",
      faqp_t_manifests: "Manifests", faqp_t_pricing: "Pricing & Deposits", faqp_t_freight: "Freight & Quotes",
      faqp_t_pickup: "Pickup at Hidalgo / Waco, TX", faqp_t_payment: "Payment Methods", faqp_t_timing: "Timing / Availability",
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
  function waLink(text) { return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text); }
  function mailLink(subject, body) { return "mailto:" + DATA.contact.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body); }

  function fillContact() {
    const c = DATA.contact;
    document.querySelectorAll("[data-wa]").forEach((a) => { a.href = waLink(a.dataset.wa || (lang === "es" ? "Hola, vi su sitio de cargas." : "Hi, I saw your loads site.")); });
    document.querySelectorAll("[data-tel]").forEach((a) => { a.href = "tel:+" + WHATSAPP; a.textContent = c.phone_display; });
    document.querySelectorAll("[data-mail]").forEach((a) => { a.href = "mailto:" + c.email; a.textContent = c.email; });
    document.querySelectorAll("[data-addr]").forEach((el) => { el.textContent = c.address; });
    document.querySelectorAll("[data-hours]").forEach((el) => { el.textContent = L(c.hours); });
  }

  /* ---------- cards ---------- */
  const sampleOf = (load) => (DATA.sample_trucks && DATA.sample_trucks[load.sample]) || null;
  function photoBlock(load, cls) {
    if (load.photos && load.photos.length) {
      const p = load.photos[0];
      return `<img src="${esc(p.src)}" alt="${esc(L(p.alt))}" loading="lazy" width="1600" height="1200">`;
    }
    const sm = sampleOf(load);
    if (sm && sm.photos.length) {
      const p = sm.photos[0];
      return `<img src="${esc(p.src)}" alt="${esc(t("sample_note_card"))}: ${esc(L(p.alt))}" loading="lazy" width="1600" height="1200"><span class="pill pill-warn sample-badge">${esc(t("sample_badge"))}</span>`;
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
        <div class="ship">${shipLine(load, href)}</div>
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
  function shipLine(load, href) {
    return load.freight_control === "seller"
      ? `🚚 <a href="${href}#quote">${esc(t("ship_seller"))}</a>`
      : `📍 ${esc(t("ship_pickup"))} ${esc(load.location.city)} · <a href="${href}#quote">${esc(t("quote"))}</a>`;
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
      const p = DATA.sample_trucks.walmart.photos[0];
      hp.innerHTML = `<img src="${esc(p.src)}" alt="${esc(L(p.alt))}" width="1600" height="1200" fetchpriority="high">`;
    }
  }

  /* ---------- per-load SEO: canonical/OG/meta + Product JSON-LD (page is client-rendered, so this fills in what the static <head> can't know) ---------- */
  function setMeta(sel, attr, val) { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); }
  function setLoadSeo(load) {
    const base = "https://lpros210.github.io/lpos-loads/";
    const url = base + "load.html?id=" + encodeURIComponent(load.id);
    const desc = `${L(load.title)}. ${num(load.units)} unidades, ${load.pallets} tarimas, ${money(load.price_pickup)} recogiendo en ${load.location.city}.`;
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", `${L(load.title)} · ${load.id} · Liquidation Pros`);
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:description"]', "content", desc);
    const img = (load.photos && load.photos[0]) || (sampleOf(load) && sampleOf(load).photos[0]);
    if (img) setMeta('meta[property="og:image"]', "content", base + img.src);
    let ld = document.getElementById("ld-product");
    if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.id = "ld-product"; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Product",
      name: L(load.title), sku: load.id, description: desc,
      brand: { "@type": "Brand", name: load.retailer },
      ...(img ? { image: base + img.src } : {}),
      offers: {
        "@type": "Offer", url, priceCurrency: "USD", price: load.price_pickup,
        availability: load.status === "available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
        itemCondition: "https://schema.org/UsedCondition",
        seller: { "@type": "Organization", name: "Liquidation Pros LLC" },
      },
    });
  }

  /* ---------- full FAQ page (preguntas.html) — verbatim from outputs/ads/FAQ_AND_ANSWERS_2026-09-07.md,
     auto-answer-OK items plus any answer with no [ASSUMPTION]/[SUPUESTO] placeholder. Grouped by topic. */
  const FAQS = [
    { topic: "manifests", q: { es: "¿El manifiesto es real y viene de B-Stock, o es genérico?", en: "Is the manifest real and from B-Stock, or generic?" },
      a: { es: "Real — nuestras cargas se consiguen a través de B-Stock (el propio marketplace de liquidación de Target y Walmart), así que los manifiestos vienen de los datos reales del listado del minorista, no de una plantilla genérica. Los manifiestos pueden tener un pequeño margen de error, igual que en toda la industria — es estándar.",
             en: "Real — our loads are sourced through B-Stock (Target's and Walmart's own liquidation marketplace), so manifests come from the retailer's actual listing data, not a generic template. Manifests can still have small margin of error, same as every liquidator's — that's standard for this industry." } },
    { topic: "manifests", q: { es: "¿Puedo ver el manifiesto antes de pagar?", en: "Can I see the manifest before I pay?" },
      a: { es: "Sí — te enviamos el manifiesto para que revises el contenido y el valor estimado de venta al menudeo antes de comprometerte con una carga.",
             en: "Yes — we send the manifest so you can review contents and estimated retail value before you commit to a load." } },
    { topic: "pricing", q: { es: "¿El precio incluye el flete o es solo la mercancía?", en: "Does the price include freight, or is that separate?" },
      a: { es: "El precio de la mercancía y el flete se cotizan por separado — así puedes elegir recoger tú mismo (Hidalgo/Waco, TX) o que te coticemos el flete hasta tu bodega. Te damos ambos números para que quede claro.",
             en: "Merchandise price and freight are quoted separately — that lets you choose your own pickup (Hidalgo/Waco, TX) or have us quote freight to your dock. We'll give you both numbers so it's clear." } },
    { topic: "freight", q: { es: "¿Ustedes organizan el flete o solo venden la mercancía?", en: "Do you arrange freight, or do you only sell the merchandise?" },
      a: { es: "Las dos opciones — puedes organizar tu propio flete/recolección, o te cotizamos el flete usando costos reales recientes de esa ruta hasta tu bodega.",
             en: "Both — you're welcome to arrange your own pickup/trucking, or we can quote freight for you based on real recent lane costs to get it to your dock." } },
    { topic: "freight", q: { es: "¿Cuánto cuesta el flete de Waco o Hidalgo hasta mi bodega?", en: "How much does freight cost from Waco or Hidalgo to my warehouse?" },
      a: { es: "Depende de la ruta, cantidad de tarimas, peso y si necesitas rampa hidráulica (liftgate). Mándanos por WhatsApp tu destino y el tamaño de la carga y te damos un estimado basado en cargas recientes comparables — el costo final se confirma con la transportista antes de darte un número en firme.",
             en: "It depends on the lane, pallet count, weight, and whether you need a liftgate. Send us your destination and load size on WhatsApp and we'll give you an estimate based on comparable recent loads — final cost is confirmed with the carrier before you're quoted a firm number." } },
    { topic: "freight", q: { es: "¿Puedo usar mi propio transportista para recoger la carga?", en: "Can I use my own trucker to pick up the load?" },
      a: { es: "Sí — puedes mandar tu propio transportista a recoger en Hidalgo o Waco, TX. Solo confirma con nosotros la fecha/hora de recolección antes.",
             en: "Yes — you're welcome to send your own trucker for pickup at Hidalgo or Waco, TX. Just confirm the pickup date/time with us first." } },
    { topic: "freight", q: { es: "He tenido problemas con la transportista que ustedes usan — ¿qué pasa si el flete falla o se cancela?", en: "I've had problems with the carrier you use — what happens if freight fails or gets canceled?" },
      a: { es: "Nos tomamos en serio la confiabilidad de la transportista y estamos trabajando activamente en problemas de flete en algunas rutas. Avísanos de inmediato si una recolección se reprograma o se cae una cita y lo escalamos — es un problema conocido que estamos resolviendo activamente, no algo que vamos a ignorar.",
             en: "We take carrier reliability seriously and are actively working through freight issues on some lanes. Tell us right away if a pickup gets rescheduled or an appointment falls through and we'll escalate it — this is a known live issue we're actively fixing, not something we'll ignore." } },
    { topic: "pickup", q: { es: "¿Dónde recojo la mercancía?", en: "Where do I pick up the merchandise?" },
      a: { es: "La recolección es en nuestras ubicaciones de Hidalgo, TX y Waco, TX, según dónde esté la carga específica. Te confirmamos la dirección exacta una vez que tu carga esté lista.",
             en: "Pickup is available at our Hidalgo, TX and Waco, TX locations, depending on where the specific load is. We'll confirm the exact pickup address once your load is set." } },
    { topic: "pickup", q: { es: "¿Necesito cita para recoger o puedo llegar directo?", en: "Do I need an appointment to pick up, or can I just show up?" },
      a: { es: "Por favor confirma una cita de recolección con nosotros primero por WhatsApp para tener la carga lista y el papeleo correcto preparado.",
             en: "Please confirm a pickup appointment with us first on WhatsApp so we have the load ready and the right paperwork prepared." } },
    { topic: "payment", q: { es: "¿Cómo confirmo que mi pago (Zelle/transferencia) ya fue recibido?", en: "How do I confirm my payment (Zelle/wire) was received?" },
      a: { es: "Mándanos por WhatsApp una captura de pantalla o el número de confirmación de tu pago y lo verificamos y te confirmamos.",
             en: "Send us a screenshot or confirmation number of your payment on WhatsApp and we'll verify it and confirm back to you." } },
    { topic: "timing", q: { es: "¿Con qué frecuencia tienen cargas nuevas disponibles?", en: "How often do you have new loads available?" },
      a: { es: "Nos movemos rápido — no almacenamos inventario, así que las cargas rotan en cuestión de un día tras llegar. La disponibilidad depende de lo que esté entrando de B-Stock. Escríbenos por WhatsApp y te decimos qué hay disponible ahora mismo.",
             en: "We move fast — we don't warehouse inventory, so loads turn over roughly within a day of arrival. Availability depends on what's coming in from B-Stock. Message us on WhatsApp and we'll tell you what's available right now." } },
    { topic: "timing", q: { es: "¿Tienen mercancía disponible ahora mismo?", en: "Do you have merchandise available right now?" },
      a: { es: "Escríbenos por WhatsApp y te decimos exactamente qué tenemos disponible hoy — la disponibilidad cambia rápido porque no almacenamos las cargas.",
             en: "Message us on WhatsApp and we'll tell you exactly what's in and available today — availability changes fast since we don't warehouse loads." } },
  ];
  const FAQ_TOPICS = ["manifests", "pricing", "freight", "pickup", "payment", "timing"];
  function renderFaqPage() {
    const root = document.getElementById("faqp-root");
    if (!root) return;
    root.innerHTML = FAQ_TOPICS.map((topic) => {
      const items = FAQS.filter((f) => f.topic === topic);
      if (!items.length) return "";
      return `<div class="faq-group"><h2>${esc(t("faqp_t_" + topic))}</h2><div class="faq">` +
        items.map((f) => `<details><summary>${esc(L(f.q))}</summary><p>${esc(L(f.a))}</p></details>`).join("") +
        `</div></div>`;
    }).join("");
    let ld = document.getElementById("ld-faq");
    if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.id = "ld-faq"; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q.es, acceptedAnswer: { "@type": "Answer", text: f.a.es } })),
    });
  }

  /* ---------- load detail ---------- */
  function renderDetail() {
    const id = new URLSearchParams(location.search).get("id");
    const load = DATA.loads.find((l) => l.id === id) || DATA.loads[0];
    const root = document.getElementById("detail");
    if (!root) return;
    document.title = `${L(load.title)} · ${load.id} · Liquidation Pros`;
    setLoadSeo(load);
    const perUnit = load.units && load.price_pickup ? load.price_pickup / load.units : null;
    const condKey = "cond_" + load.condition_code;
    const sm = sampleOf(load);
    const isSample = !(load.photos && load.photos.length) && sm && sm.photos.length;
    const pics = isSample ? sm.photos : load.photos;
    const gallery = (arr) => `<div class="gallery" id="gallery" aria-label="${esc(t("photos_h"))}">${arr.map((p, i) => `<figure id="ph${i}"><img src="${esc(p.src)}" alt="${esc(L(p.alt))}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} width="1600" height="1200"><figcaption>${esc(L(p.alt))}</figcaption></figure>`).join("")}</div>
         <div class="thumbs">${arr.map((p, i) => `<button type="button" data-ph="${i}" aria-current="${i === 0}" aria-label="${lang === "es" ? "Foto" : "Photo"} ${i + 1}"><img src="${esc(p.src)}" alt="" loading="lazy"></button>`).join("")}</div>`;
    const photos = pics && pics.length
      ? (isSample ? `<div class="sample-head"><span class="pill pill-warn">${esc(L(sm.label))}</span><span>${esc(L(sm.note))}</span></div>` : "") + gallery(pics)
      : `<div class="gallery"><figure><div class="ph-placeholder"><div><b>${esc(t("photo_pending"))}</b>${esc(t("photo_pending_sub"))}</div></div></figure></div>`;
    /* video slot: set load.video = {src, poster} in loads.json and it renders here */
    const video = load.video && load.video.src
      ? `<section class="block"><h2>${esc(t("video_h"))}</h2><video controls muted playsinline preload="none" poster="${esc(load.video.poster || "")}" src="${esc(load.video.src)}" width="1600" height="900"></video></section>` : "";

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
        ${video}
        <div class="kv">
          <div><span>${esc(t("units"))}</span><b>${num(load.units)}</b></div>
          <div><span>${esc(t("pallets"))}</span><b>${esc(load.pallets)}</b></div>
          <div><span>${esc(t("weight"))}</span><b>${load.weight_lb ? num(load.weight_lb) + " lb" : "—"}</b></div>
          <div><span>${esc(t("location"))}</span><b>${esc(load.location.city)}</b></div>
        </div>
        <section class="block"><h2>${esc(t("condition_h"))}</h2><div class="cond"><p><b>${esc(t(condKey))}.</b> ${esc(t(condKey + "_p"))}</p></div></section>
        <section class="block"><h2>${esc(t("manifest_h"))}</h2>${manifest}</section>
        <section class="block"><h2>${esc(t("location"))}</h2><div class="cond"><p><b>${esc(t("pickup_h"))} ${esc(load.location.name)}, ${esc(load.location.city)}.</b> ${esc(t("pickup_p"))}</p><p style="margin-top:.5rem"><b>${esc(t("delivered_h"))}.</b> ${esc(t("delivered_p"))}</p></div></section>
        <section class="block" id="quote"><h2>${esc(t("quote_h"))}</h2><div id="quote-widget"></div></section>
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
            <a class="btn btn-line" href="#quote">${esc(t("quote"))}</a>
            <a class="btn btn-wa" data-wa="${esc((lang === "es" ? "Hola, me interesa la carga " : "Hi, I'm interested in load ") + load.id + " (" + L(load.title) + ")")}" href="#">WhatsApp</a>
          </div>` : `<div class="actions"><a class="btn btn-red" href="index.html#waitlist">${esc(t("hero_cta_wait"))}</a></div>`}
          <p class="fine">${esc(t("window_note"))}<br>${esc(t("fine_buybox"))}</p>
        </div>
      </aside>`;
    renderQuote(document.getElementById("quote-widget"), load);
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
    if (form) form.addEventListener("submit", (e) => {
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


  /* ---------- shipping quote (lanes.json = real freight we paid; nearest lane by distance) ---------- */
  // ponytail: road miles hard-coded per city; add a city here to extend the datalist. Upgrade path: geocode + haversine.
  const DEST = { // [miles from Hidalgo TX, miles from Waco TX, country]
    "Monterrey, NL": [150, 540, "MX"], "Reynosa, Tamps": [8, 400, "MX"], "Guadalajara, Jal": [600, 990, "MX"], "CDMX": [640, 1030, "MX"],
    "San Luis Potosí, SLP": [430, 820, "MX"], "Saltillo, Coah": [200, 590, "MX"], "Querétaro, Qro": [560, 950, "MX"], "Matamoros, Tamps": [60, 460, "MX"], "Nuevo Laredo, Tamps": [160, 360, "MX"],
    "Laredo, TX": [150, 350, "US"], "McAllen, TX": [10, 400, "US"], "Hidalgo, TX": [0, 400, "US"], "Houston, TX": [350, 185, "US"], "Dallas, TX": [500, 100, "US"], "San Antonio, TX": [240, 180, "US"], "Austin, TX": [320, 100, "US"],
  };
  const LANE_MILES = { "Hopkins, MN": 1450, "Orangeburg, SC": 1350, "Waxahachie, TX": 470, "Lenexa, KS": 950, "Fort Worth, TX": 500, "Grand Prairie, TX": 490, "Lancaster, TX": 1400, "Charlotte, NC": 1400 };
  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  function findDest(input) {
    const q = norm(input).split(",")[0].trim();
    if (!q) return null;
    const keys = Object.keys(DEST);
    const k = keys.find((d) => norm(d).split(",")[0] === q) || keys.find((d) => norm(d).startsWith(q));
    return k ? { name: k, hidalgo: DEST[k][0], waco: DEST[k][1], mx: DEST[k][2] === "MX" } : null;
  }
  function estimate(originCity, destInput, pallets) {
    const d = findDest(destInput);
    if (!d) return null;
    const fromWaco = /waco/i.test(originCity);
    let miles = fromWaco ? d.waco : d.hidalgo;
    if (d.mx) miles = fromWaco ? DEST["Hidalgo, TX"][1] : 0; // US leg to the border only
    const lanes = (DATA.lanes || []).filter((l) => LANE_MILES[l.origin] != null);
    if (!lanes.length) return { dest: d, miles, none: true };
    if (miles === 0) return { dest: d, miles, border: true };
    const lane = lanes.reduce((a, b) => Math.abs(LANE_MILES[b.origin] - miles) < Math.abs(LANE_MILES[a.origin] - miles) ? b : a);
    // ponytail: linear scaling by distance (clamped) and pallet count; lanes are full-truck prices with no pallet data
    const ratio = Math.min(1.5, Math.max(0.5, miles / LANE_MILES[lane.origin]));
    const pf = Math.min(1, Math.max(0.4, (Number(pallets) || 26) / 26));
    const r50 = (n) => Math.round(n * ratio * pf / 50) * 50;
    return { dest: d, miles, lane, lo: r50(lane.min), hi: r50(lane.max), n: lane.n };
  }
  function renderQuote(root, load) {
    if (!root) return;
    const loads = DATA.loads.filter((l) => l.status === "available");
    const sel = !load ? `<label>${esc(t("q_load"))}<select name="load"><option value="">${esc(t("q_any_load"))}</option>${loads.map((l) => `<option value="${esc(l.id)}">${esc(l.retailer)} · ${esc(l.id)} · ${esc(l.location.city)}</option>`).join("")}</select></label>` : "";
    root.innerHTML = `<form class="form quote" novalidate>
      ${sel}
      <div class="row">
        <label>${esc(t("q_dest"))} *<input name="dest" list="dest-list" required autocomplete="off" placeholder="Monterrey, NL"><datalist id="dest-list">${Object.keys(DEST).map((d) => `<option value="${esc(d)}">`).join("")}</datalist></label>
        <label>${esc(t("q_pallets"))}<input name="pallets" type="number" min="1" max="30" inputmode="numeric" value="${load ? esc(String(load.pallets).split(/[–-]/).pop()) : 26}"></label>
      </div>
      <button class="btn btn-red" type="submit">${esc(t("q_btn"))}</button>
      <div id="q-out" aria-live="polite"></div></form>`;
    const form = root.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const f = Object.fromEntries(new FormData(form).entries());
      const ld = load || DATA.loads.find((l) => l.id === f.load) || null;
      const origin = ld ? ld.location.city : "Hidalgo, TX";
      const seller = ld ? ld.freight_control === "seller" : false;
      const est = estimate(origin, f.dest, f.pallets);
      const out = form.querySelector("#q-out");
      let html = "";
      if (!est || est.none) html += `<div class="notice">${esc(t("q_none"))}</div>`;
      else if (est.border) html += `<div class="notice">${esc(t("q_mx_border"))}</div>`;
      else html += `<div class="est"><div class="est-main">${esc(t("q_est"))} ${esc(origin)} → ${esc(est.dest.name)}: <strong>${money(est.lo)} – ${money(est.hi)}</strong></div>
        <div class="est-sub">${esc(t("q_based"))} ${est.n} ${esc(t("q_ships"))} · ${esc(t("q_lane"))} ${esc(est.lane.origin)} → ${esc(est.lane.destination)} (≈${num(LANE_MILES[est.lane.origin])} mi) · ${esc(f.pallets)} ${esc(t("q_pallets").toLowerCase())}</div>
        ${est.dest.mx ? `<div class="est-sub">${esc(t("q_mx"))}</div>` : ""}<div class="est-sub">${esc(t("q_disc"))}</div></div>`;
      const summary = [`Liquidation Pros LLC · ${t("q_official")}`, `Origin: ${origin}`, `Destination: ${est ? est.dest.name : f.dest}`, `Pallets: ${f.pallets} · dry van 53' · ~${ld && ld.weight_lb ? num(ld.weight_lb) : "30,000"} lb · general merchandise`, ld ? `Load: ${ld.id}` : null].filter(Boolean).join("\n");
      const waText = (lang === "es" ? "Hola, quiero la cotización oficial de flete.\n" : "Hi, I'd like the official freight quote.\n") + summary;
      html += `<div class="official"><h3>${esc(t("q_official"))}</h3>` + (seller
        ? `<p>${esc(t("q_wa_p"))}</p><a class="btn btn-wa" href="${waLink(waText)}" target="_blank" rel="noopener">${esc(t("q_wa"))}</a>`
        : `<p>${esc(t("q_fq_p"))}</p><textarea readonly rows="5" id="q-sum">${esc(summary)}</textarea>
           <div class="cta-row"><button type="button" class="btn btn-line" id="q-copy">${esc(t("q_copy"))}</button><a class="btn btn-dark" href="${FREIGHTQUOTE_URL}" target="_blank" rel="noopener">${esc(t("q_fq"))}</a></div>
           <p style="margin-top:.8rem">${esc(t("q_wa_lpos_p"))}</p><a class="btn btn-wa" href="${waLink(waText)}" target="_blank" rel="noopener">WhatsApp</a>`) + `</div>`;
      out.innerHTML = html;
      const cp = out.querySelector("#q-copy");
      if (cp) cp.addEventListener("click", () => {
        const ta = out.querySelector("#q-sum"); ta.select();
        (navigator.clipboard ? navigator.clipboard.writeText(ta.value) : Promise.reject()).catch(() => document.execCommand("copy")).finally(() => { cp.textContent = t("q_copied"); });
      });
      saveLocal("lpos.quotes", { ts: new Date().toISOString(), lang, origin, load: ld ? ld.id : null, ...f, est: est && est.lo != null ? [est.lo, est.hi] : null });
      out.scrollIntoView({ block: "nearest" });
    });
  }

  /* ---------- lead capture (hero): localStorage + WhatsApp + mailto leads@ ---------- */
  function bindLead() {
    const form = document.getElementById("f-lead");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const f = Object.fromEntries(new FormData(form).entries());
      saveLocal("lpos.leads", { ts: new Date().toISOString(), lang, ...f });
      const subject = `LEAD | ${f.name} | ${f.city}`;
      const body = ["LEAD", `Nombre: ${f.name}`, `WhatsApp: ${f.phone}`, `Ciudad: ${f.city}`, `Compra: ${f.buy}`, `Presupuesto USD: ${f.budget || "-"}`, `Idioma: ${lang}`, `Fuente: sitio web ${new Date().toISOString().slice(0, 10)}`].join("\n");
      const wa = waLink((lang === "es" ? "Hola, quiero entrar a la lista de compradores.\n" : "Hi, I want to join the buyer list.\n") + body);
      const mail = "mailto:" + DATA.contact.leads_email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      const out = document.getElementById("lead-out");
      out.innerHTML = `<div class="notice ok"><p style="margin:0 0 .6rem">${esc(t("lead_done"))}</p><div style="display:grid;gap:.5rem"><a class="btn btn-wa" href="${wa}" target="_blank" rel="noopener">${esc(t("f_send_wa"))}</a><a class="btn btn-line" href="${mail}">${esc(t("f_send_mail"))}</a></div></div>`;
      out.scrollIntoView({ block: "nearest" });
      try { window.open(wa, "_blank", "noopener"); location.href = mail; } catch (err) {}
    });
  }

  /* ---------- boot ---------- */
  function render() {
    applyStatic();
    if (document.getElementById("loads-grid")) renderHome();
    if (document.getElementById("detail")) renderDetail();
    if (document.getElementById("quote-page")) renderQuote(document.getElementById("quote-page"), null);
    renderFaqPage();
    fillContact();
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".lang button"); if (b) setLang(b.dataset.lang);
    if (e.target.closest("[data-close]")) document.getElementById("dlg").close();
  });
  Promise.all([fetch("data/loads.json").then((r) => r.json()), fetch("data/lanes.json").then((r) => r.json()).catch(() => ({ lanes: [] }))])
    .then(([d, ln]) => { DATA = d; DATA.lanes = ln.lanes; render(); bindWaitlist(); bindLead(); })
    .catch(() => { const g = document.getElementById("loads-grid") || document.getElementById("detail"); if (g) g.innerHTML = `<div class="empty">${lang === "es" ? "No se pudieron cargar las cargas. Escríbanos por WhatsApp." : "Could not load the listings. Message us on WhatsApp."}</div>`; });
})();
