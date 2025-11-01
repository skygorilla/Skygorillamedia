#!/usr/bin/env bash
set -e
echo ">>> Firebase CLI"; firebase --version || true
echo ">>> Node"; node -v
echo ">>> Emulators"; lsof -i :8080 >/dev/null && echo "Firestore ✅" || echo "Firestore ❌"
lsof -i :5001 >/dev/null && echo "Functions ✅" || echo "Functions ❌"
lsof -i :5000 >/dev/null && echo "Hosting ✅" || echo "Hosting ❌"
echo ">>> Build ID"; [ -f public/build-id.json ] && cat public/build-id.json || echo "❌ missing"
echo ">>> App health"; curl -sf http://localhost:3000/api/health >/dev/null && echo "App ✅" || echo "App ❌"
echo ">>> DONE"