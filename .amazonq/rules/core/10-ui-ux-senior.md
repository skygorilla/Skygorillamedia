# UI/UX SENIOR STANDARD (AA)
Tokens: --space-* --shadow-* --duration-* --bp-* --color-* --font-size-* ; BEM .sg-/ .tm-.
Must-have states: loading/empty/error/no-permission.
Perf budgets: JS ≤180KB gz, LCP ≤2.5s, CLS ≤0.1, INP ≤200ms.
A11y: keyboard paths, focus rings, landmarks, jest-axe/pa11y=0 violations.
Triage order: Hydration → Specificity → Stacking → Overflow → Sticky → Assets → CLS.
Do not violate tokens/layout; smallest viable diff.