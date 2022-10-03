#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"/..

# setup .clasp.json
source "scripts/setup-clasp.sh"

# build and copy config to build dir
yarn build
cp "appsscript.json" ".claspignore" ".clasp.json" ".build"

# push
if [ "$ENV" == "GITHUB" ]; then
  clasp push --force &> /dev/null
else
  clasp push --force
fi
