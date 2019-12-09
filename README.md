# A single codebase for Synapse portals
### Example sites:
- [AMP-AD Knowledge Portal](https://adknowledgeportal.synapse.org)
- [NF Data Portal](https://nf.synapse.org)
- [CSBC / PS-ON Data Portal](https://csbc-pson.synapse.org)

app-template/ is the main react app template that reads a standard configuration file. See app_template/README.md for details.

configurations/ is a directory of configurations for each portal. See configurations/README.md on local developement.

The project is run from app-template/src using `yarn && yarn start`.

To run a portal locally, use the linkConfig script, which copies configuration files for the portal that you specify
(replace \<portal-name\> with one of the subfolder names, like `nf` or `adknowledgeportal`):
```
cd configurations
./linkConfig.sh <portal-name>
```
# Build/Deploy Process
./run.sh

Usage:
  Sync current with staging:
    ./run.sh push-staging [portal-name]

  Sync production with production:
    ./run.sh WARNING-push-production [portal-name]
