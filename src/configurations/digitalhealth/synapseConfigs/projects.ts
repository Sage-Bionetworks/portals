import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig, SynapseConfigArray } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
import { GenerateComponentsFromRowProps } from 'types/portal-util-types'
import { dataDetailPageProps } from './data'
import { publicationDetailPageProps } from './publications'
export const projectsSql =
  "SELECT * FROM syn21994974 WHERE  dhPortalIndex = 'TRUE' and isDHProject = 'TRUE' ORDER BY 'study'"
export const projectsEntityId = 'syn21994974'
const entityId = projectsEntityId
const sql = projectsSql
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
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facet: 'theme',
      link: 'Explore/Projects',
      linkText: 'Explore Projects',
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
      cardConfiguration: projectsCardConfiguration,
      sql,
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
            hintText: "Parkinson's",
          },
          {
            columnName: 'digitalAssessmentCategory',
            hintText: 'tremor',
          },
          {
            columnName: 'digitalAssessmentDetails',
            hintText: 'walking',
          },
          {
            columnName: 'intervention',
            hintText: 'levodopa',
          },
          {
            columnName: 'investigator',
            hintText: 'LastName',
          },
          {
            columnName: 'keywords',
            hintText: 'neurodegeneration',
          },
          {
            columnName: 'reportedOutcome',
            hintText: 'MDS-UPDRS',
          },
          {
            columnName: 'study',
            hintText: 'mPower',
          },
        ],
      },
    },
  },
}

export const details: GenerateComponentsFromRowProps = {
  sql,
  entityId,
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
      sql,
      entityId,
    },
  },
  {
    name: 'GenerateComponentsFromRow',
    props: details,
  },
]
