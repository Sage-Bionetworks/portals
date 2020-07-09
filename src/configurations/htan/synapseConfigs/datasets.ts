import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
export const datasetsSql = `SELECT * FROM syn21897968`
export const datasetsEntityId = 'syn21897968'
const entityId = datasetsEntityId
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
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      loadingScreen,
      rgbIndex: 0,
      facet: 'tumorType',
      link: 'Explore/Datasets',
      linkText: 'Explore Datasets',
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
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      entityId,
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
            hintText: 'migration',
          },
          {
            columnName: 'description',
            hintText: 'spatiotemporal',
          },
          {
            columnName: 'overallDesign',
            hintText: 'spatiotemporal',
          },
          {
            columnName: 'publicationTitle',
            hintText: 'methylation',
          },
          {
            columnName: 'tummorType',
            hintText: 'Skin Cutaneous Melanoma',
          },
          {
            columnName: 'species',
            hintText: 'Human',
          },
          {
            columnName: 'assay',
            hintText: 'RNA-seq',
          },
          {
            columnName: 'grantName',
            hintText: 'immunity',
          },
          {
            columnName: 'grantNumber',
            hintText: 'CA202123',
          },
          {
            columnName: 'datasetAlias',
            hintText: 'PRJNA312905',
          },
          {
            columnName: 'externalLink',
            hintText: 'GSE93776',
          },
        ],
      },
    },
  },
}
