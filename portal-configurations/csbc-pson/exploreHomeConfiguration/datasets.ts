import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
export const datasetsSql = `SELECT * FROM syn18488466 WHERE ( ( "featured" = 'TRUE' ) )`
const sql = 'SELECT * FROM syn18488466'
const unitDescription = 'Datasets'
const synapseId = 'syn18488466'
const rgbIndex = 0

export const datasets: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapper',
    props: {
      unitDescription,
      rgbIndex: 0,
      facetName: 'tumorType',
      name: 'Datasets',
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
      type: SynapseConstants.CSBC_DATASET,
      menuConfig: [
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'species',
          facetAliases: {
            species: 'Species',
          }
        },
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'Theme'
        },
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'experimentalStrategy',
          facetAliases: {
            experimentalStrategy: 'Assay'
          }
        },
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'platform',
          facetAliases: {
            platform: 'Platform'
          }
        },
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'tumorType',
          facetAliases: {
            tumorType: 'Disease Type'
          }
        }
      ],
    }
  }
}
