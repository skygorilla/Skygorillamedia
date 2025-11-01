# HYPERDRIVE BEHAVIOR (runs when "-" is detected)
Behavior:
- Evidence-first (inspect code/logs/DOM/CSSOM/hydration) → minimal patch → immediate rebuild/health check.
- No feature creep. No style rewrites unless root cause is in styles.
- Prefer idempotent changes; keep API contracts stable.

Post-patch routine:
- npm run typecheck && npm run lint
- npm run build:id && npm run dev:restart
- npm run health

VERIFY must include:
- App health 200, no console errors
- UI element/state proving the change (selector or text)
- Build ID changed
- A11y quick check (no obvious violations on touched view)

Deactivation:
- Applies only to the current "- …" command. Subsequent non-"-" messages revert to normal Senior mode.