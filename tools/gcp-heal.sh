#!/usr/bin/env bash
set -euo pipefail

echo ">>> Re-auth (ADC + Firebase)"
gcloud auth login --update-adc || true
firebase login || true

echo ">>> Project context"
gcloud config list project

echo ">>> Kill stuck ports (workstation proxies/dev)"
npx kill-port 6000 9002 3000 || true

echo ">>> Verify core APIs"
gcloud services enable run.googleapis.com \
  artifactregistry.googleapis.com \
  logging.googleapis.com \
  cloudbuild.googleapis.com \
  firestore.googleapis.com \
  identitytoolkit.googleapis.com || true

echo ">>> Print identities"
gcloud auth list
gcloud auth print-identity-token >/dev/null 2>&1 && echo "OIDC ✅" || echo "OIDC ❌"

echo ">>> Done"