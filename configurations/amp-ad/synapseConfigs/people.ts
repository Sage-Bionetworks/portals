import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'people'
const rgbIndex = 2
const sql = 'SELECT * FROM syn13897207'

const people: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      facetName: 'Program',
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
        type: SynapseConstants.MEDIUM_USER_CARD,
      },
      menuConfig: [
        {
          sql,
          facetName: 'Program'
        },
        {
          sql,
          facetName: 'Grant Number'
        },
        {
          sql,
          facetName: 'institution',
          facetDisplayValue: 'Institution',
        },
      ]
    }
  }
}

export default people
