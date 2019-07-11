import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
export const datasetsSql = `SELECT * FROM syn18488466 WHERE ( ( "featured" = 'TRUE' ) )`
const sql = 'SELECT * FROM syn18488466'
const unitDescription = 'Datasetsz'
const rgbIndex = 0

export const datasets: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      unitDescription,
      loadingScreen,
      rgbIndex: 0,
      facetName: 'tumorType',
      initQueryRequest : {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask: SynapseConstants.BUNDLE_MASK_QUERY_FACETS
          | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: false,
          limit: 25,
          offset: 0,
        }
      },
      facetAliases: {
        tumorType: 'Disease Type',
      },
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      cardConfiguration: {
        type: SynapseConstants.CSBC_DATASET,
      },
      stackedBarChartConfiguration: {
        loadingScreen
      },
      name: 'Datasets',
      menuConfig: [
        {
          sql,
          facetName: 'species',
          facetAliases: {
            species: 'Species',
          }
        },
        {
          sql,
          facetName: 'Theme'
        },
        {
          sql,
          facetName: 'experimentalStrategy',
          facetAliases: {
            experimentalStrategy: 'Assay'
          }
        },
        {
          sql,
          facetName: 'platform',
          facetAliases: {
            platform: 'Platform'
          }
        },
        {
          sql,
          facetName: 'tumorType',
          facetAliases: {
            tumorType: 'Disease Type'
          }
        }
      ],
    }
  }
}
