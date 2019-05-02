import { SynapseConstants } from 'synapse-react-client'
const sql = 'SELECT * FROM syn18488466'
const unitDescription = 'Datasets'
const synapseId = 'syn18488466'

export const data = {
  name: 'Data',
  props: {
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
    rgbIndex: 0,
    facetName: 'tumorType',
    facetAliases: {
      tumorType: 'Disease Type',
    },
  },
  // below is the props for the home page bar chart
  rgbIndex: 0,
  facetName: 'tumorType',
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
  countQuery : {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
    partMask: SynapseConstants.BUNDLE_MASK_QUERY_COUNT,
    query: {
      sql,
      isConsistent: false,
      limit: 25,
      offset: 0,
    }
  }
}
