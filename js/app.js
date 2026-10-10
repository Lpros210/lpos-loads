/* Liquidation Pros site v1 — vanilla JS, no build. ES first, EN toggle. */
(function () {
  "use strict";

  /* WhatsApp number for every button/link on the site (E.164, no "+"). Taken from BOL records — CONFIRM with Juan before publishing.
     Single source of truth is tools/site_config.py (PHONE_E164) — the static JSON-LD in every
     page's <script type="application/ld+json"> blocks is generated from that file by
     tools/gen_seo.py. This constant has no build step, so keep it matching PHONE_E164 by hand. */
  const WHATSAPP = "19569966545";
  /* ANALYTICS: GA4 property "www.lpros.com - GA4" (existing, verified live 2026-10-10). Meta Pixel / Google Ads
     conversion IDs: none confirmed yet (see outputs/continuous-cto/TRACKING_IDS_CHECK_2026-10-10.md); set them here when chosen. */
  const TRACKING = { GA4_ID: "G-X6LHSY1HBH", META_PIXEL_ID: "", GOOGLE_ADS_ID: "" };
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  if (TRACKING.GA4_ID) {
    const gs = document.createElement("script");
    gs.async = true;
    gs.src = "https://www.googletagmanager.com/gtag/js?id=" + TRACKING.GA4_ID;
    document.head.appendChild(gs);
    gtag("js", new Date());
    gtag("config", TRACKING.GA4_ID);
  }
  /* Lead events: WhatsApp / phone clicks and every form submit (forms then open WhatsApp). */
  document.addEventListener("click", function (e) {
    const a = e.target.closest && e.target.closest('a[href*="wa.me/"], a[href^="tel:"]');
    if (a) gtag("event", a.href.indexOf("tel:") === 0 ? "click_call" : "click_whatsapp", { link_url: a.href.split("?")[0], page_path: location.pathname });
  }, true);
  document.addEventListener("submit", function (e) {
    gtag("event", "generate_lead", { form_id: (e.target && e.target.id) || "form", page_path: location.pathname });
  }, true);
  const FREIGHTQUOTE_URL = "https://www.freightquote.com/"; // no-signup instant quote; URL params not verified, so we give a copyable summary

  /* ---------- i18n dictionary (single source for both languages) ---------- */
  const T = {
    es: {
      tagline: "Tráileres de liquidación · Recoja en Texas",
      nav_quote: "Cotizar envío",
      lead_h2: "Entre a la lista de compradores", lead_sub: "Las cargas nuevas se avisan primero a la lista. Déjenos su WhatsApp y le escribimos cuando llegue algo que le sirva.",
      f_wa: "WhatsApp", f_buy: "Qué compra", lead_submit: "Entrar a la lista",
      lead_done: "Guardado. Se abrió WhatsApp con su mensaje: toque Enviar ahí. Si no, use los botones:",
      sample_h: "Tráiler de muestra", sample_badge: "Muestra", sample_note_card: "Foto de muestra de un tráiler similar",
      video_h: "Video del tráiler",
      ship_seller: "Recogida: el comprador arregla su transporte (cotiza aquí)", ship_pickup: "Recogida en", pickup_label: "Texas (ubicación confirmada al reservar)", price_tbd: "Precio al confirmar",
      quote_h: "Cotizar envío", quote_sub: "Pida la cotización oficial de flete — recogida y envío dentro de EE. UU. solamente.",
      q_load: "Carga", q_any_load: "Sin carga específica (recoge en Texas)", q_dest: "Código postal (EE. UU.)", q_dest_hint: "Solo destinos en EE. UU. — no enviamos a México.", q_pallets: "Tarimas", q_btn: "Pedir cotización",
      q_generic: "El flete varía según destino y transportista — pida la cotización oficial abajo. No mostramos un estimado en dólares porque los fletes cambian seguido.",
      q_official: "Cotización oficial", q_fq: "Cotizar en Freightquote.com (sin registro)", q_fq_p: "Copie este resumen y péguelo en el cotizador:",
      q_copy: "Copiar resumen", q_copied: "Copiado ✓",
      q_wa: "Cotización oficial en 1 hora por WhatsApp", q_wa_p: "En esta carga el flete lo arregla el comprador con su propio transportista. Si necesita cotización de entrega, le confirmamos el precio en 1 hora en horario de oficina.",
      q_wa_lpos_p: "¿Prefiere que lo coticemos nosotros? Escríbanos y le respondemos en 1 hora.",
      nav_loads: "Cargas", nav_how: "Cómo funciona", nav_waitlist: "Lista de espera", nav_guide: "Guía", nav_faq: "Preguntas", nav_contact: "Contacto",
      hero_eyebrow: "Mayorista B2B · Hidalgo, Texas",
      hero_h1: "Tráileres completos de liquidación, a precio fijo. Sin subastas.",
      hero_lead: "Compre la carga completa hoy, recoja en Texas o pídanos cotización puesta en su bodega. Las cargas se venden rápido: entre a la lista de espera para que le avisemos primero.",
      hero_cta_loads: "Ver cargas disponibles", hero_cta_wait: "Entrar a la lista de espera",
      fact_loads: "cargas disponibles", fact_window: "precio fijo por tráiler", fact_border: "recoja con su transportista",
      hero_caption: "Tráiler de muestra: foto real de un tráiler que recibimos (mayo 2026).",
      trust_noauction: "Sin subastas — usted decide", trust_flatprice: "Precio fijo antes de comprometerse",
      trust_manifest: "Manifiesto real, no plantilla", trust_whatsapp: "Respuesta directa por WhatsApp",
      receiving_h: "Así recibimos las cargas", receiving_sub: "Video real de nuestra bodega, sin editar. No corresponde a una carga específica de la lista.",
      receiving_play: "Toque para reproducir",
      loads_h2: "Cargas disponibles", loads_sub: "Precio fijo por tráiler completo. Reserve o compre; primero en reservar, primero en cargar.",
      loads_sold_h2: "Vendidas recientemente", loads_sold_sub: "Para que vea lo que normalmente llega.",
      status_available: "Disponible", status_sold: "Vendida", status_reserved: "Reservada", status_on_hold: "En espera",
      units: "Unidades", pallets: "Tarimas", location: "Ubicación", weight: "Peso aprox.", condition: "Condición",
      price_pickup: "Precio recogiendo en Texas", price_pickup_short: "recogiendo en TX", per_unit: "por unidad",
      delivered_quote: "Puesto en su bodega: cotizamos", see_load: "Ver carga", reserve: "Reservar", buy: "Comprar ahora", quote: "Cotizar flete",
      photo_pending: "Fotos pendientes", photo_pending_sub: "Se toman cuando el tráiler llega. Pídalas por WhatsApp.", photo_none_sample: "Sin fotos de muestra todavía.",
      photo_next_h: "Fotos del próximo tráiler", photo_next_sub: "Aún no tenemos fotos de muestra de esta línea. Le enviamos fotos reales del próximo tráiler por WhatsApp en cuanto llega.", photo_next_cta: "Pedir fotos por WhatsApp",
      how_guide: "¿Cómo compro?", how_h2: "Cómo funciona", how_sub: "Cuatro pasos. Sin cuenta, sin subasta.",
      how1_h: "Vea la carga", how1_p: "Unidades, tarimas, condición, ubicación y precio fijo en la misma pantalla.",
      how2_h: "Reserve o compre", how2_p: "Reservar aparta la carga 24 h mientras confirma pago. Comprar ahora la cierra.",
      how3_h: "Pague", how3_p: "Transferencia, wire o depósito. Le enviamos factura de Zoho al confirmar.",
      how4_h: "Recoja o se la enviamos", how4_p: "Recoja con su propio transportista en Texas (ubicación confirmada al reservar), o pídanos flete a su bodega en EE. UU. No enviamos a México. Si su transportista cruza a México, esa parte la coordina usted.",
      wait_h2: "Lista de espera de compradores", wait_sub: "Las cargas nuevas se avisan primero a la lista. Díganos qué busca y le escribimos por WhatsApp cuando llegue algo que le sirva.",
      f_name: "Nombre", f_company: "Empresa (opcional)", f_phone: "WhatsApp / teléfono", f_email: "Correo (opcional)", f_city: "Ciudad de entrega",
      notify_email: "Correo electrónico", notify_submit: "Avíseme por correo",
      other_cat_h: "Otras categorías", other_cat_sub: "Agotado por ahora. Deje su correo y le avisamos cuando haya disponibilidad.",
      status_soldout: "Agotado",
      cat_retail_title: "Mercancía general de cadena minorista", cat_retail_desc: "Tráileres completos de devoluciones y sobrantes de una cadena minorista de EE. UU. Disponibilidad variable — por ahora agotado.",
      cat_ecom_title: "Pacas de devoluciones de comercio electrónico", cat_ecom_desc: "Tarimas de devoluciones de clientes de comercio electrónico, vendidas por pieza. Por ahora agotado.",
      f_retailers: "Qué le interesa", f_budget: "Presupuesto por tráiler (USD)", f_notes: "Comentarios",
      f_consent: "Acepto que Liquidation Pros me contacte por WhatsApp o correo sobre cargas disponibles.",
      f_submit_wait: "Entrar a la lista", f_send_wa: "Abrir WhatsApp para enviar", wa_blocked: "Guardado. Su navegador bloqueó la ventana: toque \"Abrir WhatsApp para enviar\" para que recibamos su solicitud.", f_send_mail: "Enviar por correo",
      f_qty: "Tarimas o unidades", f_dest: "Destino (ciudad, estado)", f_zip: "Código postal / CP",
      f_offer: "Su oferta (USD)", f_offer_hint: "Ofertas razonables se responden el mismo día.",
      form_saved: "Guardado. Se abrió WhatsApp con su mensaje: toque Enviar ahí. Si no, envíelo por WhatsApp o correo para que lo recibamos:",
      faq_h2: "Preguntas frecuentes",
      faq1_q: "¿Puedo ver el manifiesto antes de pagar?", faq1_a: "Sí — le enviamos el manifiesto para que revise el contenido y el valor estimado de venta al menudeo antes de comprometerse con una carga.",
      faq2_q: "¿El precio incluye el flete o es solo la mercancía?", faq2_a: "El precio de la mercancía y el flete se cotizan por separado — así puede elegir recoger usted mismo (en Texas) o que le coticemos el flete hasta su bodega en EE. UU. No enviamos a México. Le damos ambos números para que quede claro.",
      faq3_q: "¿Ustedes organizan el flete o solo venden la mercancía?", faq3_a: "Las dos opciones — puede organizar su propio flete/recolección, o le cotizamos el flete usando costos reales recientes de esa ruta hasta su bodega en EE. UU.",
      faq4_q: "¿Dónde recojo la mercancía?", faq4_a: "La recolección es en Texas. Le confirmamos la ubicación y la dirección exacta al reservar su carga.",
      faq5_q: "¿Cómo confirmo que mi pago (Zelle/transferencia) ya fue recibido?", faq5_a: "Mándenos por WhatsApp una captura de pantalla o el número de confirmación de su pago y lo verificamos y le confirmamos.",
      faq6_q: "¿Con qué frecuencia tienen cargas nuevas disponibles?", faq6_a: "Nos movemos rápido — no almacenamos inventario, así que las cargas rotan en cuestión de un día tras llegar. La disponibilidad depende de lo que esté entrando. Escríbanos por WhatsApp y le decimos qué hay disponible ahora mismo.",
      faq_see_all: "Ver todas las preguntas →",
      faqp_h1: "Preguntas frecuentes", faqp_lead: "Respuestas directas a lo que más nos preguntan los compradores por WhatsApp. Si no está aquí, escríbenos.",
      faqp_cta_h: "¿Otra pregunta?", faqp_cta_p: "Escríbenos por WhatsApp y te respondemos directo.", faqp_cta_btn: "Preguntar por WhatsApp",
      faqp_t_manifests: "Manifiestos", faqp_t_pricing: "Precios y depósitos", faqp_t_freight: "Flete y cotizaciones",
      faqp_t_pickup: "Recolección en Texas", faqp_t_payment: "Formas de pago", faqp_t_timing: "Disponibilidad",
      faqp_t_border: "Recoja en la frontera",
      border_h: "Recolección en Texas / Texas pickup",
      border_p: "Recolección en Texas; la ubicación exacta se confirma al reservar. Usted recoge con su propio transportista; no organizamos flete ni cruce a México. Antes de cruzar tenga listo: identificación del chofer, transportista y placas, ventana de recolección confirmada, comprobante de pago recibido, RFC del exportador, pedimento de exportación y persona de contacto en sitio.",
      border_line_h: "Recolección:", border_faq_link: "Ver la opción de recoger usted mismo para ahorrar en flete →",
      contact_h2: "Contacto", contact_sub: "Hablamos español e inglés. Respondemos más rápido por WhatsApp.",
      contact_wa: "WhatsApp", contact_phone: "Llamar", contact_mail: "Correo", contact_addr: "Bodega",
      contact_form_h: "Escríbanos", f_msg: "Mensaje",
      ftr_about: "Liquidation Pros LLC compra tráileres y tarimas de liquidación de las principales fuentes de liquidación directamente en EE. UU. y los vende a mayoristas, con recolección en Texas.",
      ftr_fine: "Precios en USD, recogiendo en Texas salvo indicación. Mercancía vendida tal como está. Los nombres de tiendas son marcas de sus dueños y se usan solo para describir el origen.",
      ftr_privacy: "Aviso de privacidad", ftr_terms: "Términos de venta", ftr_contact: "Contacto",
      priv_h1: "Aviso de privacidad", priv_updated: "Última actualización: septiembre 2026",
      priv_lead: "Este aviso explica, en lenguaje sencillo, qué datos recopilamos cuando usted usa el formulario de cotización o nos escribe por WhatsApp, y cómo los usamos.",
      priv_collect_h: "Qué datos recopilamos", priv_collect_p: "Cuando llena el formulario de cotización, lista de espera o contacto, o nos escribe por WhatsApp, guardamos: su nombre, número de WhatsApp/teléfono, ciudad de entrega o destino, qué le interesa comprar, presupuesto (si lo indica) y cualquier comentario que nos deje. No pedimos ni guardamos datos de tarjeta de pago en el sitio. También usamos Google Analytics para contar visitas y clics (páginas vistas, clics a WhatsApp o teléfono, envíos de formularios); Google puede usar cookies para esto.",
      priv_use_h: "Para qué los usamos", priv_use_p: "Solo para responder su cotización o solicitud, avisarle de cargas disponibles que coincidan con lo que busca, y coordinar recolección o flete. No los usamos para nada más.",
      priv_share_h: "No vendemos sus datos", priv_share_p: "Liquidation Pros LLC no vende ni renta su información a terceros. Sus datos solo se usan internamente para atenderlo.",
      priv_delete_h: "Cómo pedir que borremos sus datos", priv_delete_p: "Escríbanos por WhatsApp o al correo juan@lpros.biz pidiendo que eliminemos su información y lo hacemos.",
      term_h1: "Términos de venta", term_updated: "Última actualización: septiembre 2026",
      term_lead: "Resumen simple de cómo vendemos: sin letra chica más allá de lo siguiente.",
      term_asis_h: "Mercancía tal como está", term_asis_p: "Toda la mercancía es liquidación (devoluciones, sobrantes o salvage) y se vende tal como está, según el manifiesto que le compartimos. No aceptamos devoluciones por condición ya descrita en el manifiesto.",
      term_pickup_h: "Recolección o flete", term_pickup_p: "La recolección es en Texas (ubicación confirmada al reservar). Si necesita que se la enviemos, el flete se cotiza aparte, por separado del precio de la mercancía.",
      term_price_h: "Precios en dólares", term_price_p: "Todos los precios publicados están en USD. No hay comisión de plataforma ni impuesto de venta de EE. UU. sobre el precio de recogida.",
      term_noauction_h: "Sin subastas", term_noauction_p: "Vendemos a precio fijo publicado, primero en reservar/comprar, primero en cargar. No subastamos las cargas.",
      term_payment_h: "Pago antes de liberar la carga", term_payment_p: "La mercancía se libera para recolección o envío hasta confirmar el pago completo.",
      contactp_h1: "Contacto", contactp_lead: "Hablamos español e inglés. WhatsApp es lo más rápido.",
      e404_h1: "Página no encontrada", e404_p: "El enlace puede estar mal escrito o la página ya no existe.", e404_cta: "Volver al inicio",
      back: "Todas las cargas", ref: "Ref.", listed: "Llegó", sale_window: "Primero en reservar", window_note: "Primero en reservar, primero en cargar.",
      condition_h: "Condición", manifest_h: "Manifiesto por categoría", photos_h: "Fotos del tráiler",
      manifest_pending: "El manifiesto completo (CSV del vendedor) está disponible. Pídalo por WhatsApp con la referencia de la carga; el desglose por categoría se mostrará aquí cuando lo importemos.",
      manifest_none: "Esta carga se vendió sin manifiesto por categoría. Categorías vistas en el tráiler:",
      cat: "Categoría", qty: "Unidades", retail: "Valor de tienda", note: "Nota",
      retail_note: "Valor de tienda ≠ precio de reventa.",
      cond_returns_mixed: "Devoluciones y sobrantes sin revisar, mezclados",
      cond_returns_mixed_p: "Mercancía general de un centro de devoluciones: nuevo en caja, caja abierta y piezas dañadas mezcladas. Sin clasificar. Se vende el tráiler completo tal como está.",
      cond_salvage: "Salvage (dañado / caja abierta)",
      cond_salvage_p: "Tarimas marcadas salvage: empaques abiertos o dañados, producto usable en su mayoría. Se vende tal como está.",
      cond_customer_returns: "Devoluciones de clientes, sin clasificar",
      cond_customer_returns_p: "Pacas de devoluciones de clientes: ropa, calzado y mercancía general mezclada, sin clasificar. Se vende por tarima, precio fijo.",
      returns_h: "Pacas de devoluciones", returns_sub: "Devoluciones de clientes por tarima — ropa, calzado y mercancía general mezclada. Precio fijo por tarima.",
      pickup_h: "Recogida en", pickup_p: "Usted o su transportista cargan en la ubicación indicada. Cita previa.",
      delivered_h: "Puesto en su bodega", delivered_p: "Cotizamos flete a su bodega en EE. UU. Diga su ciudad. No enviamos a México.",
      fine_buybox: "Precio fijo por tráiler completo, USD, sin impuesto de venta de EE. UU. Sin comisiones de plataforma.",
      wa_open: "Se abrirá WhatsApp con el mensaje listo.", mail_open: "Se abrirá su correo con el mensaje listo.",
      dlg_reserve: "Reservar esta carga", dlg_buy: "Comprar esta carga", dlg_quote: "Cotizar flete", dlg_wait: "Lista de espera",
      opt_pickup: "Recojo en Texas", opt_delivered: "Puesto en mi bodega (cotizar)",
      sold_banner: "Esta carga ya se vendió. Entre a la lista de espera para la siguiente.",
      hold_banner: "Esta carga está en espera y no está a la venta por ahora. Entre a la lista de espera para la siguiente.",
      err_required: "Faltan datos obligatorios.",
      any: "Cualquiera",
    },
    en: {
      tagline: "Liquidation truckloads · Pickup in Texas",
      nav_quote: "Shipping quote",
      lead_h2: "Join the buyer list", lead_sub: "New loads go to the list first. Leave your WhatsApp and we message you when a fit lands.",
      f_wa: "WhatsApp", f_buy: "What you buy", lead_submit: "Join the list",
      lead_done: "Saved. WhatsApp opened with your message: tap Send there. If not, use the buttons:",
      sample_h: "Sample truck", sample_badge: "Sample", sample_note_card: "Sample photo of a similar trailer",
      video_h: "Trailer video",
      ship_seller: "Pickup: buyer arranges transport (quote here)", ship_pickup: "Pickup in", pickup_label: "Texas (location confirmed on reservation)", price_tbd: "Price on confirmation",
      quote_h: "Shipping quote", quote_sub: "Request the official freight quote — pickup and shipping within the US only.",
      q_load: "Load", q_any_load: "No specific load (pickup in Texas)", q_dest: "ZIP code (US)", q_dest_hint: "US destinations only — we do not ship to Mexico.", q_pallets: "Pallets", q_btn: "Request quote",
      q_generic: "Freight varies by destination and carrier — request the official quote below. We don't show a dollar estimate here because freight costs change often.",
      q_official: "Official quote", q_fq: "Quote on Freightquote.com (no signup)", q_fq_p: "Copy this summary and paste it into the quote tool:",
      q_copy: "Copy summary", q_copied: "Copied ✓",
      q_wa: "Official quote in 1 hour on WhatsApp", q_wa_p: "Freight on this load is arranged by the buyer with their own carrier. If you need a delivery quote, we confirm the price within 1 hour during office hours.",
      q_wa_lpos_p: "Prefer we quote it? Message us and we answer within 1 hour.",
      nav_loads: "Loads", nav_how: "How it works", nav_waitlist: "Waitlist", nav_guide: "Guide", nav_faq: "FAQ", nav_contact: "Contact",
      hero_eyebrow: "B2B wholesaler · Hidalgo, Texas",
      hero_h1: "Full liquidation truckloads at a fixed price. No auctions.",
      hero_lead: "Buy the whole load today, pick up in Texas or ask for a delivered quote to your warehouse. Loads sell fast — join the waitlist to hear first.",
      hero_cta_loads: "See available loads", hero_cta_wait: "Join the waitlist",
      fact_loads: "loads available", fact_window: "fixed price per truckload", fact_border: "pickup with your own carrier",
      hero_caption: "Sample truck: real photo of a trailer we received (May 2026).",
      trust_noauction: "No auctions — you decide", trust_flatprice: "Flat price before you commit",
      trust_manifest: "Real manifest, not a template", trust_whatsapp: "Direct answers on WhatsApp",
      receiving_h: "How we actually receive loads", receiving_sub: "Real, unedited video from our warehouse. Not footage of a specific load in the list below.",
      receiving_play: "Tap to play",
      loads_h2: "Available loads", loads_sub: "Fixed price per full truckload. Reserve or buy; first to reserve, first to load.",
      loads_sold_h2: "Recently sold", loads_sold_sub: "So you can see what usually comes in.",
      status_available: "Available", status_sold: "Sold", status_reserved: "Reserved", status_on_hold: "On hold",
      units: "Units", pallets: "Pallets", location: "Location", weight: "Approx. weight", condition: "Condition",
      price_pickup: "Price picked up in Texas", price_pickup_short: "picked up in TX", per_unit: "per unit",
      delivered_quote: "Delivered to your warehouse: we quote", see_load: "View load", reserve: "Reserve", buy: "Buy now", quote: "Shipping quote",
      photo_pending: "Photos pending", photo_pending_sub: "Taken when the trailer lands. Ask on WhatsApp.", photo_none_sample: "No sample photos yet.",
      photo_next_h: "Photos of the next trailer", photo_next_sub: "We don't have sample photos for this line yet. We'll send real photos of the next trailer over WhatsApp as soon as it lands.", photo_next_cta: "Ask for photos on WhatsApp",
      how_guide: "How do I buy?", how_h2: "How it works", how_sub: "Four steps. No account, no auction.",
      how1_h: "Look at the load", how1_p: "Units, pallets, condition, location and fixed price on one screen.",
      how2_h: "Reserve or buy", how2_p: "Reserve holds the load 24 h while you confirm payment. Buy now closes it.",
      how3_h: "Pay", how3_p: "Wire, ACH or deposit. We send a Zoho invoice on confirmation.",
      how4_h: "Pick up or we ship", how4_p: "Pick up with your own carrier in Texas (location confirmed on reservation), or ask us for freight to your US warehouse. We don't ship to Mexico. If your carrier crosses into Mexico, you arrange that part.",
      wait_h2: "Buyer waitlist", wait_sub: "New loads go to the waitlist first. Tell us what you want and we message you on WhatsApp when a fit lands.",
      f_name: "Name", f_company: "Company (optional)", f_phone: "WhatsApp / phone", f_email: "Email (optional)", f_city: "Delivery city",
      notify_email: "Email address", notify_submit: "Notify me by email",
      other_cat_h: "Other categories", other_cat_sub: "Sold out for now. Leave your email and we'll notify you when available.",
      status_soldout: "Sold out",
      cat_retail_title: "General merchandise from a major US retailer", cat_retail_desc: "Full truckloads of returns and overstock from a major US retailer. Availability varies — sold out for now.",
      cat_ecom_title: "E-commerce customer-return pallets", cat_ecom_desc: "E-commerce customer-return pallets, sold by the piece. Sold out for now.",
      f_retailers: "What you want", f_budget: "Budget per truckload (USD)", f_notes: "Notes",
      f_consent: "I agree that Liquidation Pros may contact me on WhatsApp or email about available loads.",
      f_submit_wait: "Join the waitlist", f_send_wa: "Open WhatsApp to send", wa_blocked: "Saved. Your browser blocked the popup: tap \"Open WhatsApp to send\" so we receive your request.", f_send_mail: "Send via email",
      f_qty: "Pallets or units", f_dest: "Destination (city, state)", f_zip: "ZIP / postal code",
      f_offer: "Your offer (USD)", f_offer_hint: "Reasonable offers get a same-day answer.",
      form_saved: "Saved. WhatsApp opened with your message: tap Send there. If not, send it on WhatsApp or email so we receive it:",
      faq_h2: "Frequently asked questions",
      faq1_q: "Can I see the manifest before I pay?", faq1_a: "Yes — we send the manifest so you can review contents and estimated retail value before you commit to a load.",
      faq2_q: "Does the price include freight, or is that separate?", faq2_a: "Merchandise price and freight are quoted separately — that lets you choose your own pickup (in Texas) or have us quote freight to your US warehouse (we do not ship to Mexico). We'll give you both numbers so it's clear.",
      faq3_q: "Do you arrange freight, or do you only sell the merchandise?", faq3_a: "Both — you're welcome to arrange your own pickup/trucking, or we can quote freight for you based on real recent lane costs to get it to your US warehouse.",
      faq4_q: "Where do I pick up the merchandise?", faq4_a: "Pickup is in Texas. We confirm the location and exact address when you reserve your load.",
      faq5_q: "How do I confirm my payment (Zelle/wire) was received?", faq5_a: "Send us a screenshot or confirmation number of your payment on WhatsApp and we'll verify it and confirm back to you.",
      faq6_q: "How often do you have new loads available?", faq6_a: "We move fast — we don't warehouse inventory, so loads turn over roughly within a day of arrival. Availability depends on what's coming in. Message us on WhatsApp and we'll tell you what's available right now.",
      faq_see_all: "See all questions →",
      faqp_h1: "Frequently asked questions", faqp_lead: "Direct answers to what buyers ask us most on WhatsApp. Not here? Message us.",
      faqp_cta_h: "Another question?", faqp_cta_p: "Message us on WhatsApp and we'll answer directly.", faqp_cta_btn: "Ask on WhatsApp",
      faqp_t_manifests: "Manifests", faqp_t_pricing: "Pricing & Deposits", faqp_t_freight: "Freight & Quotes",
      faqp_t_pickup: "Pickup in Texas", faqp_t_payment: "Payment Methods", faqp_t_timing: "Timing / Availability",
      faqp_t_border: "Border pickup",
      border_h: "Recolección en Texas / Texas pickup",
      border_p: "Pickup in Texas; the exact location is confirmed on reservation. You pick up with your own carrier; we do not arrange freight or the border crossing into Mexico. Before you cross, have ready: driver ID, carrier name and tractor/trailer plates, a confirmed pickup window, proof of payment received, exporter RFC, export pedimento or corresponding customs document, and an on-site contact to sign the packing list.",
      border_line_h: "Pickup:", border_faq_link: "See the self-pickup option to save on freight →",
      contact_h2: "Contact", contact_sub: "We speak Spanish and English. WhatsApp gets the fastest reply.",
      contact_wa: "WhatsApp", contact_phone: "Call", contact_mail: "Email", contact_addr: "Warehouse",
      contact_form_h: "Message us", f_msg: "Message",
      ftr_about: "Liquidation Pros LLC buys liquidation truckloads and pallets from major retail liquidation sources directly in the US and sells them to wholesalers, with pickup in Texas.",
      ftr_fine: "Prices in USD, picked up in Texas unless stated. Merchandise sold as-is. Retailer names are trademarks of their owners and are used only to describe origin.",
      ftr_privacy: "Privacy notice", ftr_terms: "Terms of sale", ftr_contact: "Contact",
      priv_h1: "Privacy notice", priv_updated: "Last updated: September 2026",
      priv_lead: "This notice explains, in plain language, what data we collect when you use the quote form or message us on WhatsApp, and how we use it.",
      priv_collect_h: "What data we collect", priv_collect_p: "When you fill in the quote, waitlist or contact form, or message us on WhatsApp, we save: your name, WhatsApp/phone number, delivery city or destination, what you're interested in buying, budget (if given) and any notes you leave. We do not ask for or store payment card data on the site. We also use Google Analytics to count visits and clicks (page views, WhatsApp/phone clicks, form submits); Google may use cookies for this.",
      priv_use_h: "What we use it for", priv_use_p: "Only to answer your quote or request, tell you about available loads that match what you're looking for, and coordinate pickup or freight. We do not use it for anything else.",
      priv_share_h: "We do not sell your data", priv_share_p: "Liquidation Pros LLC does not sell or rent your information to third parties. Your data is only used internally to help you.",
      priv_delete_h: "How to request deletion", priv_delete_p: "Message us on WhatsApp or email juan@lpros.biz asking us to delete your information and we will.",
      term_h1: "Terms of sale", term_updated: "Last updated: September 2026",
      term_lead: "A plain summary of how we sell: no fine print beyond the following.",
      term_asis_h: "Merchandise sold as-is", term_asis_p: "All merchandise is liquidation stock (returns, overstock or salvage) and is sold as-is, per the manifest we share with you. We do not accept returns for condition already described in the manifest.",
      term_pickup_h: "Pickup or freight", term_pickup_p: "Pickup is in Texas (location confirmed on reservation). If you need us to ship it, freight is quoted separately from the merchandise price.",
      term_price_h: "Prices in US dollars", term_price_p: "All posted prices are in USD. There is no platform fee or US sales tax on the pickup price.",
      term_noauction_h: "No auctions", term_noauction_p: "We sell at a fixed posted price, first to reserve/buy, first to load. We do not auction loads.",
      term_payment_h: "Payment before release", term_payment_p: "Merchandise is released for pickup or shipping only after payment is confirmed in full.",
      contactp_h1: "Contact", contactp_lead: "We speak Spanish and English. WhatsApp is fastest.",
      e404_h1: "Page not found", e404_p: "The link may be mistyped, or the page no longer exists.", e404_cta: "Back to home",
      back: "All loads", ref: "Ref.", listed: "Landed", sale_window: "First to reserve", window_note: "First to reserve, first to load.",
      condition_h: "Condition", manifest_h: "Manifest by category", photos_h: "Truck photos",
      manifest_pending: "The full manifest (seller CSV) is available. Ask on WhatsApp with the load reference; the category breakdown will show here once imported.",
      manifest_none: "This load sold without a category manifest. Categories seen in the truck:",
      cat: "Category", qty: "Units", retail: "Retail value", note: "Note",
      retail_note: "Retail value ≠ resale price.",
      cond_returns_mixed: "Unsorted returns and overstock, mixed",
      cond_returns_mixed_p: "General merchandise from a retail return center: new in box, open box and damaged pieces mixed together. Unsorted. Sold as a full truckload, as-is.",
      cond_salvage: "Salvage (damaged / open box)",
      cond_salvage_p: "Pallets marked salvage: open or damaged packaging, product mostly usable. Sold as-is.",
      cond_customer_returns: "Customer returns, unsorted",
      cond_customer_returns_p: "Customer-return pallets: clothing, footwear and general merchandise mixed together, unsorted. Sold per pallet, fixed price.",
      returns_h: "Return Pallets", returns_sub: "Customer returns sold per pallet — mixed clothing, footwear and general merchandise. Fixed price per pallet.",
      pickup_h: "Picked up at", pickup_p: "You or your carrier load at the listed location. By appointment.",
      delivered_h: "Delivered to your warehouse", delivered_p: "We quote freight to your US warehouse. Tell us your city. We do not ship to Mexico.",
      fine_buybox: "Fixed price per full truckload, USD, no US sales tax. No platform fees.",
      wa_open: "WhatsApp will open with the message ready.", mail_open: "Your email app will open with the message ready.",
      dlg_reserve: "Reserve this load", dlg_buy: "Buy this load", dlg_quote: "Shipping quote", dlg_wait: "Waitlist",
      opt_pickup: "I pick up in Texas", opt_delivered: "Delivered to my warehouse (quote)",
      sold_banner: "This load has sold. Join the waitlist for the next one.",
      hold_banner: "This load is on hold and not for sale right now. Join the waitlist for the next one.",
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
  const priceTxt = (l) => l.price_pickup == null ? t("price_tbd") : money(l.price_pickup);
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
  /* UTM + A/B variant captured on oferta.html (ads landing) and stored under "lpos.utm" —
     appended here so every WhatsApp/email CTA on the site (reserve, buy, quote, waitlist, contact)
     carries the same campaign reference once a visitor has landed from an ad. */
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
  function getUtm() { try { return JSON.parse(localStorage.getItem("lpos.utm") || "null") || {}; } catch (e) { return {}; } }
  /* First-touch capture on ANY landing page: written once, never overwritten by later visits. */
  (function () {
    try {
      const qs = new URLSearchParams(location.search), u = {};
      UTM_KEYS.forEach((k) => { if (qs.get(k)) u[k] = qs.get(k); });
      if (Object.keys(u).length && !UTM_KEYS.some((k) => getUtm()[k])) {
        u.ts = new Date().toISOString(); u.landing = location.pathname;
        localStorage.setItem("lpos.utm", JSON.stringify(u));
      }
    } catch (e) {}
  })();
  function utmSuffix() {
    const u = getUtm();
    const ref = [u.utm_source, u.utm_campaign, u.utm_content].filter(Boolean).join("/");
    const ids = ["gclid", "fbclid"].filter((k) => u[k]).map((k) => k + "=" + u[k]).join(" ");
    const all = [ref, ids].filter(Boolean).join(" ");
    return all ? "\n[ref: " + all + "]" : "";
  }
  function waLink(text) { return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text + utmSuffix()); }
  function mailLink(subject, body, email) { return "mailto:" + (email || DATA.contact.email) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body + utmSuffix()); }

  function fillContact() {
    const c = DATA.contact;
    document.querySelectorAll("[data-wa]").forEach((a) => { a.href = waLink(a.dataset.wa || (lang === "es" ? "Hola, vi su sitio de cargas." : "Hi, I saw your loads site.")); a.target = "_blank"; a.rel = "noopener"; });
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
    if (sm) {
      return `<div class="ph-placeholder" role="img" aria-label="${esc(t("photo_next_h"))}"><div><b>${esc(t("photo_next_h"))} — ${esc(load.retailer)}</b>${esc(t("photo_next_sub"))}</div></div>`;
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
          <div>${esc(t("location"))}: <b>${esc(t("pickup_label"))}</b></div>
          <div>${esc(t("condition"))}: <b>${esc(t("cond_" + load.condition_code).split(" (")[0].split(",")[0])}</b></div>
        </div>
        <div class="ship">${shipLine(load, href)}</div>
        <div class="price">
          <div><strong>${priceTxt(load)}</strong><br><small>${esc(t("price_pickup_short"))}</small></div>
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
      : `📍 ${esc(t("ship_pickup"))} ${esc(t("pickup_label"))} · <a href="${href}#quote">${esc(t("quote"))}</a>`;
  }
  function money2(n) { return new Intl.NumberFormat(lang === "es" ? "es-MX" : "en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n); }
  function isBorderPickup(load) { return false; } // pickup city unconfirmed per load; generic Texas copy only

  // R3754: empty-inventory state. Shown only when no load is "available".
  // Generic load types, no prices, no retailer names, no order numbers: nothing here is an offer.
  function sourcingNext() {
    const es = lang === "es";
    const items = es ? [
      ["Tráiler completo", "Mercancía general", "Hogar, juguetes, almacenaje y artículos variados. Entre 22 y 26 tarimas, entrega en el Valle de Texas."],
      ["Tráiler completo", "Mixto con manifiesto", "Tráiler con lista de piezas por tarima, para comprar sabiendo qué trae. Entre 23 y 27 tarimas."],
      ["Tarimas sueltas", "Ropa y calzado", "Lotes de 2 a 10 tarimas de ropa, ropa infantil y zapatos, vendidos por pieza o por tarima."]
    ] : [
      ["Full truckload", "General merchandise", "Home, toys, storage and assorted items. 22 to 26 pallets, delivered in the Rio Grande Valley."],
      ["Full truckload", "Mixed, with manifest", "A truckload with a per-pallet item list, so you buy knowing what is inside. 23 to 27 pallets."],
      ["Loose pallets", "Clothing and shoes", "Lots of 2 to 10 pallets of apparel, kids wear and shoes, sold by the piece or by the pallet."]
    ];
    const head = es ? "Hoy no hay cargas disponibles. Esto es lo que estamos buscando:" : "No loads available today. This is what we are sourcing:";
    const tag = es ? "En búsqueda" : "Sourcing";
    const note = es ? "Aún no son ofertas ni tienen precio. Las cargas se venden rápido: deje su WhatsApp y le avisamos antes de publicarlas." : "These are not offers yet and have no price. Loads sell fast: leave your WhatsApp and we message you before they are posted.";
    const cta = es ? "Avíseme de la próxima carga" : "Notify me of the next load";
    return `<div class="sourcing"><p class="sourcing-head">${head}</p><div class="sourcing-grid">` +
      items.map((i) => `<article class="src-card"><span class="pill pill-warn">${tag}</span><div class="src-kind">${i[0]}</div><h3>${i[1]}</h3><p>${i[2]}</p></article>`).join("") +
      `</div><p class="sourcing-note">${note}</p>
      <form class="form notify-form" novalidate>
        <label>${esc(t("notify_email"))}<input type="email" name="email" required placeholder="tu@email.com" autocomplete="email"></label>
        <button class="btn btn-red" type="submit">${esc(cta)}</button>
      </form>
      <div class="notify-out"></div></div>`;
  }

  function renderHome() {
    // R2561: id prefix, not the (possibly scrubbed/"confidential") retailer
    // text field, decides the e-commerce section -- see outputs/continuous-cto/
    // SITE_RETAILER_INTERNAL_FIELD_FIX_2026-09-26.md.
    const isEcom = (l) => /^AMZN-/.test(l.id);
    const avail = DATA.loads.filter((l) => l.status === "available" && !isEcom(l));
    const held = DATA.loads.filter((l) => l.status === "on_hold" && !isEcom(l));
    const sold = DATA.loads.filter((l) => l.status !== "available" && l.status !== "on_hold" && !isEcom(l));
    const g = document.getElementById("loads-grid");
    if (g) g.innerHTML = (avail.length || held.length) ? avail.concat(held).map(card).join("") : sourcingNext();
    bindNotify();
    { const sec = document.getElementById("loads"); if (sec) { const pl = sec.querySelector(".sec-head .pill-live"), sp = sec.querySelector(".sec-head p"); if (pl) pl.style.display = avail.length ? "" : "none"; if (sp && !avail.length) sp.textContent = lang === "es" ? "Próximamente" : "Coming up"; } } // R3754: no green "Disponible" pill / fixed-price copy over an empty list
    const s = document.getElementById("sold-grid");
    if (s) s.innerHTML = sold.map(card).join("");
    const az = document.getElementById("returns-grid");
    if (az) { const ecLoads = DATA.loads.filter(isEcom); az.innerHTML = ecLoads.length ? ecLoads.map(card).join("") : ""; const azSec = document.getElementById("returns"); if (azSec) azSec.hidden = !ecLoads.length; }
    const n = document.getElementById("fact-loads"); if (n) n.textContent = String(avail.length);
    const hp = document.getElementById("hero-photo");
    if (hp) {
      const p = DATA.sample_trucks.gm.photos[0];
      hp.innerHTML = `<img src="${esc(p.src)}" alt="${esc(L(p.alt))}" width="1600" height="1200" fetchpriority="high">`;
    }
  }

  /* ---------- per-load SEO: canonical/OG/meta + Product JSON-LD (page is client-rendered, so this fills in what the static <head> can't know) ---------- */
  function setMeta(sel, attr, val) { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); }
  function setLoadSeo(load) {
    const base = "https://lpros210.github.io/lpos-loads/";
    const url = base + "load.html?id=" + encodeURIComponent(load.id);
    const desc = `${L(load.title)}. ${num(load.units)} unidades, ${load.pallets} tarimas, ${priceTxt(load)} recogiendo en Texas.`;
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
      offers: load.price_pickup == null ? undefined : {
        "@type": "Offer", url, priceCurrency: "USD", price: load.price_pickup,
        availability: load.status === "available" ? "https://schema.org/InStock" : load.status === "on_hold" ? "https://schema.org/OutOfStock" : "https://schema.org/SoldOut",
        itemCondition: "https://schema.org/UsedCondition",
        seller: { "@type": "Organization", name: "Liquidation Pros LLC" },
      },
    });
  }

  /* ---------- full FAQ page (preguntas.html) — verbatim from outputs/ads/FAQ_AND_ANSWERS_2026-09-07.md,
     auto-answer-OK items plus any answer with no [ASSUMPTION]/[SUPUESTO] placeholder. Grouped by topic. */
  const FAQS = [
    { topic: "manifests", q: { es: "¿El manifiesto es real o es genérico?", en: "Is the manifest real, or generic?" },
      a: { es: "Real — los manifiestos vienen de los datos reales del listado del minorista, no de una plantilla genérica. Los manifiestos pueden tener un pequeño margen de error, igual que en toda la industria — es estándar.",
             en: "Real — manifests come from the retailer's actual listing data, not a generic template. Manifests can still have small margin of error, same as every liquidator's — that's standard for this industry." } },
    { topic: "manifests", q: { es: "¿Puedo ver el manifiesto antes de pagar?", en: "Can I see the manifest before I pay?" },
      a: { es: "Sí — le enviamos el manifiesto para que revise el contenido y el valor estimado de venta al menudeo antes de comprometerse con una carga.",
             en: "Yes — we send the manifest so you can review contents and estimated retail value before you commit to a load." } },
    { topic: "pricing", q: { es: "¿El precio incluye el flete o es solo la mercancía?", en: "Does the price include freight, or is that separate?" },
      a: { es: "El precio de la mercancía y el flete se cotizan por separado — así puede elegir recoger usted mismo (en Texas) o que le coticemos el flete hasta su bodega en EE. UU. No enviamos a México. Le damos ambos números para que quede claro.",
             en: "Merchandise price and freight are quoted separately — that lets you choose your own pickup (in Texas) or have us quote freight to your US warehouse (we do not ship to Mexico). We'll give you both numbers so it's clear." } },
    { topic: "freight", q: { es: "¿Ustedes organizan el flete o solo venden la mercancía?", en: "Do you arrange freight, or do you only sell the merchandise?" },
      a: { es: "Las dos opciones — puede organizar su propio flete/recolección, o le cotizamos el flete usando costos reales recientes de esa ruta hasta su bodega en EE. UU.",
             en: "Both — you're welcome to arrange your own pickup/trucking, or we can quote freight for you based on real recent lane costs to get it to your US warehouse." } },
    { topic: "freight", q: { es: "¿Cuánto cuesta el flete desde Texas hasta mi bodega en EE. UU.?", en: "How much does freight cost from Texas to my US warehouse?" },
      a: { es: "Depende de la ruta, cantidad de tarimas, peso y si necesita rampa hidráulica. Mándenos por WhatsApp su destino y el tamaño de la carga y le damos un estimado basado en cargas recientes comparables — el costo final se confirma con la transportista antes de darle un número en firme.",
             en: "It depends on the lane, pallet count, weight, and whether you need a liftgate. Send us your destination and load size on WhatsApp and we'll give you an estimate based on comparable recent loads — final cost is confirmed with the carrier before you're quoted a firm number." } },
    { topic: "freight", q: { es: "¿Puedo usar mi propio transportista para recoger la carga?", en: "Can I use my own trucker to pick up the load?" },
      a: { es: "Sí — puede mandar su propio transportista a recoger en Texas. Solo confirme con nosotros la fecha/hora de recolección antes.",
             en: "Yes — you're welcome to send your own trucker for pickup in Texas. Just confirm the pickup date/time with us first." } },
    { topic: "freight", q: { es: "He tenido problemas con la transportista que ustedes usan — ¿qué pasa si el flete falla o se cancela?", en: "I've had problems with the carrier you use — what happens if freight fails or gets canceled?" },
      a: { es: "Nos tomamos en serio la confiabilidad de la transportista y estamos trabajando activamente en problemas de flete en algunas rutas. Avísenos de inmediato si una recolección se reprograma o se cae una cita y lo escalamos — es un problema conocido que estamos resolviendo activamente, no algo que vamos a ignorar.",
             en: "We take carrier reliability seriously and are actively working through freight issues on some lanes. Tell us right away if a pickup gets rescheduled or an appointment falls through and we'll escalate it — this is a known live issue we're actively fixing, not something we'll ignore." } },
    { topic: "pickup", q: { es: "¿Dónde recojo la mercancía?", en: "Where do I pick up the merchandise?" },
      a: { es: "La recolección es en Texas. Le confirmamos la ubicación y la dirección exacta al reservar su carga.",
             en: "Pickup is in Texas. We confirm the location and exact address when you reserve your load." } },
    { topic: "pickup", q: { es: "¿Necesito cita para recoger o puedo llegar directo?", en: "Do I need an appointment to pick up, or can I just show up?" },
      a: { es: "Por favor confirme una cita de recolección con nosotros primero por WhatsApp para tener la carga lista y el papeleo correcto preparado.",
             en: "Please confirm a pickup appointment with us first on WhatsApp so we have the load ready and the right paperwork prepared." } },
    { topic: "payment", q: { es: "¿Cómo confirmo que mi pago (Zelle/transferencia) ya fue recibido?", en: "How do I confirm my payment (Zelle/wire) was received?" },
      a: { es: "Mándenos por WhatsApp una captura de pantalla o el número de confirmación de su pago y lo verificamos y le confirmamos.",
             en: "Send us a screenshot or confirmation number of your payment on WhatsApp and we'll verify it and confirm back to you." } },
    { topic: "timing", q: { es: "¿Con qué frecuencia tienen cargas nuevas disponibles?", en: "How often do you have new loads available?" },
      a: { es: "Nos movemos rápido — no almacenamos inventario, así que las cargas rotan en cuestión de un día tras llegar. La disponibilidad depende de lo que esté entrando. Escríbanos por WhatsApp y le decimos qué hay disponible ahora mismo.",
             en: "We move fast — we don't warehouse inventory, so loads turn over roughly within a day of arrival. Availability depends on what's coming in. Message us on WhatsApp and we'll tell you what's available right now." } },
    { topic: "timing", q: { es: "¿Tienen mercancía disponible ahora mismo?", en: "Do you have merchandise available right now?" },
      a: { es: "Escríbanos por WhatsApp y le decimos exactamente qué tenemos disponible hoy — la disponibilidad cambia rápido porque no almacenamos las cargas.",
             en: "Message us on WhatsApp and we'll tell you exactly what's in and available today — availability changes fast since we don't warehouse loads." } },
    { topic: "border", q: { es: "¿Puedo recoger con mi propio transportista para ahorrar en flete?", en: "Can I pick up with my own carrier to save on freight?" },
      a: { es: "Sí — recolección en Texas; la ubicación exacta se confirma al reservar. Usted recoge con su propio transportista; no organizamos flete ni cruce a México.",
             en: "Yes — pickup is in Texas; the exact location is confirmed on reservation. You pick up with your own carrier; we do not arrange freight or the border crossing into Mexico." } },
    { topic: "border", q: { es: "¿Qué necesito para cruzar la carga a México como exportador?", en: "What do I need to cross the load into Mexico as the exporter?" },
      a: { es: "Antes de que liberemos la carga tenga listo: identificación oficial del chofer, nombre de la transportista y placas del tractocamión/remolque, ventana de recolección confirmada, comprobante de pago recibido (wire o Zelle), RFC del exportador, pedimento de exportación o documento aduanal correspondiente, y una persona de contacto en sitio para firmar la lista de empaque.",
             en: "Before we release the load, have ready: official driver ID, carrier name and tractor/trailer plates, a confirmed pickup window, proof of payment received (wire or Zelle), exporter RFC, export pedimento or the corresponding customs document, and an on-site contact to sign the packing list." } },
  ];
  const FAQ_TOPICS = ["manifests", "pricing", "freight", "pickup", "border", "payment", "timing"];
  function renderFaqPage() {
    const root = document.getElementById("faqp-root");
    if (!root) return;
    root.innerHTML = FAQ_TOPICS.map((topic) => {
      const items = FAQS.filter((f) => f.topic === topic);
      if (!items.length) return "";
      return `<div class="faq-group" id="faq-${esc(topic)}"><h2>${esc(t("faqp_t_" + topic))}</h2><div class="faq">` +
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
    const nextTrailerCard = `<div class="gallery"><figure><div class="ph-placeholder"><div><b>${esc(t("photo_next_h"))} — ${esc(load.retailer)}</b>${esc(t("photo_next_sub"))}<br><a class="btn btn-red btn-sm" data-wa="${esc((lang === "es" ? "Hola, quiero fotos del próximo tráiler " : "Hi, I'd like photos of the next ") + load.retailer + (lang === "es" ? "" : " trailer"))}" href="#" style="margin-top:.5rem;display:inline-block">${esc(t("photo_next_cta"))}</a></div></figure></div>`;
    const photos = pics && pics.length
      ? (isSample ? `<div class="sample-head"><span class="pill pill-warn">${esc(L(sm.label))}</span><span>${esc(L(sm.note))}</span></div>` : "") + gallery(pics)
      : (sm ? nextTrailerCard : `<div class="gallery"><figure><div class="ph-placeholder"><div><b>${esc(t("photo_pending"))}</b>${esc(t("photo_pending_sub"))}</div></div></figure></div>`);
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
        ${!isAvail ? `<div class="notice" style="margin-bottom:1rem">${esc(load.status === "on_hold" ? t("hold_banner") : t("sold_banner"))} <a href="index.html#waitlist">${esc(t("nav_waitlist"))} →</a></div>` : ""}
        ${photos}
        ${video}
        <div class="kv">
          <div><span>${esc(t("units"))}</span><b>${num(load.units)}</b></div>
          <div><span>${esc(t("pallets"))}</span><b>${esc(load.pallets)}</b></div>
          <div><span>${esc(t("weight"))}</span><b>${load.weight_lb ? num(load.weight_lb) + " lb" : "—"}</b></div>
          <div><span>${esc(t("location"))}</span><b>${esc(t("pickup_label"))}</b></div>
        </div>
        <section class="block"><h2>${esc(t("condition_h"))}</h2><div class="cond"><p><b>${esc(t(condKey))}.</b> ${esc(t(condKey + "_p"))}</p></div></section>
        <section class="block"><h2>${esc(t("manifest_h"))}</h2>${manifest}</section>
        <section class="block"><h2>${esc(t("location"))}</h2><div class="cond"><p><b>${esc(t("pickup_h"))} ${esc(t("pickup_label"))}.</b> ${esc(t("pickup_p"))}</p><p style="margin-top:.5rem"><b>${esc(t("delivered_h"))}.</b> ${esc(t("delivered_p"))}</p></div></section>
        <section class="block"><h2>${esc(t("border_h"))}</h2><div class="notice"><p>${isBorderPickup(load) ? esc(t("border_p")) : `${esc(t("border_line_h"))} ${esc(t("pickup_label"))}. <a href="preguntas.html#faq-border">${esc(t("border_faq_link"))}</a>`}</p></div></section>
        <section class="block" id="quote"><h2>${esc(t("quote_h"))}</h2><div id="quote-widget"></div></section>
      </div>
      <aside class="side">
        <div class="buybox" id="reserve">
          <div class="p-main"><strong>${priceTxt(load)}</strong><span>USD</span></div>
          <div class="p-sub">${esc(t("price_pickup"))}${perUnit ? ` · ${money2(perUnit)} ${esc(t("per_unit"))}` : ""}</div>
          <div class="opts">
            <div class="opt"><div><b>${esc(t("opt_pickup"))}</b><small>${esc(t("pickup_label"))}</small></div><div class="amt">${priceTxt(load)}</div></div>
            <div class="opt"><div><b>${esc(t("opt_delivered"))}</b><small>TX</small></div><div class="amt">${load.price_delivered ? money(load.price_delivered) : (lang === "es" ? "Cotizar" : "Quote")}</div></div>
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
      sticky.innerHTML = `<div class="price">${priceTxt(load)}<small>${esc(t("price_pickup_short"))}</small></div><button class="btn btn-red" data-open="reserve">${esc(t("reserve"))}</button><a class="btn btn-wa" data-wa="${esc((lang === "es" ? "Hola, me interesa la carga " : "Hi, I'm interested in load ") + load.id)}" href="#" aria-label="WhatsApp">WA</a>`;
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
        <div class="notice" style="background:var(--bg-2);border-left-color:var(--black)"><b>${esc(load.retailer)} · ${esc(load.id)}</b> · ${priceTxt(load)} ${esc(t("price_pickup_short"))}</div>
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
      const body = [subject, `${load.retailer} · ${L(load.title)}`, `${t("price_pickup")}: ${priceTxt(load)}`, "",
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
  /* Opens WhatsApp right after submit (inside the click gesture). If the browser blocks the popup the
     visible "Open WhatsApp to send" button is the fallback; the lead is also saved in localStorage. */
  function openWA(url) { try { const w = window.open(url, "_blank"); if (w) { w.opener = null; return true; } } catch (e) {} return false; }
  function showSendLinks(out, subject, body) {
    const wa = waLink(body), opened = openWA(wa);
    out.innerHTML = `<div class="notice ok" role="status"><p style="margin:0 0 .6rem">${esc(t(opened ? "form_saved" : "wa_blocked"))}</p>
      <div style="display:grid;gap:.5rem"><a class="btn btn-wa" href="${wa}" target="_blank" rel="noopener">${esc(t("f_send_wa"))}</a><a class="btn btn-line" href="${mailLink(subject, body)}">${esc(t("f_send_mail"))}</a></div></div>`;
    out.scrollIntoView({ block: "nearest" });
  }

  // Simple email-only "notify me" capture for the empty-inventory state -- no
  // budget/qualification fields, unlike the full waitlist form. Same no-backend
  // pattern as every other form on this static site: saved locally, then the
  // visitor sends it themselves via WhatsApp or email. Re-bound on every
  // renderHome() call since the form is only in the DOM when there are 0
  // available loads (recreated by innerHTML each render).
  // One handler for every ".notify-form" on the page (the empty-inventory
  // form plus one per sold-out category card). Each form carries
  // data-category so we know which list a signup belongs to; output goes
  // to the next sibling ".notify-out". Bound once per form node -- the
  // empty-inventory form is recreated by innerHTML on every renderHome(),
  // but the category-card forms are static markup that would otherwise
  // get a duplicate listener on every language toggle re-render.
  function bindNotify() {
    document.querySelectorAll(".notify-form").forEach((form) => {
      if (form.dataset.bound) return;
      form.dataset.bound = "1";
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.reportValidity()) return;
        const f = Object.fromEntries(new FormData(form).entries());
        const category = form.dataset.category || "general";
        saveLocal("lpos.notify", { ts: new Date().toISOString(), lang, category, ...f });
        const catLabel = category === "retail_gm" ? (lang === "es" ? "mercancía general" : "general merchandise") : category === "ecommerce_returns" ? (lang === "es" ? "devoluciones de comercio electrónico" : "e-commerce returns") : (lang === "es" ? "próxima carga" : "next load");
        const subject = (lang === "es" ? `Avíseme: ${catLabel}` : `Notify me: ${catLabel}`) + " · Liquidation Pros";
        const body = `${subject}\n\n${t("notify_email")}: ${f.email}`;
        const out = form.nextElementSibling;
        if (out) showSendLinks(out, subject, body);
      });
    });
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


  /* ---------- shipping quote ----------
     R-NOMXFREIGHT: LPOS picks up/ships within the US only -- it does not arrange or
     quote cross-border freight into Mexico, and this widget no longer shows an instant
     dollar estimate (it was derived from a handful of historical lanes that don't
     reflect current freight costs and actively misled buyers). It now only collects a
     destination ZIP + pallet count as reference for the official human-quoted
     WhatsApp/Freightquote path below. */
  function renderQuote(root, load) {
    if (!root) return;
    const loads = DATA.loads.filter((l) => l.status === "available");
    const sel = !load ? `<label>${esc(t("q_load"))}<select name="load"><option value="">${esc(t("q_any_load"))}</option>${loads.map((l) => `<option value="${esc(l.id)}">${esc(L(l.program))} \u00b7 ${esc(l.id)} \u00b7 TX</option>`).join("")}</select></label>` : "";
    root.innerHTML = `<form class="form quote" novalidate>
      ${sel}
      <div class="row">
        <label>${esc(t("q_dest"))} *<input name="dest" required inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="78501" autocomplete="postal-code"><span class="hint">${esc(t("q_dest_hint"))}</span></label>
        <label>${esc(t("q_pallets"))}<input name="pallets" type="number" min="1" max="30" inputmode="numeric" value="${load ? esc(String(load.pallets).split(/[\u2013-]/).pop()) : 26}"></label>
      </div>
      <button class="btn btn-red" type="submit">${esc(t("q_btn"))}</button>
      <div id="q-out" aria-live="polite"></div></form>`;
    const form = root.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const f = Object.fromEntries(new FormData(form).entries());
      const ld = load || DATA.loads.find((l) => l.id === f.load) || null;
      const origin = ld ? ld.location.city : "Texas";
      const seller = ld ? ld.freight_control === "seller" : false;
      const out = form.querySelector("#q-out");
      let html = `<div class="notice">${esc(t("q_generic"))}</div>`;
      const summary = [`Liquidation Pros LLC \u00b7 ${t("q_official")}`, `Origin: ${origin}`, `Destination ZIP: ${f.dest}`, `Pallets: ${f.pallets} \u00b7 dry van 53' \u00b7 ~${ld && ld.weight_lb ? num(ld.weight_lb) : "30,000"} lb \u00b7 general merchandise`, ld ? `Load: ${ld.id}` : null].filter(Boolean).join("\n");
      const waText = (lang === "es" ? "Hola, quiero la cotizaci\u00f3n oficial de flete.\n" : "Hi, I'd like the official freight quote.\n") + summary;
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
      openWA(waLink(waText));
      saveLocal("lpos.quotes", { ts: new Date().toISOString(), lang, origin, dest: f.dest, pallets: f.pallets, load: ld ? ld.id : null });
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
      const mail = mailLink(subject, body, DATA.contact.leads_email);
      const out = document.getElementById("lead-out");
      out.innerHTML = `<div class="notice ok"><p style="margin:0 0 .6rem">${esc(t("lead_done"))}</p><div style="display:grid;gap:.5rem"><a class="btn btn-wa" href="${wa}" target="_blank" rel="noopener">${esc(t("f_send_wa"))}</a><a class="btn btn-line" href="${mail}">${esc(t("f_send_mail"))}</a></div></div>`;
      out.scrollIntoView({ block: "nearest" });
      if (!openWA(wa)) out.querySelector("p").textContent = t("wa_blocked");
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
