import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { facetAliases, detailPageLinks } from './commonProps'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
export const datasetsSql = `SELECT * FROM syn18488466 WHERE ( ( "is.dataset" = 'TRUE' ) )`
export const datasetsEntityId = 'syn18488466'
const entityId = datasetsEntityId
const sql = datasetsSql
const unitDescription = 'Datasets'
const rgbIndex = 0

export const datasetSchema: GenericCardSchema = {
  type: SynapseConstants.DATASET,
  title: 'portalDisplayName',
  subTitle: 'centerName',
  description: 'summary',
  secondaryLabels: [
    'Title',
    'overallDesign',
    'PubMed',
    'Theme',
    'studies',
    'tumorType',
    'experimentalStrategy',
    'species',
    'externalLink',
    'centerName',
    'consortium',
    'grantType',
  ],
}

export const datasetCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: datasetSchema,
  secondaryLabelLimit: 4,
  labelLinkConfig: [
    ...detailPageLinks,
    {
      isMarkdown: true,
      matchColumnName: 'externalLink',
    },
  ],
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Datasets',
    URLColumnName: 'datasets',
    matchColumnName: 'id',
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
      facetAliases,
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
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'name',
            hintText: 'migration',
          },
          {
            columnName: 'summary',
            hintText: 'spatiotemporal',
          },
          {
            columnName: 'centerName',
            hintText: 'immunology',
          },
          {
            columnName: 'Theme',
            hintText: 'tumor-immune',
          },
          {
            columnName: 'experimentalStrategy',
            hintText: 'RNA-seq',
          },
          {
            columnName: 'tumorType',
            hintText: 'Skin Cutaneous Melanoma',
          },
          {
            columnName: 'species',
            hintText: 'Human',
          },
          {
            columnName: 'consortium',
            hintText: 'PS-ON',
          },
          {
            columnName: 'grantType',
            hintText: 'U01',
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
          facet: 'experimentalStrategy',
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
