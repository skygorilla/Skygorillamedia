#!/usr/bin/env bash
set -e
VAULT=".amazonq/vault/core"; SIG=".amazonq/vault/signatures"; TARGET=".amazonq/rules/core"
for f in $VAULT/*; do bn=$(basename "$f"); vh=$(sha256sum "$f"|awk '{print $1}'); sh=$(cat "$SIG/$bn.sig" 2>/dev/null||echo x)
  [ "$vh" = "$sh" ] || { echo "❌ Vault mismatch: $bn"; exit 1; }
done
for f in $TARGET/*; do bn=$(basename "$f"); vh=$(cat "$SIG/$bn.sig"); th=$(sha256sum "$f"|awk '{print $1}')
  [ "$vh" = "$th" ] || { echo "❌ Core altered: $bn"; exit 2; }
done
echo "✅ Vault integrity verified."