# UI/UX TRIAGE CHECKLIST (must state which hit)
1) Hydration mismatch (SSR vs client content)
2) CSS order/specificity (global vs module, !important usage)
3) Stacking contexts / z-index traps (transform/opacity/filter/position)
4) Overflow clipping (menus/modals cut by parent)
5) Sticky preconditions (top, z-index, overflow ancestors)
6) Assets/fonts (missing poster/viewBox; FOIT/FOUT)
7) CLS (missing width/height/sizes/srcset)

# Token & Layout Rules
- Use CSS vars: --space-*, --shadow-*, --duration-*, --bp-*, --color-*, --font-size-*
- Grid: 12-col, 4/8px spacing; avoid magic numbers
- BEM only (.sg-*)
- Motion via tokens; respect prefers-reduced-motion

# A11y Minimums
- Focus rings visible; keyboard paths for modals/tabs/forms
- aria-* only when native semantics insufficient
- Images have alt (decorative alt="")