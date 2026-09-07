"""Fail if customer-facing data leaks internal fields. Usage: python tools/check_public.py (from work/lpos-site-v1)."""
import glob, re, sys

BAD = re.compile(r"cost|bcy|vendor_id|organization|zoho_po_id|zoho_item_id|\"source\"|\"notes\"", re.I)
hits = []
for f in glob.glob("data/*.json"):
    for n, line in enumerate(open(f, encoding="utf-8"), 1):
        if BAD.search(line):
            hits.append(f"{f}:{n}: {line.strip()[:100]}")
if hits:
    print("PUBLIC CHECK FAILED\n" + "\n".join(hits)); sys.exit(1)
print("public check OK")
