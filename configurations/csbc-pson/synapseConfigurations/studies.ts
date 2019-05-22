import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
const unitDescription = 'studies'
export const studiesSql = `SELECT * FROM syn18483791 WHERE ( ( "is.study" = 'TRUE' ) )`
const sql = studiesSql
const synapseId = 'syn18483791'
const rgbIndex = 1

export const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      name: 'Studies',
      facetName: 'grantType',
      facetAliases: {
        grantType: 'Grant Type',
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
      },
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      loadingScreen,
      type: SynapseConstants.CSBC_STUDY,
      menuConfig: [
        {
          unitDescription,
          sql,
          synapseId,
          facetName: 'grantType',
          facetAliases: {
            grantType: 'Grant Type',
          }
        },
        {
          unitDescription,
          sql,
          synapseId,
          facetName: 'centerName',
          facetAliases: {
            centerName: 'Grant',
          }
        },
        {
          unitDescription,
          sql,
          synapseId,
          facetName: 'consortium',
          facetAliases: {
            consortium: 'Program',
          }
        },
        {
          unitDescription,
          sql,
          synapseId,
          facetName: 'Theme'
        },
        {
          unitDescription,
          sql,
          synapseId,
          facetName: 'experimentalStrategy',
          facetAliases: {
            experimentalStrategy: 'Assay',
          }
        },
        {
          unitDescription,
          sql,
          synapseId,
          facetName: 'tumorType',
          facetAliases: {
            tumorType: 'Disease Type',
          }
        },
      ],
    }
  }
}
