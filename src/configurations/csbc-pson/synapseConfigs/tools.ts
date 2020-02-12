import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
export const toolsSql = 'SELECT * FROM syn21488853'
export const toolsEntityId = 'syn21488853'
const entityId = toolsEntityId
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
      'PublicationTitle',
      'projectId',
      'inputDataType',
      'outputDataType',
      'softwareLanguage',
      'study',
      'consortium',
    ],
    link: 'URL',
  },
  labelLinkConfig: [
    {
      isMarkdown: true,
      matchColumnName: 'PublicationTitle',
    },
  ],
}

export const tools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facet: 'consortium',
      link: 'Explore/Tools',
      linkText: 'Explore Tools',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: true,
          limit: 25,
          offset: 0,
        },
      },
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      entityId,
      cardConfiguration: toolsConfiguration,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      searchConfiguration: {
        searchable: [
          {
            columnName: 'toolName',
            hintText: 'track',
          },
          {
            columnName: 'inputDataType',
            hintText: 'image',
          },
          {
            columnName: 'outputDataType',
            hintText: 'network',
          },
          {
            columnName: 'softwareLanguage',
            hintText: 'python',
          },
          {
            columnName: 'consortium',
            hintText: 'PS-ON',
          },
          {
            columnName: 'Description',
            hintText: 'module',
          },
          {
            columnName: 'PublicationTitle',
            hintText: 'modeling',
          },
        ],
      },
      name: 'Tools',
      menuConfig: [
        {
          sql,
          facet: 'inputDataType',
        },
        {
          sql,
          facet: 'outputDataType',
        },
        {
          sql,
          facet: 'softwareLanguage',
        },
        {
          sql,
          facet: 'consortium',
        },
        {
          sql,
        },
      ],
    },
  },
}
