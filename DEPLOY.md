# Publish the LPOS site (2 commands, ~1 minute)

The site is staged and committed in this folder (`work/lpos-loads-pages`, branch `main`, commit 7d20a49 (Open WhatsApp CTAs in new tab)).
GitHub CLI is already logged in as **Lpros210**. Claude's auto-mode classifier blocks the publish
command, so run these yourself from this folder (or allow `gh repo create` / `gh api` in Claude's
Bash permission rules and say "publish the site").

```bash
gh repo create Lpros210/lpos-loads --public --source . --push --description "Liquidation Pros - cargas de liquidacion"
```

```bash
gh api -X POST repos/Lpros210/lpos-loads/pages -f "source[branch]=main" -f "source[path]=/"
```

Live in ~1 minute at: **https://lpros210.github.io/lpos-loads/**

## Custom domain (optional, later)
Add a DNS record at the lpros.biz registrar: `CNAME  cargas  lpros210.github.io`
then: `gh api -X PUT repos/Lpros210/lpos-loads/pages -f cname=cargas.lpros.biz`

## Redeploy after changes (v2 content lane writes to work/lpos-site-v1)
```bash
cp -r ../lpos-site-v1/{index.html,load.html,cotizar.html,preguntas.html,oferta.html,privacidad.html,terminos.html,contacto.html,404.html,css,js,data,assets} . 2>/dev/null; git add -A && git commit -m "update" && git push
```
(`data/loads.json` must stay free of cost/vendor/organization fields — `python ../lpos-site-v1/tools/check_public.py` when it exists.)
