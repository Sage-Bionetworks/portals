# A single codebase for portal development.

portal-app-template/ is the main react app template that reads a standard configuration file.

portal-configurations/ is a directory of configurations for portal development.

# Build Process
./run.sh

Usage:
  Sync current with staging:
    ./run.sh push-staging [portal-name]

  Sync production with production:
    ./run.sh WARNING-push-production [portal-name]