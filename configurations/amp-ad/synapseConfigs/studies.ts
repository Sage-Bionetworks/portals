
import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'studies'
const rgbIndex = 0
const sql = 'SELECT * FROM syn17083367'
const synapseId = 'syn17083367'
const facetName = 'Species'

const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperHelper',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      facetName,
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
      loadingScreen,
      unitDescription,
      type: SynapseConstants.AMP_STUDY,
      menuConfig: [
        {
          sql,
          facetName,
          unitDescription,
          synapseId,
        },
        {
          sql,
          unitDescription,
          synapseId,
          facetName: 'Grant'
        },
        {
          sql,
          synapseId,
          facetName: 'Consortium',
          unitDescription: 'programs',
          facetAliases: {
            Consortium: 'Program',
          },
        }
      ]
    }
  }
}

export default studies
