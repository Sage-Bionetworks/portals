#!/bin/bash
# Usage:
#   Run portal with the app-template
#     ./run.sh [portal-folder-name]
#
if [[ -z $1 ]]; then
  echo “Usage:
  Run portal with the app-template
    ./run.sh [portal-folder-name]
  ”
  exit 1
fi

# remove ending slash if directory given had a slash
folderNoSlash=${1%/}

CONFIG_FOLDER=src/config
ACTIVE_CONFIGURATION=src/configurations/$folderNoSlash

if [ ! -d "$ACTIVE_CONFIGURATION" ]; then
  echo Directory $ACTIVE_CONFIGURATION does not exist.
  echo Available options are - 
  ls ./src/configurations
  exit 1
fi

if [ ! -h "$ACTIVE_CONFIGURATION" ]; then
  echo 'removing previous symlink'
  ./undoLink.sh $ACTIVE_CONFIGURATION
fi

# we want to always make sure that the linking is undone after this script so we capture
# ctrl-c. This has removed various bugs when developing locally.
# See here - https://unix.stackexchange.com/a/407249
trap handleInt SIGINT
function handleInt {
  ./undoLink.sh $ACTIVE_CONFIGURATION
  printf ‘\n’
  exit 0
}
# React applications can’t resolve symlinks, so instead of symlinking the
# configuration to the react app, we copy over the configuration and symlink
# the contents back to the configuration
# clear out config
rm -rf ./$CONFIG_FOLDER/*
# copy over the contents
cp -r ./$ACTIVE_CONFIGURATION/ ./$CONFIG_FOLDER/
rm  -rf ./$ACTIVE_CONFIGURATION/*
# symlink the current directory
cd ./$ACTIVE_CONFIGURATION
ln -s ./config/* .
cd ../../../
# start the project
# Fixes node binding error when switching between packages and forgetting to run this command...
npm rebuild node-sass
yarn && yarn start