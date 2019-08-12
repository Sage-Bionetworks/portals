import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
export const datasetsSql = `SELECT * FROM syn18488466 WHERE ( ( "is.dataset" = 'TRUE' ) )`
const sql = 'SELECT * FROM syn18488466'
const unitDescription = 'Datasets'
const rgbIndex = 0

export const datasetSchema: GenericCardSchema = {
  type: SynapseConstants.DATASET,
  title: 'name',
  subTitle: 'centerName',
  description: 'summary',
  secondaryLabels: {
    0: { key: 'Theme' },
    1: { key: 'tumorType', alias: 'Disease' },
    2: { key: 'experimentalStrategy', alias: 'Assay' },
    3: { key: 'species', alias: 'Species' },
    4: { key: 'consortium', alias: 'Program' },
    5: { key: 'grantType', alias: 'Grant Type' },
  },
  link: 'id',
}

export const datasets: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      loadingScreen,
      rgbIndex: 0,
      facetName: 'tumorType',
      link: 'Explore/Datasets',
      linkText: 'Explore Datasets',
      initQueryRequest : {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask: SynapseConstants.BUNDLE_MASK_QUERY_FACETS
          | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: false,
          limit: 25,
          offset: 0,
        }
      },
      facetAliases: {
        tumorType: 'Disease Type',
      },
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      cardConfiguration: {
        type: SynapseConstants.GENERIC_CARD,
        genericCardSchema: datasetSchema
      },
      stackedBarChartConfiguration: {
        loadingScreen
      },
      name: 'Datasets',
      facetAliases: {
        species: 'Species',
        experimentalStrategy: 'Assay',
        consortium: 'Program',
        tumorType: 'Disease Type',
        grantType: 'Grant Type'
      },
      menuConfig: [
        {
          sql,
          facetName: 'species',
        },
        {
          sql,
          facetName: 'Theme'
        },
        {
          sql,
          facetName: 'experimentalStrategy',
        },
        {
          sql,
          facetName: 'consortium',
        },
        {
          sql,
          facetName: 'tumorType',
        },
        {
          sql,
          facetName: 'grantType',
        }
      ],
    }
  }
}
