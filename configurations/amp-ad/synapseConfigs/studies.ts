
import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'studies'
const rgbIndex = 0
const sql = 'SELECT * FROM syn17083367'
const facetName = 'Species'

const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperWithStackedBarChart',
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
          isConsistent: true,
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
      isConsistent: true,
      cardConfiguration: {
        type: SynapseConstants.AMP_STUDY,
        secondaryLabelLimit: 4,
      },
      menuConfig: [
        {
          sql,
          facetName,
        },
        {
          sql,
          facetName: 'Grant'
        },
        {
          sql,
          facetName: 'Consortium',
          facetAliases: {
            Consortium: 'Program',
          },
        }
      ]
    }
  }
}

export default studies
