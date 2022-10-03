#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"/..

# setup .build
rm -rf .build
mkdir -p .build
cp -r src/* .build
cp tsconfig.json .build

RAND="$RANDOM"

# setup .build's tsconfig.json
sed -i -r -E "/^(\s*)\"paths\": \{/a\"srcRoot$RAND/*\": [\"*\"]," .build/tsconfig.json
sed -i -r -E 's/("baseUrl": ").+?"/\1.\/.build\/"/' .build/tsconfig.json

# setup path aliases inside .build
source scripts/handle-path-aliases.sh
update_paths ".build" "srcRoot$RAND"

# transpile/merge files
yarn rollup

# remove export statements from transpiled files
for file in .build/**/*.js; do
  sed -r -i "/^export\s.+/d" "$file" &> /dev/null
done
for file in .build/*.js; do
  sed -r -i "/^export\s.+/d" "$file" &> /dev/null
done
