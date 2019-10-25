import { SynapseConstants } from "synapse-react-client";
import { HomeExploreConfig } from "../../types/portal-config";
import loadingScreen from "../loadingScreen";

// The sql-parser used in SRC doesn't support aliasing with a space, so only pascal casing is allowed
export const filesSql =
  "SELECT grantType, centerName, consortium, species, fileFormat, experimentalStrategy, platform, tumorType, sex, tissue, name FROM syn9630847";
const sql =
  "SELECT grantType, centerName, consortium, species, fileFormat, experimentalStrategy, platform, tumorType, sex, tissue, name FROM syn9630847";

const facetAliases = {
  centerName: "Grant",
  consortium: "Program",
  fileFormat: "Data Format",
  experimentalStrategy: "Assay",
  tumorType: "Disease Type",
  sex: "Gender",
  name: "File Name"
};

const rgbIndex = 8;
const unitDescription = "files";
const synapseId = "syn9630847";
const facet = "grantType";

export const files: HomeExploreConfig = {
  homePageSynapseObject: {
    name: "QueryWrapperFlattened",
    props: {
      rgbIndex,
      facet,
      unitDescription,
      loadingScreen,
      facetAliases: {
        grantType: "Grant Type"
      },
      link: "Explore/Files",
      linkText: "Explore Files",
      initQueryRequest: {
        concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: false,
          limit: 25,
          offset: 0
        }
      }
    }
  },
  explorePageSynapseObject: {
    name: "QueryWrapperMenu",
    props: {
      rgbIndex,
      unitDescription,
      isConsistent: false,
      tableConfiguration: {
        synapseId,
        title: "Files"
      },
      stackedBarChartConfiguration: {
        loadingScreen
      },
      name: "Files",
      facetAliases,
      menuConfig: [
        {
          sql,
          facet: "grantType"
        },
        {
          sql,
          facet: "centerName"
        },
        {
          sql,
          facet: "consortium"
        },
        {
          sql,
          facet: "species"
        },
        {
          sql,
          facet: "Theme"
        },
        {
          sql,
          facet: "fileFormat"
        },
        {
          sql,
          facet: "experimentalStrategy"
        },
        {
          sql,
          facet: "platform"
        },
        {
          sql,
          facet: "tumorType"
        },
        {
          sql,
          facet: "sex"
        },
        {
          sql,
          facet: "tissue"
        }
      ]
    }
  }
};
