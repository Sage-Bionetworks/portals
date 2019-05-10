import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
const sql = `SELECT * FROM syn10142562 WHERE ( "grantType" = 'U54' OR "grantType" = 'U01')`
const unitDescription = 'grants'
const synapseId = 'syn10142562'
const rgbIndex = 3

export const grants: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapper',
    props: {
      unitDescription,
      loadingScreen,
      rgbIndex: 3,
      facetName: 'grantType',
      name: 'Grants',
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
      type: SynapseConstants.CSBC_PROJECT,
      menuConfig: [
        {
          sql,
          unitDescription,
          synapseId,
          facetName: 'consortium',
          facetAliases: {
            consortium: 'Program',
          }
        },
        {
          sql,
          unitDescription,
          synapseId,
          facetName: 'grantType',
          facetAliases: {
            grantType: 'Grant Type',
          }
        }
      ],
    }
  }
}
