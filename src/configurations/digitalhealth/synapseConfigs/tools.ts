import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig, SynapseConfigArray } from 'types/portal-config'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import {
  CardConfiguration,
  CardContainerLogicProps,
} from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
import { toolsSql } from '../resources'

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
}

export const tools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      unitDescription,
      facet: 'theme',
      link: 'Explore/Collections',
      linkText: 'Explore Collections',
      sql: toolsSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      cardConfiguration: toolsCardConfiguration,
      sql: toolsSql,
      hideDownload: true,
      shouldDeepLink: true,
      defaultColumn: 'softwareType',
      name: 'Tools',
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
          'digitalAssessmentCategory',
          'inputDataType',
          'outputDataType',
          'softwareAuthor',
          'softwareName',
        ],
      },
    },
  },
}

export const toolsDetailPageProps: CardContainerLogicProps = {
  sql: toolsSql,
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
      sql: toolsSql,
    },
  },
  {
    name: 'DetailsPage',
    props: {
      sql: toolsSql,
      synapseConfigArray: [],
    },
  },
]
