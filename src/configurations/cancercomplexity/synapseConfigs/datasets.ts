import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
export const datasetsSql = `SELECT * FROM syn21897968`
export const datasetsEntityId = 'syn21897968'
const sql = datasetsSql
const unitDescription = 'Datasets'
const rgbIndex = 0

export const datasetSchema: GenericCardSchema = {
  type: SynapseConstants.DATASET,
  title: 'datasetName',
  description: 'description',
  secondaryLabels: [
    'publicationTitle',
    'overallDesign',
    'tumorType',
    'assay',
    'species',
    'externalLink',
    'grantName',
    'consortium',
  ],
}

export const datasetCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: datasetSchema,
  secondaryLabelLimit: 4,
  labelLinkConfig: [
    {
      isMarkdown: true,
      matchColumnName: 'externalLink',
    },
    {
      isMarkdown: false,
      URLColumnName: 'publicationTitle',
      matchColumnName: 'publicationTitle',
      baseURL: 'Explore/Publications/DetailsPage',
    },
    {
      isMarkdown: false,
      matchColumnName: 'grantName',
      URLColumnName: 'grantName',
      baseURL: 'Explore/Grants/DetailsPage',
    },
  ],
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Datasets/DetailsPage',
    URLColumnName: 'datasetId',
    matchColumnName: 'datasetId',
  },
}

export const datasets: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      loadingScreen,
      rgbIndex: 0,
      facet: 'tumorType',
      link: 'Explore/Datasets',
      linkText: 'Explore Datasets',
      sql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      cardConfiguration: datasetCardConfiguration,
      shouldDeepLink: true,
      name: 'Datasets',
      sql,
      loadingScreen,
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'datasetName',
          },
          {
            columnName: 'description',
          },
          {
            columnName: 'overallDesign',
          },
          {
            columnName: 'publicationTitle',
          },
          {
            columnName: 'tummorType',
          },
          {
            columnName: 'species',
          },
          {
            columnName: 'assay',
          },
          {
            columnName: 'grantName',
          },
          {
            columnName: 'grantNumber',
          },
          {
            columnName: 'datasetAlias',
          },
          {
            columnName: 'externalLink',
          },
        ],
      },
    },
  },
}
