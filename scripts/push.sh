#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"/..

# setup .clasp.json
source "scripts/setup-clasp.sh"

# build and copy config to build dir
yarn build
cp "appsscript.json" ".claspignore" ".clasp.json" ".build"

# remove export statements from transpiled files
for file in .build/**/*.js; do
  sed -r -i "/^export\s.+/d" "$file" &> /dev/null
done
for file in .build/*.js; do
  sed -r -i "/^export\s.+/d" "$file" &> /dev/null
done

# actually push to GAS (hide output in github because of sensitive data)
if [ "$ENV" == "GITHUB" ]; then
 clasp push --force &> /dev/null
else
  clasp push --force
fi
