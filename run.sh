# pseudocode
#
# cd portal-app-template
# yarn # install dependencies
# cd ../
# for each directory that is not portal-app-template
#   if that directory has been updated in this PR
#      cp -r directory portal-app-template/example-configuration
#      cd portal-app-template
#      yarn build
#      if STAGING_JOB
#        echo "pushing local to staging"
#        aws s3 sync --delete --cache-control max-age=0 ./build $S3_STAGING_BUCKET_LOCATION
#      else
#         echo "pushing local to production"
#         aws s3 sync --delete --cache-control max-age=3000 $S3_PRODUCTION_BUCK_LOCATION