import { HomeExploreConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import { LabelLinkConfig } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { StandaloneQueryWrapperProps } from 'portal-components/StandaloneQueryWrapper'
import { dataSql } from '../resources'

const unitDescription = 'Data'
const rgbIndex = 0
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
    matchColumnName: 'study',
    isMarkdown: false,
    baseURL: 'Explore/Collections/DetailsPage',
    URLColumnName: 'study',
  },
]

const data: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      facet,
      link: 'Explore/Collections',
      linkText: 'Explore Collections',
      sql: dataSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      shouldDeepLink: true,
      hideDownload: true,
      sql: dataSql,
      name: 'Data',
      facetAliases,
      tableConfiguration: {
        showDownloadColumn: true,
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
          'collection',
          'reportedOutcome',
          'devicePlatform',
          'diagnosis',
          'digitalAssessmentCategory',
          'digitalAssessmentDetails',          
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
