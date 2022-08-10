#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"/..

source "scripts/setup-clasp.sh"

mkdir -p .build
npm run build
cp "appsscript.json" ".claspignore" ".clasp.json" ".build"

if [ "$ENV" == "GITHUB" ]; then
  exit $(clasp push &> /dev/null)
else
  clasp push --force
fi
