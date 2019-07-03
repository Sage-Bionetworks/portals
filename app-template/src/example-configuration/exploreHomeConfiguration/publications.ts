import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { HomeExploreConfig } from '../../types/portal-config'

const sql = 'SELECT * FROM syn10923842'
const unitDescription = 'Publications'
const rgbIndex = 0
const facetName = 'Theme'
export const publications: HomeExploreConfig = {
  homePageSynapseObject: [{
    name: 'QueryWrapperWithStackedBarChart',
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
  }],
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      loadingScreen,
      unitDescription,
      name: 'Publications',
      cardConfiguration: {
        type: SynapseConstants.CSBC_PUBLICATION,
      },
      menuConfig: [
        {
          sql,
          facetName: 'Publication Year',
        },
        {
          sql,
          facetName: 'Consortium',
          facetAliases: {
            Consortium: 'Program',
          },
        },
        {
          sql,
          facetName: 'grantType',
          facetAliases: {
            grantType: 'Grant Type',
          },
        },
        {
          sql,
          facetName: 'diseaseType',
          facetAliases: {
            diseaseType: 'Disease',
          },
        },
        {
          sql,
          facetName: 'Theme',
        },
        {
          sql,
          facetName: 'experimentalStrategy',
          facetAliases: {
            experimentalStrategy: 'Assay',
          },
        },
      ],
      rgbIndex: 1,
    }
  }
}
