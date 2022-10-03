#!/bin/bash

# This function'll go through each git submodule in the current directory's
# `.build` directory and inject its path aliases in the code.
#
# first arg: where the code to be updated is
# second arg: prefix to be used on the paths
function update_paths() {
  if $(git rev-parse --is-inside-work-tree &> /dev/null) && [ -e ".gitmodules" ]; then
    local CODE_ROOT="$1"
    local PATH_PREFIX="$2"

    local SUBMODULES=$(grep -E -o 'path = (.+)' ".gitmodules" | awk '{print $3}' | sed "s/src/$CODE_ROOT/")
    local ROOT=$(pwd)

    for DIR in $SUBMODULES; do
      cd "$DIR"

      if [ -e tsconfig.json ]; then
        local ESCAPE_SLASH_REGEX='s/\//\\\//g'

        local BASE_URL=$(echo "$PATH_PREFIX/${DIR//.build\//}/" | sed "$ESCAPE_SLASH_REGEX")
        local MIDDLE_URL="$(
        grep -Po '"baseUrl": "(.+?)",' tsconfig.json\
          | sed -E 's/.+"(.+)",/\1/'\
          | sed -E 's/^\.\///'\
          | sed -E "$ESCAPE_SLASH_REGEX"
                  )"

                  local PATHS=$(
                  grep -Pzo '(?s)( *)"paths": {\n.+?\1},?\n' tsconfig.json\
                    | tail -n +2\
                    | head -n -2\
                    | sed 's/^\s*//'\
                    | sed -E 's/[,":]//g'\
                    | sed -E 's/\[(.+)]/\1/'\
                    | sed -E 's/\*/(.+)/'\
                    | sed -E 's/\*/\\1/'\
                    | sed -E "$ESCAPE_SLASH_REGEX"
                  )

                  set -- $PATHS
                  while [ ! -z "$1" ]; do
                    find ./src -name '*.ts' -exec sed -i -r -E "s/['\"]$1['\"]/'$BASE_URL$MIDDLE_URL$2'/g" {} \;
                    shift 2
                  done
      fi

      cd "$ROOT"
    done
  fi
}
