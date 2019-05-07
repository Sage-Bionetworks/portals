A single codebase for portal development.

Structure of the codebase
<pre>
├── App.scss                # Main styling for the application, uses variables from examle-configuration/_overrides.scss
├── App.test.tsx            # Tests for the application, most functionality exists in SRC, so tests are lightweight
├── App.tsx                 # Main entry point with route configuration
├── Explore.tsx             # Functionality for Explore page
├── ExploreButtons.tsx      # Explore buttons that are used both on the home page and the explore page
├── Footer.tsx              # Footer with contact us/terms of service
├── Header.tsx              # Home page header with summary and title
├── Home.tsx                # Home page
├── Navbar.tsx              # Navbar that reads over the routes in example-configuration
├── RouteResolver.tsx       # For any subpage not in Home/Explore this hooks up the configuration to that URL
├── ScrollToTop.tsx         # Utility so that on route change the page starts at the top
├── example-configuration   # Directory that contains all the configuration for the app
├── index.tsx               # Boilerplate code that hooks the application up with index.html
└── types                   # types used throughout the project
</pre>

# Configuartion Example
For full code see [example-configuration](https://github.com/portals/portal-app-template/src/example-configuration)

Structure of example-configuration
<pre>
example-configuration/
├── docTitleConfig.ts # Configure the document title
├── exploreHomeConfiguration # Configure the data for explore and home page
│   ├── data.ts
│   ├── index.ts
│   └── publications.ts
├── footerConfig.ts # Configure the footer data -- terms of use, contact us
├── headerConfig.ts # Configure the text on the header of the home page
├── logoHeaderConfig.ts # Configure the name of the app with either text or svg export
├── routesConfig.ts # main routes for the app -- what is available and what it maps too
├── scripts # build scripts
│   ├── WARNING-sync-with-s3-prod.sh
│   └── sync-with-s3-staging.sh 
└── style
    ├── _overides.scss # contains main theme colors
    ├── footer.svg  # OPTIONAL: File that will be used for background-img  
    └── header.svg  # OPTIONAL: File that will be used for background-img 
</pre>

# Build Process