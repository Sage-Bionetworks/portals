This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Structure of the codebase
<pre>
├── App.scss                # Main styling for the application, uses variables from example-configuration/_overrides.scss
├── App.tsx                 # Main entry point with route configuration
├── AppInitializer.tsx      # e.g. getting token for the app, setting document title
├── Explore.tsx             # Functionality for Explore page
├── ExploreButtons.tsx      # Explore buttons that are used both on the home page and the explore page
├── Footer.tsx              # Footer with contact us/terms of service
├── Header.tsx              # Home page header with summary and title
├── Home.tsx                # Home page
├── Navbar.tsx              # Navbar that reads over the routes in example-configuration
├── config                  # The main configuration read for the app
├── custom-components       # portal specific components that are not related to layout
├── example-configuration   # Directory that contains all the configuration for the app
├── RouteResolver.tsx       # For any subpage not in Home/Explore this hooks up the configuration to that URL
├── ScrollToTop.tsx         # Utility so that on route change the page starts at the top
├── index.tsx               # Boilerplate code that hooks the application up with index.html
├── tests                   # all the tests for the application
└── types                   # types used throughout the project
</pre>

# Configuartion Example
For full code see [example-configuration](https://github.com/portals/app-template/src/example-configuration)

Structure of example-configuration
<pre>
example-configuration/
├── docTitleConfig.ts             # Configure the document title
├── exploreHomeConfiguration      # Configure the data for explore and home page
│   ├── data.ts
│   ├── index.ts
│   └── publications.ts
├── footerConfig.ts               # Configure the footer data -- terms of use, contact us
├── headerConfig.ts               # Configure the text on the header of the home page
├── logoHeaderConfig.ts           # Configure the name of the app with either text or svg export
├── routesConfig.ts               # Configure main routes for the app -- what is available and what synapse object is maps too
├── scripts                       # build scripts that export s3 bucket names
│   ├── exportS3ProductionBucketName.sh
│   └── exportS3StagingBucketName.sh
└── style
    ├── _overides.scss            # contains main theme colors
    ├── footer.svg                # OPTIONAL: File that will be used for background-img on home page header 
    └── header.svg                # OPTIONAL: File that will be used for background-img on home page header
</pre>

# Build Process
The application will build assuming that its configuration lies in example-configuration/

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Note - tests are specific to example-configuration

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
