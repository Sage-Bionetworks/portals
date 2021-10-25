import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'

import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { facetAliases } from './commonProps'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { toolsSql } from '../resources'
import { DetailsPageProps } from 'types/portal-util-types'

export const newToolsSql = `${toolsSql} order by ROW_ID desc limit 3`

export const toolsSchema: GenericCardSchema = {
  type: 'TOOL',
  title: 'Resource Name',
  subTitle: 'Resource Type',
  description: 'Description',
  secondaryLabels: [
    'rrid',
    'Synonyms',
  ],
}

export const toolsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Tools/DetailsPage',
    URLColumnName: 'Resource_id',
    matchColumnName: 'Resource_id',
  },
  genericCardSchema: {
    type: 'TOOL',
    icon: 'tool',
    title: 'Resource Name',
    subTitle: 'Resource Type',
    description: 'Description',
    secondaryLabels: [
      'rrid',
      'Synonyms',
    ],
  },
}
const rgbIndex = 6
const tools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      unitDescription: 'Tools',
      link: 'Explore/Tools',
      linkText: 'Explore Tools',
      facet: 'type',
      sql: toolsSql,
      facetAliases,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: toolsSql,
      shouldDeepLink: true,
      name: 'Tools',
      cardConfiguration: toolsCardConfiguration,
      facetAliases,
      searchConfiguration: {
        searchable: [
          'name',
          'summary',
          'studyName',
          'fundingAgency',
          'contact',
          'type',
          'subtype',
          'diseaseFocus',
          'manifestation',
        ],
      },

    },
  },
}

export const toolDetailsPageConfig: DetailsPageProps = {
  sql: toolsSql,
  tabLayout: [
    {
      title: "Details",
      iconName: "study",
    },
    {
      title: "Observations",
      iconName: "database",
      cssClass: "tab-database"
    },
    {
      title: "Data",
      iconName: "database",
      cssClass: "tab-database"
    }

  ],
  synapseConfigArray: [
    {
      name: 'Markdown',
      props: {
        ownerId: 'syn22272075',
        wikiId: '604853',
      },
      title: 'Detailed',
      standalone: true,
      tabIndex: 0,
    },
    {
      name: 'Markdown',
      props: {
        ownerId: 'syn22272075',
        wikiId: '604853',
      },
      title: 'Observed',
      standalone: true,
      tabIndex: 1,
    },
    {
      name: 'Markdown',
      props: {
        ownerId: 'syn22272075',
        wikiId: '604853',
      },
      title: 'Data',
      standalone: true,
      tabIndex: 2,
    },
  ],
}

export const toolsDetailsPage: SynapseConfig[] = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      sql: toolsSql,
      type: SynapseConstants.GENERIC_CARD,
      genericCardSchema: toolsSchema,
      isHeader: true,
    },
  },
  {
    name: 'DetailsPage',
    props: toolDetailsPageConfig,
    containerClassName: 'container-full-width',
  },
]

export default tools
