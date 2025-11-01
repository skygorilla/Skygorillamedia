# HEALTH CHECK CONTRACT
After each change: restart dev + `npm run health`.
Verify: Firebase CLI, Node/NPM, emulators (5000/5001/8080), /api/health 200, build-id.json updated.
If any check fails: diagnose, patch minimal, re-run; only if impossible to fix → report.