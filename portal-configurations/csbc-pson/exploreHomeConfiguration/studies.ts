import { SynapseConstants } from 'synapse-react-client'
const unitDescription = 'studies'
const sql = `SELECT * FROM syn18483791 WHERE ( ( "is.study" = 'TRUE' ) )`
const synapseId = 'syn18483791'

export const studies = {
  unitDescription,
  sql,
  name: 'Studies',
  type: SynapseConstants.CSBC_STUDY,
  menuConfig: [
    {
      unitDescription,
      sql,
      synapseId,
      facetName: 'grantType',
      facetAliases: {
        grantType: 'Grant Type',
      }
    },
    {
      unitDescription,
      sql,
      synapseId,
      facetName: 'centerName',
      facetAliases: {
        centerName: 'Grant',
      }
    },
    {
      unitDescription,
      sql,
      synapseId,
      facetName: 'consortium',
      facetAliases: {
        consortium: 'Program',
      }
    },
    {
      unitDescription,
      sql,
      synapseId,
      facetName: 'Theme'
    },
    {
      unitDescription,
      sql,
      synapseId,
      facetName: 'experimentalStrategy',
      facetAliases: {
        experimentalStrategy: 'Assay',
      }
    },
    {
      unitDescription,
      sql,
      synapseId,
      facetName: 'tumorType',
      facetAliases: {
        tumorType: 'Disease Type',
      }
    },
  ],
  rgbIndex: 1,
  facetName: 'grantType',
  facetAliases: {
    grantType: 'Grant Type',
  },
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
