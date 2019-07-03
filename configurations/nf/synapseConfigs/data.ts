import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'

const sql = 'SELECT * FROM syn18488466'
const unitDescription = 'Datasets'

const rgbIndex = 0
const facetName = 'tumorType'

export const data: HomeExploreConfig = {
  homePageSynapseObject: [{
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      rgbIndex,
      facetName,
      loadingScreen,
      unitDescription,
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
    }
  }],
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      loadingScreen,
      rgbIndex,
      unitDescription,
      name: 'Data',
      cardConfiguration: {
        type: SynapseConstants.CSBC_DATASET
      },
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
    },
  }
}
