#!/usr/bin/env bash
set -e
CORE_DIR=".amazonq/rules/core"
echo "Restoring core rules if altered or missing…"
for f in 00-boot.md 01-autonomous-senior.md 02-protect.md 03-output-contract.md 10-ui-ux-senior.md 12-health-check.md; do
  if [ ! -f "$CORE_DIR/$f" ]; then
    git checkout -- "$CORE_DIR/$f" 2>/dev/null || true
  fi
done
echo "✅ Core memory ensured."