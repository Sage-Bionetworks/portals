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

folderNoSlash=${1%/}
# clear out config
rm -rf $folderNoSlash
mkdir $folderNoSlash
# copy over the contents from the symlink
cp -r ../app-template/src/config/ $folderNoSlash/
