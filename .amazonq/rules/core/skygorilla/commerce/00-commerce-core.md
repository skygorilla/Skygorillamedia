# SG COMMERCE CORE
- Prices: store NET + VAT; display BRUTO; consistent rounding.
- VAT/EU: HR 25% default; reverse-charge for B2B when eligible; show VAT lines.
- Invoices: sequential, gapless; OIB; PDF artifact; 10-year retention.
- Payments: webhook signature verify; idempotency keys; DLQ for retries.
- Inventory: atomic stock locks; prevent oversell.
- SEO: Product/Offer schema; canonical; hreflang (hr/en).
- A11y: checkout keyboardable; labels/errors tied; 44px targets.
- Perf: LCP ≤2.5s, CLS ≤0.1 on PDP/PLP.

Output: ROOT CAUSE → PATCH → COMMANDS → VERIFY → COMMIT.