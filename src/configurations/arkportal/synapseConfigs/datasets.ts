import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import { CardConfiguration, CardContainerLogicProps, LabelLinkConfig } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { datasetsSql } from '../resources'
import { SynapseConstants } from 'synapse-react-client'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'

const rgbIndex = 0
export const datasetColumnLinks: LabelLinkConfig = [
  {
    matchColumnName: 'name',
    isMarkdown: false,
    baseURL: 'Explore/Datasets/DetailsPage',
    URLColumnName: 'Dataset',
    linkColumnName: 'id'
  },
]

const dataset: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    shouldDeepLink: true,
    sql: datasetsSql,
    name: 'Datasets',
    facetAliases,
    tableConfiguration: {
      columnLinks: datasetColumnLinks,
    },
    facetsToPlot: [
      'program',
      'project',
      'datasetType',
      'assay',
    ],
    searchConfiguration: {
      searchable: [
        'name',
        'program',
        'project',
        'datasetType',
        'assay',
      ],
    },
  },
}

export const datasetSchema: GenericCardSchema = {
  type: SynapseConstants.DATASET,
  title: 'name',
  subTitle: 'program',
  description: '',
  secondaryLabels: [
    'project',
  ],
}

export const datasetCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: datasetSchema,
  titleLinkConfig: {
    isMarkdown: false,
    matchColumnName: 'id',
    URLColumnName: 'id',
    baseURL: 'Explore/Datasets/DetailsPage',
  },
}

export const datasetDetailPageProps: CardContainerLogicProps = {
  sql: datasetsSql,
  ...datasetCardConfiguration,
  sqlOperator: '=',
  facetAliases,
}

export default dataset
