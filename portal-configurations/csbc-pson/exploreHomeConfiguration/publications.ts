import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config';

const sql = 'SELECT * FROM syn10923842'
const unitDescription = 'Publications'
const synapseId = 'syn10923842'
const rgbIndex = 1

export const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapper',
    props: {
      rgbIndex,
      unitDescription,
      name: 'Publications',
      facetName: 'Consortium',
      facetAliases: {
        Consortium: 'Program',
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
      }
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      type: SynapseConstants.CSBC_PUBLICATION,
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
    }
  }
}
