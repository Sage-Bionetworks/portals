# A single codebase for Synapse portals

### Example sites:

- [AMP-AD Knowledge Portal](https://adknowledgeportal.synapse.org)
- [NF Data Portal](https://nf.synapse.org)
- [CSBC / PS-ON Data Portal](https://csbc-pson.synapse.org)

### Building a portal

- src/configurations is the folder of all existing portals
- src/configuration/config-shell is a portal template that can be copied and filled out where the TODOs are written.

### Running a portal locally

To run a portal locally, use the linkConfig script, which copies configuration files for the portal that you specify
(replace \<portal-name\> with one of the subfolder names, like `nf` or `adknowledgeportal`):

```
./linkConfig.sh <portal-name>
```

# Build/Deploy Process

The code thats run on jenkins is in `run.sh`

Usage:
Sync current with staging:
`$ ./run.sh push-staging [portal-name]`

Sync production with production:
`$ ./run.sh WARNING-push-production [portal-name]`
