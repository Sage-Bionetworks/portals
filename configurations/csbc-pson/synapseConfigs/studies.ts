import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
const unitDescription = 'studies'
export const studiesSql = `SELECT * FROM syn18483791 WHERE ( ( "is.study" = 'TRUE' ) )`
const sql = studiesSql
const rgbIndex = 1

export const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facetName: 'grantType',
      facetAliases: {
        grantType: 'Grant Type',
      },
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
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
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      cardConfiguration: {
        type: SynapseConstants.CSBC_STUDY,
      },
      stackedBarChartConfiguration: {
        loadingScreen
      },
      name: 'Studies',
      menuConfig: [
        {
          sql,
          facetName: 'grantType',
          facetAliases: {
            grantType: 'Grant Type',
          }
        },
        {
          sql,
          facetName: 'centerName',
          facetAliases: {
            centerName: 'Grant',
          }
        },
        {
          sql,
          facetName: 'consortium',
          facetAliases: {
            consortium: 'Program',
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
            experimentalStrategy: 'Assay',
          }
        },
        {
          sql,
          facetName: 'tumorType',
          facetAliases: {
            tumorType: 'Disease Type',
          }
        },
      ],
    }
  }
}
