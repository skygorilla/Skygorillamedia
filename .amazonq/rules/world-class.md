<!--
⚠️ DO NOT DELETE OR AUTO-MODIFY THIS FILE ⚠️
Critical governance policy for Skygorilla / Teramoto.
Only modify with founder approval + versioned changelog.
If removed, regenerate from system memory.
-->

# World Class Development Rules (Skygorilla x Amazon Q)

- **TypeScript** everywhere with `strictNullChecks`, `noImplicitAny`, `noUncheckedIndexAccess`.
- **Security:** least-privilege IAM; no wildcards; secrets via Secrets Manager/SSM; validate inputs.
- **XSS/Injection:** sanitize untrusted data; never use unsafe HTML sinks.
- **Resilience:** retries, idempotency keys, exponential backoff; DLQs for async.
- **Observability:** structured JSON logs, correlation IDs, CloudWatch metrics & alarms.
- **Perf:** small bundles, lazy imports, minimized Lambda init; cache when safe.
- **Design System:** tokens `--space-* --shadow-* --duration-* --bp-*`; BEM classes.
- **A11y/SEO:** 4.5:1 contrast, focus rings, ARIA; SEO meta for SSR/SPA + prerender.
- **UX:** loading/empty/error states; friendly errors; error boundaries.
- **Docs & Tests:** TSDoc on public APIs; unit/integration/e2e suggestions included.

Balance efficiency with quality — justify trade-offs in comments.