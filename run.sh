# pseudocode
#
# cd portal-app-template
# yarn # install dependencies
# cd ../
# for each directory that is not portal-configurations
#   if that directory has been updated in this commit
#      cp -r directory portal-app-template/example-configuration
#      cd portal-app-template
#      yarn build
#      if PRODUCTION
#         echo "pushing local to production"
#         chmod +x ./portal-app-template/example-configuration/scripts/exportS3ProductionBucketName
#         ./portal-app-template/example-configuration/scripts/exportS3ProductionBucketName
#         aws s3 sync --delete --cache-control max-age=3000 $S3_PRODUCTION_BUCK_LOCATION
#      else
#        echo "pushing local to staging"
#        chmod +x ./portal-app-template/example-configuration/scripts/exportS3StagingBucketName
#        ./portal-app-template/example-configuration/scripts/exportS3StagingBucketName
#        ./runEnvSetup
#        aws s3 sync --delete --cache-control max-age=0 ./build $S3_STAGING_BUCKET_LOCATION