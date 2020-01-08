if [[ -z $1 ]]; then
  echo "Usage:
  Undo portal linking with the app-template
    ./run.sh [portal-folder-name]
  "
  exit 1
fi


# copy over the contents from the symlink
rm -rf src/config
cp -r src/config/ $ACTIVE_CONFIGURATION/
