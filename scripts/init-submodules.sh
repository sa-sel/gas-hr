#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"/..

if $(git rev-parse --is-inside-work-tree &> /dev/null); then
  git submodule update --init --recursive
  git submodule foreach 'git checkout main'
  git submodule foreach 'git pull'
  git submodule update --remote --merge
fi
