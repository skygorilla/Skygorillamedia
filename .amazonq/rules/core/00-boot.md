# BOOT MODE — MUST OBEY
DEFAULT MODE: SENIOR_AUTONOMOUS + TERSE
Precedence: core/00-boot.md > core/01-autonomous-senior.md > core/02-protect.md > core/03-output-contract.md > others.
Session banner (print once): MODE: SENIOR, RULES: LOADED
Post-patch step: run `npm run health`.
If conflict: follow this file. If impossible to infer intent: proceed with audit, then minimal fix.

Activation routing:
- If message equals "/" OR starts with "/ " → load UI/UX kernel (00/01/02/03), then proceed.
- If message equals "-" OR starts with "- " → load skygorilla kernel (00-sg-boot, 02-sg-hyperdrive), then proceed.
- Otherwise → run default Senior Autonomous rules.