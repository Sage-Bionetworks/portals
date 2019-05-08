#!/bin/bash
# USAGE
#   Sync current with staging:
#     ./run.sh --push-staging --all
#     ./run.sh --push-staging --[portal-name]
#
#   Sync production with production:
#     ./run.sh --WARNING-push-production --all
#     ./run.sh --WARNING-push-production --[portal-name]

cd portal-app-template
yarn # install dependencies
cd ../
# ls -d */ looks at only the directories below
for dir in `ls -d portal-configurations/*/`
do
  # check if dir has changed since last build 
  git diff HEAD....
  if [[ $2 && $2 = "--all" || $?]]; then
    # if that directory has been updated in this commit
    cp -r $dir portal-app-template/example-configuration
    cd portal-app-template
    yarn build
    if [ "$1" = "--WARNING-push-production" ]; then
      echo "pushing local to production"
      chmod +x ./example-configuration/scripts/exportS3ProductionBucketName
      ./example-configuration/scripts/exportS3ProductionBucketName
      aws s3 sync --delete --cache-control max-age=3000 $S3_PRODUCTION_BUCK_LOCATION
    elif [ "$1" = "--push-staging" ]; then
      echo "pushing local to staging"
      chmod +x ./example-configuration/scripts/exportS3StagingBucketName
      ./example-configuration/scripts/exportS3StagingBucketName
      aws s3 sync --delete --cache-control max-age=0 ./build $S3_STAGING_BUCKET_LOCATION
    cd ../
    fi
  else
    echo $dir "didn't pass"
  fi
done