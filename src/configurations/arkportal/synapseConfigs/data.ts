import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import { LabelLinkConfig } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { StandaloneQueryWrapperProps } from 'synapse-react-client/dist/containers/table/StandaloneQueryWrapper'
import { dataSql } from '../resources'

const rgbIndex = 0
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
    matchColumnName: 'project',
    isMarkdown: false,
    baseURL: 'Explore/Projects/DetailsPage',
    URLColumnName: 'Project',
  },
]

const data: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    shouldDeepLink: true,
    hideDownload: true,
    sql: dataSql,
    name: 'Data',
    facetAliases,
    tableConfiguration: {
      showDownloadColumn: false,
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
