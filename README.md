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

To run a portal with a local version of SRC run the following commands:

```sh
# In Synapse-React-Client/
# Symlink the package itself as well as the local react, react-router, and react-router-dom packages
$ yarn link
$ cd node_modules/react
$ yarn link
$ cd ../react-router
$ yarn link
$ cd ../react-router-dom
$ yarn link
$ cd ../../
$ yarn build # last step is to build the project

# In portals/
$ yarn link synapse-react-client
$ yarn link react
$ yarn link react-router
$ yarn link react-router-dom
$ ./linkConfig <portal-name>
# Note that you can make changes in the SRC project and reflect
# them in the portals by running yarn build again. The portals project
# can continue to run as you make changes.
```

# Build/Deploy Process

The code that is run on jenkins is in `run.sh`

Usage:
Sync current with staging:
`$ ./run.sh push-staging [portal-name]`

Sync production with production:
`$ ./run.sh WARNING-push-production [portal-name]`
