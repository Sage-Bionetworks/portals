import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'

const sql = 'SELECT * FROM syn10923842'
const unitDescription = 'Publications'
const synapseId = 'syn10923842'
const rgbIndex = 0
const facetName = 'Theme'
export const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapper',
    props: {
      rgbIndex,
      facetName,
      unitDescription,
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
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      menuConfig: [
        {
          unitDescription,
          sql,
          synapseId,
          facetName: 'Publication Year',
        },
        {
          sql,
          unitDescription,
          synapseId,
          facetName: 'Consortium',
          facetAliases: {
            Consortium: 'Program',
          },
        },
        {
          sql,
          unitDescription,
          synapseId,
          facetName: 'grantType',
          facetAliases: {
            grantType: 'Grant Type',
          },
        },
        {
          sql,
          unitDescription,
          synapseId,
          facetName: 'diseaseType',
          facetAliases: {
            diseaseType: 'Disease',
          },
        },
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'Theme',
        },
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'experimentalStrategy',
          facetAliases: {
            experimentalStrategy: 'Assay',
          },
        },
      ],
      rgbIndex: 1,
      facetAliases: {
        Consortium: 'Program',
      },
      type: SynapseConstants.CSBC_PUBLICATION,
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
}
