# How to create a new portal

1.  `cp -r config-shell [portal-name]`
2.   Fill in the needed TODOs from the config-shell template

# Developing locally (mac instructions)
1. Run `./linkConfig [portal-name]` to run the portal locally

* Caveats of this command: If something fails on yarn start (e.g. node bindings are out of date) and then you re-rerun this command all the files for that portal directory will be deleted. If you have lots of changes being made with a config folder it would be good to frequently `git add` those changes so you can have a progress point.

# Testing SRC locally with portals
1. In the local directory of SRC
2. Run `yarn link` to symlink the module
3. Run `yarn build` to build the project
4. In the directory of portal repo
5. Change directory to `app_template` and run `yarn link synapse-react-client`
6. Change directory to `configurations` and run `./linkConfig [portal-name]` to start the development server
7. You can make changes to SRC while the local development server for portals is being run, run `yarn build` in the local SRC copy and the portal development server should refresh the page with those new changes -- sometimes you have to manually fresh the page to see the updates.
