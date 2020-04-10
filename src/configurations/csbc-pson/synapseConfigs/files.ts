import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'

const sql =
  'SELECT fileName, title, species, dataFormat, assay, tumorType, gender, tissue, grantName, grantType, consortium FROM syn9630847'
export const filesEntityId = 'syn9630847'
const entityId = filesEntityId
export const filesSql = sql

const rgbIndex = 8
const unitDescription = 'files'
const facet = 'grantType'

export const files: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      facet,
      unitDescription,
      loadingScreen,
      link: 'Explore/Files',
      linkText: 'Explore Files',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
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
    name: 'TableWithSideFacets',
    props: {
      rgbIndex,
      unitDescription,
      shouldDeepLink: true,
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS |
          SynapseConstants.BUNDLE_MASK_QUERY_COUNT |
          SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
          SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS,
        query: {
          sql,
          limit: 25,
          offset: 0,
        },
      },
      enableLeftFacetFilter: true,
      enableDownloadConfirmation: true,
      title: 'Files',
      name: 'Files',
      loadingScreen,
    },
  },
}
