import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
import { facetAliases } from './commonProps'

const sql = 'SELECT * FROM syn16859580'
export const datasetsSql = sql
const type = 'dataset'
const unitDescription = 'datasets'
const rgbIndex = 5

const datasets: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      unitDescription,
      rgbIndex,
      facetAliases,
      loadingScreen,
      link: 'Explore/Datasets',
      linkText: 'Explore Datasets',
      facetName: 'diseaseFocus',
      initQueryRequest: {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
          | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
          | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: false,
          limit: 25,
          offset: 0,
        },
      }
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      cardConfiguration: {
        type,
      },
      name: 'Datasets',
      menuConfig: [
        {
          sql,
          facetAliases,
          facetName: 'diseaseFocus',
        },
        {
          sql,
          facetAliases,
          facetName: 'tumorType',
        },
        {
          sql,
          facetAliases,
          facetName: 'fundingAgency',
        },
      ]
    }
  }
}

export default datasets
