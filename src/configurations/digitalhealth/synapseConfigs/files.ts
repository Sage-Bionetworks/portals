import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'

const sql =
  'SELECT * FROM syn21994970 WHERE dhPortalIndex = \'TRUE\''
export const filesEntityId = 'syn21994970'
const entityId = filesEntityId
export const filesSql = sql

const rgbIndex = 8
const unitDescription = 'files'
const facet = 'study'

export const files: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      facet,
      unitDescription,
      loadingScreen,
      link: 'Explore/Files',
      linkText: 'Explore Files',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
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
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      shouldDeepLink: true,
      sql,
      entityId,
      name: 'Files',
      loadingScreen,
      tableConfiguration: {
        visibleColumnCount: Infinity,
      },
    },
  },
}
