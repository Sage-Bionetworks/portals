import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'

const sql = 'SELECT * FROM syn16859580'
export const datasetsSql = sql
const type = 'dataset'
const unitDescription = 'datasets'
const rgbIndex = 5
const synapseId = 'syn16859580'

const facetAliases = {
  diseaseFocus: 'Disease Focus',
  tumorType: 'Tumor Type',
  fundingAgency: 'Funding Agency',
}

const datasets: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      name: 'Datasets',
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
      unitDescription,
      rgbIndex,
      type,
      menuConfig: [
        {
          sql,
          facetAliases,
          unitDescription,
          synapseId,
          facetName: 'diseaseFocus',
        },
        {
          sql,
          facetAliases,
          unitDescription,
          synapseId,
          facetName: 'tumorType',
        },
        {
          sql,
          facetAliases,
          unitDescription,
          synapseId,
          facetName: 'fundingAgency',
        },
      ]
    }
  }
}

export default datasets
