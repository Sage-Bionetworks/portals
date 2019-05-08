#!/bin/bash
# USAGE
#   Sync current with staging:
#     ./run.sh --push-staging --[portal-name]
#
#   Sync production with production:
#     ./run.sh --WARNING-push-production --[portal-name]

cd portal-app-template
yarn # install dependencies
cd ../
cp -r portal-configuration/$2 portal-app-template/example-configuration
yarn build portal-app-template/
if [ "$1" = "--WARNING-push-production" ]; then
  echo "pushing local to production"
  chmod +x ./example-configuration/scripts/exportS3ProductionBucketName
  ./example-configuration/scripts/exportS3ProductionBucketName
  # check name
  if [ -z "$S3_PRODUCTION_BUCK_LOCATION" ]; then
    echo 'Error: exportS3ProductionBucketName must export bash variable: S3_PRODUCTION_BUCK_LOCATION'
    exit 1
  fi
  aws s3 sync --delete --cache-control max-age=3000 $S3_PRODUCTION_BUCK_LOCATION
elif [ "$1" = "--push-staging" ]; then
  echo "pushing local to staging"
  chmod +x ./example-configuration/scripts/exportS3StagingBucketName
  ./example-configuration/scripts/exportS3StagingBucketName
  if [ -z "$S3_STAGING_BUCKET_LOCATION" ]; then
    echo 'Error: exportS3StagingBucketName must export bash variable: S3_STAGING_BUCKET_LOCATION'
    exit 1
  fi
  aws s3 sync --delete --cache-control max-age=0 ./build $S3_STAGING_BUCKET_LOCATION
fi
done