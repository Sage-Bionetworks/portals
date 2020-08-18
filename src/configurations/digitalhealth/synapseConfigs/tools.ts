import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig, SynapseConfigArray } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import {
  CardConfiguration,
  CardContainerLogicProps,
} from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
export const toolsSql = 'SELECT * FROM syn22014091 ORDER BY "softwareName"'
export const toolsEntityId = 'syn22014091'
const entityId = toolsEntityId
const sql = toolsSql
const unitDescription = 'Tools'
const rgbIndex = 3

export const toolsSchema: GenericCardSchema = {
  type: SynapseConstants.COMPUTATIONAL,
  title: 'softwareName',
  subTitle: 'softwareType',
  description: 'summary',
  secondaryLabels: [
    'digitalAssessmentCategory',
    'inputDataType',
    'outputDataType',
    'softwareLanguage',
    'softwareAuthor',
  ],
  link: 'url',
}

export const toolsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: toolsSchema,
  loadingScreen,
}

export const tools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facet: 'theme',
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
      cardConfiguration: toolsCardConfiguration,
      sql,
      hideDownload: true,
      shouldDeepLink: true,
      defaultColumn: 'softwareType',
      name: 'Tools',
      loadingScreen,
      facetAliases,
      facetsToPlot: [
        'digitalAssessmentCategory',
        'inputDataType',
        'outputDataType',
        'softwareLanguage',
        'softwareType',
      ],
      searchConfiguration: {
        searchable: [
          {
            columnName: 'digitalAssessmentCategory',
            hintText: 'tremor',
          },
          {
            columnName: 'inputDataType',
            hintText: 'accelerometer',
          },
          {
            columnName: 'outputDataType',
            hintText: 'heart rate',
          },
          {
            columnName: 'softwareAuthor',
            hintText: 'LastName',
          },
          {
            columnName: 'softwareName',
            hintText: '',
          },
        ],
      },
    },
  },
}

export const toolsDetailPageProps: CardContainerLogicProps = {
  sql,
  entityId: toolsEntityId,
  ...toolsCardConfiguration,
  sqlOperator: 'LIKE',
  facetAliases,
}

export const toolsDetailsLandingPage: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      isHeader: true,
      isAlignToLeftNav: true,
      backgroundColor: '#5bb0b5',
      ...toolsCardConfiguration,
      titleLinkConfig: undefined,
      facetAliases,
      genericCardSchema: toolsSchema,
      rgbIndex,
      sql,
      entityId,
    },
  },
  {
    name: 'DetailsPage',
    props: {
      sql,
      entityId,
      synapseConfigArray: [],
    },
  },
]
