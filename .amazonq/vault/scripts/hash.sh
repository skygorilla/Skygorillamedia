#!/usr/bin/env bash
set -e
VAULT=".amazonq/vault/core"; SIG=".amazonq/vault/signatures"; mkdir -p "$SIG"
for f in $VAULT/*; do bn=$(basename "$f"); sha256sum "$f" | awk '{print $1}' > "$SIG/$bn.sig"; done
echo "✅ Vault signatures updated."