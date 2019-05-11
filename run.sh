#!/bin/bash
# Usage:
#   Sync current with staging:
#     ./run.sh push-staging [portal-name]
#
#   Sync production with production:
#     ./run.sh WARNING-push-production [portal-name]

if [[ -z $1 || -z $2 ]]; then
  echo "Error: Usage -
  Sync current with staging:
    ./run.sh push-staging [portal-name]

  Sync production with production:
    ./run.sh WARNING-push-production [portal-name]
  "
  exit 1
fi
PORTAL_APP_TEMPLATE=app-template
PORTAL_CONFIGURATIONS=configurations
# copy over the directory
cp -r $PORTAL_CONFIGURATIONS/$2 $PORTAL_APP_TEMPLATE/src/configuration
cd $PORTAL_APP_TEMPLATE/src
yarn && yarn build
if [ "$1" = "WARNING-push-production" ]; then
  chmod +x ./src/configuration/scripts/exportS3StagingBucketName
  ./src/configuration/scripts/exportS3StagingBucketName
  if [ -z "$S3_STAGING_BUCKET_LOCATION" ]; then
    echo 'Error: exportS3StagingBucketName.sh must export bash variable S3_STAGING_BUCKET_LOCATION'
    exit 1
  fi
  chmod +x ./src/configuration/scripts/exportS3ProductionBucketName
  ./src/configuration/scripts/exportS3ProductionBucketName
  # check they defined the s3 bucket variable
  if [ -z "$S3_PRODUCTION_BUCK_LOCATION" ]; then
    echo 'Error: exportS3ProductionBucketName.sh must export bash variable S3_PRODUCTION_BUCK_LOCATION'
    exit 1
  fi
  # sync staging with prod
  aws s3 sync --delete --cache-control max-age=3000 $S3_STAGING_BUCKET_LOCATION $S3_PRODUCTION_BUCK_LOCATION

elif [ "$1" = "push-staging" ]; then
  chmod +x ./src/configuration/scripts/exportS3StagingBucketName
  ./src/configuration/scripts/exportS3StagingBucketName
  # check they defined the s3 bucket variable
  if [ -z "$S3_STAGING_BUCKET_LOCATION" ]; then
    echo 'Error: exportS3StagingBucketName.sh must export bash variable S3_STAGING_BUCKET_LOCATION'
    exit 1
  fi
  aws s3 sync --delete --cache-control max-age=0 ./build $S3_STAGING_BUCKET_LOCATION
fi
done