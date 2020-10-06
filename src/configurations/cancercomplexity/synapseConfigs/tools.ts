import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
import { toolsSql } from '../resources'
const unitDescription = 'Tools'
const rgbIndex = 6

export const toolsConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  secondaryLabelLimit: 4,
  genericCardSchema: {
    type: SynapseConstants.TOOL,
    title: 'toolName',
    description: 'description',
    secondaryLabels: [
      'publicationTitle',
      'inputDataType',
      'outputDataType',
      'softwareLanguage',
      'toolType',
      'grantName',
      'consortium',
    ],
    link: 'homepageUrl',
  },
  labelLinkConfig: [
    {
      isMarkdown: false,
      URLColumnName: 'publicationTitle',
      matchColumnName: 'publicationTitle',
      baseURL: 'Explore/Publications/DetailsPage',
    },
    {
      isMarkdown: false,
      URLColumnName: 'grantName',
      matchColumnName: 'grantName',
      baseURL: 'Explore/Grants/DetailsPage',
    },
  ],
}

export const tools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      unitDescription,
      facet: 'consortium',
      link: 'Explore/Tools',
      linkText: 'Explore Tools',
      sql: toolsSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: toolsSql,
      cardConfiguration: toolsConfiguration,
      shouldDeepLink: true,
      name: 'Tools',
      facetAliases,
      searchConfiguration: {
        searchable: [
          'toolName',
          'description',
          'publicationTitle',
          'inputDataType',
          'outputDataType',
          'grantName',
          'grantNumber',          
        ],
      },
    },
  },
}
