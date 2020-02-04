
import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'people'
const title = 'PEOPLE'
const rgbIndex = 2
const sql = 'SELECT ownerID as ownerId, firstName, lastName, institution FROM syn13897207'
const entityId = 'syn13897207'

export const people: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      link: 'Explore/People',
      linkText: 'Explore People',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: true,
          limit: 25,
          offset: 0,
        },
      },
    },
  },
  explorePageSynapseObject: {
    name: 'CardContainerLogic',
    props: {
      type: SynapseConstants.MEDIUM_USER_CARD,
      title,
      sql,
      entityId
    },
  }
}

