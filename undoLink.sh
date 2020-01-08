if [[ -z $1 ]]; then
  echo "Usage:
  Undo portal linking with the app-template
    ./run.sh [portal-folder-name]
  "
  exit 1
fi


# React applications can't resolve symlinks, so instead of symlinking the 
# configuration to the react app, we copy over the configuration and symlink
# the contents back to the configuration

ACTIVE_CONFIGURATION=${1%/}
mkdir $ACTIVE_CONFIGURATION
# copy over the contents from the symlink
cp -r src/config/ $ACTIVE_CONFIGURATION/
