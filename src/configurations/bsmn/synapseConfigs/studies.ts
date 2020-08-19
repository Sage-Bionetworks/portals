import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { DetailsPageProps } from 'types/portal-util-types'
import {
  publicationsSql,
  publicationsCardConfiguration,
  publicationsEntityId,
} from './publications'

const unitDescription = 'Studies'
const rgbIndex = 0
export const studiesSql = 'SELECT * FROM syn21438231'
export const studiesEntityId = 'syn21438231'
const entityId = studiesEntityId
const sql = studiesSql
const facet = 'Program'

export const studyCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  loadingScreen,
  genericCardSchema: {
    type: SynapseConstants.STUDY,
    title: 'studyName',
    subTitle: 'institutions',
    description: 'studyDescription',
    icon: 'studyStatus',
    secondaryLabels: [
      'diagnosis',
      'organs',
      'tissues',
      'tissueFraction',
      'dataTypes',
      'project',
      'ndaStudy',
    ],
  },
  labelLinkConfig: [
    {
      matchColumnName: 'ndaStudy',
      isMarkdown: true,
    },
    {
      isMarkdown: false,
      matchColumnName: 'project',
      URLColumnName: 'id',
      baseURL: 'Explore/Projects/DetailsPage',
    },
  ],
  secondaryLabelLimit: 4,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Studies/DetailsPage',
    URLColumnName: 'id',
    matchColumnName: 'id',
  },
}

const studies: HomeExploreConfig = {
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
      shouldDeepLink: true,
      sql,
      hideDownload: true,
      name: 'Studies',
      cardConfiguration: studyCardConfiguration,
      facetsToPlot: [
        'studyStatus',
        'diagnosis',
        'organs',
        'tissues',
        'dataTypes',
        'tissueFraction',
      ],
      searchConfiguration: {
        searchable: [
          {
            columnName: 'studyName',
          },
          {
            columnName: 'institutions',
          },
          {
            columnName: 'studyDescription',
          },
          {
            columnName: 'diagnosis',
          },
          {
            columnName: 'organs',
          },
          {
            columnName: 'tissues',
          },
          {
            columnName: 'tissueFraction',
          },
          {
            columnName: 'dataTypes',
          },
          {
            columnName: 'methods',
          },
        ],
      },
    },
  },
}

export const studiesDetailPageConfiguration: DetailsPageProps = {
  showMenu: true,
  sql,
  entityId,
  synapseConfigArray: [
    {
      name: 'Markdown',
      title: 'Study Description',
      columnName: 'id',
      props: {},
    },
    {
      name: 'Markdown',
      title: 'Access Requirements',
      columnName: 'accessRequirements',
      props: {},
    },
    {
      name: 'CardContainerLogic',
      columnName: 'id',
      title: 'Publications',
      tableSqlKeys: ['study'],
      props: {
        sql: publicationsSql,
        ...publicationsCardConfiguration,
      },
    },
  ],
}

export default studies
