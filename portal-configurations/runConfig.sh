#!/bin/bash
# Usage:
#   Run portal with the portal-app-template
#     ./run.sh [portal-folder-name]
#

if [[ -z $1 ]]; then
  echo "Usage:
  Run portal with the portal-app-template
    ./run.sh [portal-folder-name]
  "
  exit 1
fi

# copy the example configuration 
cp -R $1 ../portal-app-template/src/configuration
cd ../portal-app-template/
yarn && yarn start