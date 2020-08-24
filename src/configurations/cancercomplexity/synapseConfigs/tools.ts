import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
export const toolsSql = 'SELECT * FROM syn21930566'
const sql = toolsSql
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
      loadingScreen,
      facet: 'consortium',
      link: 'Explore/Tools',
      linkText: 'Explore Tools',
      sql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      loadingScreen,
      sql,
      cardConfiguration: toolsConfiguration,
      shouldDeepLink: true,
      name: 'Tools',
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'toolName',
          },
          {
            columnName: 'description',
          },
          {
            columnName: 'publicationTitle',
          },
          {
            columnName: 'inputDataType',
          },
          {
            columnName: 'outputDataType',
          },
          {
            columnName: 'grantName',
          },
          {
            columnName: 'grantNumber',
          },
        ],
      },
    },
  },
}
