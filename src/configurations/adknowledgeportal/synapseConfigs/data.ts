import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'data files'
const rgbIndex = 1
const sql = 'SELECT * FROM syn11346063'
const entityId = 'syn11346063'

const data: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      facet: 'study',
      link: 'Explore/Data',
      linkText: 'Explore Data',
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
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      name: 'Data',
      visibleColumnCount: 10,
      tableConfiguration: {
        showAccessColumn: true,
        columnLinks: [
          {
            matchColumnName: 'study',
            isMarkdown: false,
            baseURL: 'Explore/Studies/DetailsPage',
            URLColumnName: 'Study_Name',
          },
        ],
      },
      loadingScreen,
      sql,
      shouldDeepLink: true,
    },
  },
}

export default data
