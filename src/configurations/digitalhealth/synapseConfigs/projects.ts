import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig, SynapseConfigArray } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
import { DetailsPageProps } from 'types/portal-util-types'
import { dataDetailPageProps } from './data'
import { publicationDetailPageProps } from './publications'
import { projectsSql } from '../resources'
const unitDescription = 'Projects'
const rgbIndex = 2

export const projectSchema: GenericCardSchema = {
  type: SynapseConstants.PROJECT,
  title: 'study',
  description: 'studyDescription',
  secondaryLabels: [
    'diagnosis',
    'intervention',
    'reportedOutcome',
    'deviceType',
    'sensorType',
    'dataCollectionMethod',
    'digitalAssessmentCategory',
    'digitalAssessmentDetails',
    'dataUsed',
    'investigator',
    'keywords',
  ],
}

export const projectsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: projectSchema,
  titleLinkConfig: {
    isMarkdown: false,
    matchColumnName: 'study',
    URLColumnName: 'study',
    baseURL: 'Explore/Projects/DetailsPage',
  },
  labelLinkConfig: [
    {
      isMarkdown: true,
      matchColumnName: 'dataUsed',
    },
    // {
    //   isMarkdown: true,
    //   matchColumnName: 'externalDataUsed',
    // },
  ],
  loadingScreen,
}

export const projects: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facet: 'theme',
      link: 'Explore/Projects',
      linkText: 'Explore Projects',
      sql: projectsSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      cardConfiguration: projectsCardConfiguration,
      sql: projectsSql,
      shouldDeepLink: true,
      hideDownload: true,
      name: 'Projects',
      loadingScreen,
      facetAliases: {
        ...facetAliases,
        studyDescriptionLocation: 'Project Description',
        projectId: 'Study',
      },
      facetsToPlot: [
        'resourceType',
        'diagnosis',
        'intervention',
        'reportedOutcome',
        'deviceType',
        'sensorType',
        'digitalAssessmentCategory',
      ],
      searchConfiguration: {
        searchable: [
          {
            columnName: 'diagnosis',
          },
          {
            columnName: 'digitalAssessmentCategory',
          },
          {
            columnName: 'digitalAssessmentDetails',
          },
          {
            columnName: 'intervention',
          },
          {
            columnName: 'investigator',
          },
          {
            columnName: 'keywords',
          },
          {
            columnName: 'reportedOutcome',
          },
          {
            columnName: 'study',
          },
        ],
      },
    },
  },
}

export const details: DetailsPageProps = {
  sql: projectsSql,
  synapseConfigArray: [
    {
      name: 'Markdown',
      props: {},
      injectMarkdown: false,
      columnName: 'studyDescriptionLocation',
      title: 'Project Description',
    },
    {
      name: 'StandaloneQueryWrapper',
      tableSqlKeys: ['projectId'],
      columnName: 'id',
      title: 'Data Files',
      props: dataDetailPageProps,
      injectMarkdown: false,
    },
    {
      name: 'CardContainerLogic',
      tableSqlKeys: ['synID'],
      columnName: 'id',
      title: 'Publications',
      injectMarkdown: false,
      props: publicationDetailPageProps,
    },
  ],
}

export const projectDetailPage: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      isHeader: true,
      isAlignToLeftNav: true,
      backgroundColor: '#5bb0b5',
      ...projectsCardConfiguration,
      titleLinkConfig: undefined,
      facetAliases,
      genericCardSchema: {
        ...projectSchema,
        title: 'study',
        link: 'id',
      },
      rgbIndex,
      sql: projectsSql,
    },
  },
  {
    name: 'DetailsPage',
    props: details,
  },
]
