git submodule update --init --recursive
git submodule foreach 'git checkout main'
git submodule foreach 'git pull'
git submodule update --remote --merge
