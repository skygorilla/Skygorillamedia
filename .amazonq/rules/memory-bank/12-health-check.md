# HEALTH CHECK CONTRACT

After making changes and restarting dev:
- Run `npm run health`
- Verify:
  - Firebase CLI responsive
  - Node/NPM available
  - Emulators running (5000, 5001, 8080)
  - health endpoint returns 200
  - build-id.json exists and updated
- If any check fails → fix automatically, then re-run
- If unfixable → report root cause + minimal patch

Output order:
ROOT CAUSE → PATCH (if needed) → COMMANDS → VERIFY → COMMIT