#!/usr/bin/env bash
set -e
npm run typecheck
npm run lint
npm run build:id
npm run dev:restart
npm run health