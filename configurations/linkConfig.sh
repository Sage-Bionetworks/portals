#!/bin/bash
# Usage:
#   Run portal with the app-template
#     ./run.sh [portal-folder-name]
#

if [[ -z $1 ]]; then
  echo "Usage:
  Run portal with the app-template
    ./run.sh [portal-folder-name]
  "
  exit 1
fi

# we want to always make sure that the linking is undone after this script so we capture
# ctrl-c. This has removed various bugs when developing locally.
# See here - https://unix.stackexchange.com/a/407249
trap handleInt SIGINT
function handleInt {
  cd ../../configurations
  ./undoLink.sh nf
  exit 0
}

# remove ending slash if directory given had a slash
folderNoSlash=${1%/}
# React applications can't resolve symlinks, so instead of symlinking the 
# configuration to the react app, we copy over the configuration and symlink
# the contents back to the configuration

# clear out config
rm -rf ../app-template/src/config
mkdir ../app-template/src/config
# copy over the contents
cp -r $folderNoSlash/ ../app-template/src/config/
rm  -rf $folderNoSlash/*
cd $folderNoSlash
# symlink the current directory
ln -s ../../app-template/src/config/* .
# start the project

cd ../../app-template/src
yarn && yarn start