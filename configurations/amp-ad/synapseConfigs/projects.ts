import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'Projects'
const rgbIndex = 4
const sql = 'SELECT * FROM syn17024229'
const facetName = 'Program'

const projects: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      unitDescription,
      rgbIndex,
      facetName,
      loadingScreen,
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
      isConsistent: true,
      cardConfiguration: {
        type: SynapseConstants.AMP_PROJECT,
        secondaryLabelLimit: 4,
      },
      menuConfig: [
        {
          sql,
          facetName,
        },
      ],
    }
  }
}

export default projects
