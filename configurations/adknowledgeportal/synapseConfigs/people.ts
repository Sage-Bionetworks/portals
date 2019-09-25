import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'people'
const rgbIndex = 2
const sql = 'SELECT * FROM syn13897207'

const people: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      link: 'Explore/People',
      linkText: 'Explore People',
      facet: 'Program',
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
      unitDescription,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      name: 'People',
      isConsistent: true,
      cardConfiguration: {
        type: SynapseConstants.MEDIUM_USER_CARD,
      },
      facetAliases: {
        institution: 'Institution'
      },
      menuConfig: [
        {
          sql,
          facet: 'Program'
        },
        {
          sql,
          facet: 'Grant Number'
        },
        {
          sql,
          facet: 'institution',
        },
      ]
    }
  }
}

export default people
