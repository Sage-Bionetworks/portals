import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
export const datasetsSql = `SELECT * FROM syn18488466 WHERE ( ( "is.dataset" = 'TRUE' ) )`
export const datasetsEntityId = 'syn18488466'
const entityId = datasetsEntityId
const sql = datasetsSql
const unitDescription = 'Datasets'
const rgbIndex = 0

export const datasetSchema: GenericCardSchema = {
  type: SynapseConstants.DATASET,
  title: 'datasetName',
  description: 'summary',
  secondaryLabels: [
    'publicationTitle',
    'overallDesign',
    'tumorType',
    'assay',
    'species',
    'externalLink',
    'grantName',
    'consortium',
    'grantType',
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
      isMarkdown: true,
      matchColumnName: 'publicationTitle',
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
    URLColumnName: 'datasetName',
    matchColumnName: 'datasetName',
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
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      entityId,
      cardConfiguration: datasetCardConfiguration,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      name: 'Datasets',
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
            hintText: 'immunology',
          },
          {
            columnName: 'publicationTitle',
            hintText: 'immune-escape',
          },
          {
            columnName: 'grantName',
            hintText: 'immunology',
          },
          {
            columnName: 'assay',
            hintText: 'RNA-seq',
          },
          {
            columnName: 'tumorType',
            hintText: 'Skin Cutaneous Melanoma',
          },
        ],
      },
      menuConfig: [
        {
          sql,
          facet: 'Theme',
        },
        {
          sql,
          facet: 'assay',
        },
        {
          sql,
          facet: 'tumorType',
        },
        {
          sql,
          facet: 'species',
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
          facet: 'grantType',
        },
        {
          sql,
        },
      ],
    },
  },
}
