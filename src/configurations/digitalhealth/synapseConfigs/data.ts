import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'Data'
const rgbIndex = 0
export const dataSql = `SELECT id, projectId,numberParticipants,reportedOutcome,dataCollectionMethod,deviceType,devicePlatform,deviceLocation,sensorType,diagnosis,digitalAssessmentCategory,digitalAssessmentDetails,dataType,dataSubtype,dataDescriptionLocation, dataAccessInstructions FROM syn21994970 where dhPortalIndex = 'TRUE'`
export const dataEntityId = 'syn21994970'
const entityId = dataEntityId
const sql = dataSql
const facet = 'Program'

const data: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      facet,
      loadingScreen,
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
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
      entityId,
      shouldDeepLink: true,
      sql,
      name: 'Data',
      tableConfiguration: {},
      facetsToPlot: [
        'study',
        'reportedOutcome',
        'dataCollectionMethod',
        'deviceType',
        'devicePlatform',
        'deviceLocation',
        'diagnosis',
        'digitalAssessmentCategory',
        'dataType',
        'dataSubtype',
      ],
    },
  },
}

export default data
