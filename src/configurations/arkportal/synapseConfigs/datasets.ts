import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import { CardConfiguration, LabelLinkConfig } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { datasetsSql } from '../resources'
import { SynapseConstants } from 'synapse-react-client'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { DetailsPageProps } from 'types/portal-util-types'

const rgbIndex = 0
export const datasetColumnLinks: LabelLinkConfig = [
  {
    isMarkdown: false,
    baseURL: 'Explore/Datasets/DetailsPage',
    URLColumnName: 'id',
    matchColumnName: 'name',
    overrideValueWithRowID: true
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

export const datasetDetailsPageConfig: DetailsPageProps = {
  sql: datasetsSql,
  sqlOperator: '=',
  showMenu: false,

  synapseConfigArray: [
    {
      name: 'QueryWrapperPlotNav',
      props: {
        rgbIndex,
        name: 'Files',
        sql: '',
        visibleColumnCount: 7,
        tableConfiguration: {
          showAccessColumn: true,
          showDownloadColumn: true,
        },
        shouldDeepLink: false,
        facetAliases,
      },
      // tableSqlKeys: ['id'],  // Do not modify the sql where condition based on search params
      overrideSqlSourceTable: true, // Instead, modify the sql (SELECT * FROM <search_param_value>)
      columnName: 'id',
    },
  ],
}

export const datasetsDetailsPage: SynapseConfig[] = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      sql: datasetsSql,
      type: SynapseConstants.GENERIC_CARD,
      genericCardSchema: datasetSchema,
      secondaryLabelLimit: 6,
      isHeader: true,
    },
  },
  {
    name: 'DetailsPage',
    isOutsideContainer: true,
    props: datasetDetailsPageConfig,
    containerClassName: 'container-full-width',
  },
]

export default dataset
