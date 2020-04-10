import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'people'
const rgbIndex = 2
const sql = 'SELECT * FROM syn13897207'
const entityId = 'syn13897207'

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
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          limit: 25,
          offset: 0,
        },
      },
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      entityId,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      name: 'People',

      shouldDeepLink: true,
      cardConfiguration: {
        type: SynapseConstants.MEDIUM_USER_CARD,
      },
      menuConfig: [
        {
          sql,
          facet: 'Program',
        },
        {
          sql,
          facet: 'Grant Number',
        },
        {
          sql,
          facet: 'institution',
        },
      ],
    },
  },
}

export default people
