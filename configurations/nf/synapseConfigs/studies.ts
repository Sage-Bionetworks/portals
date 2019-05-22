import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'

const sql = 'SELECT * FROM syn16787123'
export const studiesSql = sql
const facetAliases = {
  projectStatus: 'Project Status',
  dataStatus: 'Data Status',
  fundingAgency: 'Funding Agency',
  tumorType: 'Tumor Type',
  diseaseFocus: 'Disease Focus'
}
const type = 'study'
const unitDescription = 'Studies'
const rgbIndex = 1
const synapseId = 'syn16787123'

const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperHelper',
    props: {
      facetAliases,
      unitDescription,
      rgbIndex,
      loadingScreen,
      name: 'Studies',
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
          offset: 0
        }
      }
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      synapseId,
      type,
      loadingScreen,
      menuConfig: [
        {
          sql,
          facetAliases,
          unitDescription,
          synapseId,
          facetName: 'projectStatus',
        },
        {
          sql,
          unitDescription,
          synapseId,
          facetAliases,
          facetName: 'dataStatus'
        },
        {
          sql,
          unitDescription,
          synapseId,
          facetAliases,
          facetName: 'fundingAgency'
        },
        {
          sql,
          unitDescription,
          synapseId,
          facetAliases,
          facetName: 'tumorType'
        },
        {
          sql,
          synapseId,
          facetAliases,
          unitDescription,
          facetName: 'diseaseFocus',
        },
      ]
    }
  }
}

export default studies
