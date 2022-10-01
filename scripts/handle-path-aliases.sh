#!/bin/bash

# This script'll go through each submodule in the current repository's
# .build and substitute their path aliases in the code.

cd "$(dirname "${BASH_SOURCE[0]}")"/..

if $(git rev-parse --is-inside-work-tree &> /dev/null); then
  SUBMODULES=$(grep -E -o 'path = (.+)' .gitmodules | awk '{print $3}' | sed 's/src/.build/')
  ROOT=$(pwd)

  for DIR in $SUBMODULES; do
    cd "$DIR"

    if [ -e tsconfig.json ]; then
      BASEURL="$(grep -Po '"baseUrl": "(.+?)",' tsconfig.json | sed -E 's/.+"(.+)",/\1/' | sed -E 's/^\.\///' | sed -E 's/\//\\\//g')"
      PATHS=$(
        grep -Pzo '(?s)( *)"paths": {\n.+?\1},?\n' tsconfig.json\
        | tail -n +2\
        | head -n -2\
        | sed 's/^\s*//'\
        | sed -E 's/[,":]//g'\
        | sed -E 's/\[(.+)]/\1/'\
        | sed -E 's/\*/(.+)/'\
        | sed -E 's/\*/\\1/'\
        | sed -E 's/\//\\\//g'
      )

      set -- $PATHS
      while [ ! -z "$1" ]; do
        find ./src -name '*.ts' -exec sed -i -r -E "s/['\"]$1['\"]/'$BASEURL$2'/g" {} \;
        shift 2
      done
    fi

    cd "$ROOT"
  done
fi
