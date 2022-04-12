import { SynapseConstants } from 'synapse-react-client'
import { SynapseConfig } from 'types/portal-config'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
import { toolsSql } from '../resources'

const rgbIndex = 6

export const toolsSchema: GenericCardSchema = {
  type: SynapseConstants.TOOL,
  title: 'toolName',
  description: 'description',
  secondaryLabels: [
    'inputData',
    'inputFormat',
    'outputData',
    'outputFormat',
    'language',
    'toolType',
    'operation',
    'topic',
    'downloadLink',
    'consortium',
  ],
}

export const toolsConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: toolsSchema,
  secondaryLabelLimit: 5,
  titleLinkConfig: {
    isMarkdown: false,
    URLColumnName: 'toolName',
    matchColumnName: 'toolName',
    baseURL: 'Explore/Tools/DetailsPage',
  },
  labelLinkConfig: [
    {
      isMarkdown: true,
      matchColumnName: 'downloadLink',
    },
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

export const tools: SynapseConfig = {
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
        'inputData',
        'outputData',
        'grantName',
      ],
    },
  },
}
