import { HomeExploreConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import loadingScreen from '../loadingScreen'
import { LabelLinkConfig } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { StandaloneQueryWrapperProps } from 'portal-components/StandaloneQueryWrapper'

const unitDescription = 'Data'
const rgbIndex = 0
export const dataSql = `SELECT id, studyOrProject, numberParticipants,reportedOutcome,dataCollectionMethod,deviceType,devicePlatform,deviceLocation,sensorType,diagnosis,digitalAssessmentCategory,digitalAssessmentDetails,dataType,dataSubtype,dataDescriptionLocation, dataAccessInstructions FROM syn21994970 where dhPortalIndex = 'TRUE'`
const sql = dataSql
const facet = 'Program'
export const dataColumnLinks: LabelLinkConfig = [
  {
    matchColumnName: 'dataDescriptionLocation',
    isMarkdown: true,
  },
  {
    matchColumnName: 'dataAccessInstructions',
    isMarkdown: true,
  },
  {
    matchColumnName: 'studyOrProject',
    isMarkdown: true,
  },
]

const data: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      facet,
      loadingScreen,
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
      sql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      shouldDeepLink: true,
      hideDownload: true,
      loadingScreen,
      sql,
      name: 'Data',
      facetAliases,
      tableConfiguration: {
        columnLinks: dataColumnLinks,
      },
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
      searchConfiguration: {
        searchable: [
          {
            columnName: 'studyOrProject',
          },
          {
            columnName: 'reportedOutcome',
          },
          {
            columnName: 'devicePlatform',
          },
          {
            columnName: 'diagnosis',
          },
          {
            columnName: 'digitalAssessmentCategory',
          },
          {
            columnName: 'digitalAssessmentDetails',
          },
        ],
      },
    },
  },
}

export const dataDetailPageProps: StandaloneQueryWrapperProps = {
  sql: dataSql,
  rgbIndex,
  title: 'Data Files',
  columnLinks: dataColumnLinks,
  hideDownload: true,
  sqlOperator: '=',
}

export default data
