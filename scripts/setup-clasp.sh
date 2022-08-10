#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"/..

if [ -f ".env" ]; then
  source ".env"
fi

echo "{\"scriptId\":\"$SCRIPT_ID\",\"rootDir\":\".build\"}" > .clasp.json
