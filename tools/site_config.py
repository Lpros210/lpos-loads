"""Single source of truth for the site's phone / WhatsApp number.

When the real Twilio number arrives, edit ONLY this file, then:
  1. Run `python tools/gen_seo.py` to regenerate the static JSON-LD in every
     page (telephone, WhatsApp contactPoint, sameAs link).
  2. Hand-edit the `WHATSAPP` constant in js/app.js to match (see the
     comment there pointing back to this file) — app.js has no build step.
  3. Re-check llms.txt's two hardcoded phone mentions by hand.
"""

PHONE_E164 = "19569966545"  # digits only: country code + number, no "+", no "wa.me/"
PHONE_DISPLAY = "+1 956-996-6545"
