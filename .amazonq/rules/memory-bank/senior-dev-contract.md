# Senior Dev Operating Contract (One-Page)

## 0) Mode & Output

* **Default:** TERSE. If unclear → output only `NEED: <one short question>`.
* **Output order only:** **PATCH → COMMANDS → COMMIT** (≤80 words outside code).

## 1) Evidence-First (no blind edits)

Before any change, collect and attach:

* **console.log**, **network.har**, **dom.html**, **cssom.json**, **screenshot.png**
* If React/Next: **hydration.json** (mismatch check)

## 2) Minimal, Surgical Changes

* Touch the **fewest files/lines**.
* No "nice to have" features.
* Keep styles/tokens/architecture intact unless the bug is there.

## 3) Quality Gates (must pass)

* **Types:** TS strict (noImplicitAny, strictNullChecks, noUncheckedIndexAccess)
* **Security:** input validation, XSS-safe, secrets via **Secrets Manager/SSM**
* **A11y:** WCAG AA, focusable, keyboard paths; `jest-axe`/`pa11y-ci` green
* **Perf budgets:** first-load JS ≤ **180KB gz**, LCP ≤ **2.5s**, CLS ≤ **0.1**, INP ≤ **200ms**
* **UX states:** Loading / Empty / Error / No-permission present
* **i18n:** HR/EN externalized strings; no runtime string concat
* **SEO:** title/meta/canonical/structured data on indexable pages

## 4) Observability & Resilience

* **Logs:** structured JSON with correlation/request IDs
* **Tracing:** FE → API → DB/Queue (X-Ray/OpenTelemetry)
* **Alarms:** Lambda error/timeout/throttle, DynamoDB throttle, KPI custom metrics
* **Queues:** DLQ with retention, replay tool, depth alarm
* **Secrets:** rotation 30–60d, env-scoped names, cached fetch + backoff fallback

## 5) UI/UX System (do not violate)

* **Tokens:** `--space-* --shadow-* --duration-* --bp-* --color-* --font-size-*`
* **Naming:** BEM (`.sg-` / `.tm-`) only
* **Motion:** tokenized durations; respect `prefers-reduced-motion`
* **Layout:** 12-col grid, 4/8px spacing; no magic numbers; avoid stacking-context traps
* **Triage checklist:** Hydration → Specificity → Stacking → Overflow → Sticky → Assets → CLS

## 6) Compliance (Croatia/EU)

* **GDPR:** retention matrix, consent logs, DSR export/delete, EU regions only
* **VAT:** correct rates, reverse-charge notes, line VAT shown
* **Invoices:** sequential, gapless, OIB, 10-year archive; PDF artifact
* **Backups:** Firestore export/Dynamo PITR; quarterly restore drill

## 7) Testing Matrix (green before merge)

* Unit + Integration + E2E (critical flows)
* A11y (`jest-axe`, `pa11y-ci`) = 0 violations
* Perf (Lighthouse CI ≥ 0.90); Size-Limit passes
* Security rules tests (Firestore) / IAM least-priv review

## 8) Release Safety

* Preview channels per PR; **blue-green/canary** deploy; auto-rollback on alarm breach
* CSP hardened; security headers; SSL/TLS 1.2+

## 9) Tooling Limits (for agents)

* Allowed tools: **fsRead, fsReplace, executeBash** (unless user expands)
* Protected files (never modify/delete without explicit approval):
  `.amazonq/rules/*`, policy files, security rules, tokens, compliance docs

## 10) Session Boot (paste at start)

```
MODE: TERSE, RULES: LOADED
Enforce: evidence-first, PATCH→COMMANDS→COMMIT, quality gates, UI triage.
If uncertain → NEED:<one question>. No extras beyond the fix.
```

That's the whole playbook in one page.