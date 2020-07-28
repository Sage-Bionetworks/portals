import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { facetAliases } from './commonProps'

const sql = 'SELECT * FROM syn16859580'
export const datasetsEntityId = 'syn16859580'
const entityId = datasetsEntityId
export const datasetsSql = sql
export const newDatasetsSql = `${sql} order by ROW_ID desc limit 3`
const type = 'dataset'
const unitDescription = 'datasets'
const rgbIndex = 8

const datasets: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      facetAliases,
      loadingScreen,
      link: 'Explore/Datasets',
      linkText: 'Explore Datasets',
      facet: 'diseaseFocus',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
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
      shouldDeepLink: true,
      sql,
      cardConfiguration: {
        type,
      },
      loadingScreen,
      name: 'Datasets',
      entityId,
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'datasetName',
            hintText: '',
          },
          {
            columnName: 'summary',
            hintText: '',
          },
          {
            columnName: 'studyName',
            hintText: '',
          },
          {
            columnName: 'diseaseFocus',
            hintText: '',
          },
          {
            columnName: 'manifestation',
            hintText: '',
          },
          {
            columnName: 'fundingAgency',
            hintText: '',
          },
        ],
      },
    },
  },
}

export default datasets
