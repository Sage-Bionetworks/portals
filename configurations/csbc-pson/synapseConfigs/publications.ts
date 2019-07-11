import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
export const publicationSql = 'SELECT * FROM syn10923842'
const sql = publicationSql
const unitDescription = 'Publications'
const rgbIndex = 1

export const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facetName: 'Consortium',
      facetAliases: {
        Consortium: 'Program',
      },
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
      }
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      cardConfiguration: {
        type: SynapseConstants.CSBC_PUBLICATION,
      },
      stackedBarChartConfiguration: {
        loadingScreen
      },
      name: 'Publications',
      menuConfig: [
        {
          sql,
          facetName: 'Publication Year',
        },
        {
          sql,
          facetName: 'Consortium',
          facetAliases: {
            Consortium: 'Program',
          },
        },
        {
          sql,
          facetName: 'grantType',
          facetAliases: {
            grantType: 'Grant Type',
          },
        },
        {
          sql,
          facetName: 'diseaseType',
          facetAliases: {
            diseaseType: 'Disease',
          },
        },
        {
          sql,
          facetName: 'Theme',
        },
        {
          sql,
          facetName: 'experimentalStrategy',
          facetAliases: {
            experimentalStrategy: 'Assay',
          },
        },
      ],
    }
  }
}
