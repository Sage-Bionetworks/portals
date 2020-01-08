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
PORTAL_APP_TEMPLATE=src/config
PORTAL_CONFIGURATION=src/configurations/$2/
# copy over the directory
cp -r $PORTAL_CONFIGURATION $PORTAL_APP_TEMPLATE

chmod +x ./$PORTAL_APP_TEMPLATE/scripts/exportS3StagingBucketName.sh
# source lets the child process run in the current shell instead of creating its own
source ./$PORTAL_APP_TEMPLATE/scripts/exportS3StagingBucketName.sh
# check they defined the s3 bucket variable
if [ -z "$S3_STAGING_BUCKET_LOCATION" ]; then
  echo 'Error: exportS3StagingBucketName.sh must export bash variable S3_STAGING_BUCKET_LOCATION'
  exit 1
fi
chmod +x ./$PORTAL_APP_TEMPLATE/scripts/exportS3ProductionBucketName.sh
source  ./$PORTAL_APP_TEMPLATE/scripts/exportS3ProductionBucketName.sh
if [ -z "$S3_PRODUCTION_BUCK_LOCATION" ]; then
  echo 'Error: exportS3ProductionBucketName.sh must export bash variable S3_PRODUCTION_BUCK_LOCATION'
  exit 1
fi

if [ "$1" = "WARNING-push-production" ]; then
  # sync staging with prod
  aws s3 sync --delete --cache-control max-age=3000 $S3_STAGING_BUCKET_LOCATION $S3_PRODUCTION_BUCK_LOCATION
elif [ "$1" = "push-staging" ]; then
  # sync current with staging
  yarn && yarn build
  node sitemap/generate-sitemap.js $2
  aws s3 sync --delete --cache-control max-age=0 ./build $S3_STAGING_BUCKET_LOCATION
fi
echo 'Success - finished!'
exit 0