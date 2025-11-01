# UI/UX HYPERDRIVE BEHAVIOR (runs on "/")
Behavior:
- Evidence-first: capture DOM, CSSOM, console, screenshot; detect hydration & CLS.
- Minimal patch only; no feature creep; do not rewrite design system unless root cause.
- Enforce tokens & BEM; fix specificity/stacking/overflow before refactors.

Post-patch routine (must run):
- npm run typecheck && npm run lint
- npm run build:id && npm run dev:restart
- npm run health

VERIFY must include:
- App health 200, console clean
- Visible proof (selector/text/CSS rule change)
- Build ID changed
- A11y quick check (no obvious violations on touched view)
- Perf note if CLS/LCP affected