#!/usr/bin/env bash
set -e
echo "⚠ Restoring core rules from Vault…"
cp -f .amazonq/vault/core/* .amazonq/rules/core/
echo "✅ Core rules restored."