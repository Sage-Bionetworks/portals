import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
export const toolsSql = 'SELECT * FROM syn21930566'
export const toolsEntityId = 'syn21930566'
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
      isMarkdown: true,
      matchColumnName: 'publicationTitle',
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
      shouldDeepLink: true,
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
            columnName: 'description',
            hintText: 'module',
          },
          {
            columnName: 'publicationTitle',
            hintText: 'modeling',
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
            columnName: 'grantName',
            hintText: 'Mechanics',
          },
        ],
      },
      name: 'Tools',
      menuConfig: [
        {
          sql,
          facet: 'theme',
        },
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
          facet: 'toolType',
        },
        {
          sql,
          facet: 'softwareLanguage',
        },
        {
          sql,
          facet: 'grantName',
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
