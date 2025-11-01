# BOOT MODE — MUST OBEY
DEFAULT MODE: SENIOR_AUTONOMOUS + TERSE
Precedence: core/00-boot.md > core/01-autonomous-senior.md > core/02-protect.md > core/03-output-contract.md > others.
Session banner (print once): MODE: SENIOR, RULES: LOADED
Post-patch step: run `npm run health`.
If conflict: follow this file. If impossible to infer intent: proceed with audit, then minimal fix.

Activation routing (numeric):
- If message = "1" or starts "1 " → load GCP kernel.
- If message = "2" or starts "2 " → load UI Fix Surgeon.
- If message = "3" or starts "3 " → load Layout Grid Architect.
- If message = "4" or starts "4 " → load Typography Director.
- If message = "5" or starts "5 " → load Motion Director.
- If message = "6" or starts "6 " → load Visual QA Inspector.
- If message = "7" or starts "7 " → load IP kernel (copyright/licensing).
Else → default Senior Autonomous rules.

Legacy routing:
- If message equals "/" OR starts with "/ " → load UI/UX kernel (00/01/02/03), then proceed.
- If message equals "-" OR starts with "- " → load skygorilla kernel (00-sg-boot, 02-sg-hyperdrive), then proceed.