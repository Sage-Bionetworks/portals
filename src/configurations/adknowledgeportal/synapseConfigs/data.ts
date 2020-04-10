import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'data files'
const rgbIndex = 1
const sql = 'SELECT * FROM syn11346063'
const entityId = 'syn11346063'
const title = 'Data'

const data: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      facet: 'study',
      link: 'Explore/Data',
      linkText: 'Explore Data',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: true,
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
      name: 'Data',
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
          sql:
            'SELECT study, dataType, assay, id as File_id, specimenID, individualID, diagnosis, sex, consortium as "Program", grant, species, organ, tissue, cellType, fileFormat FROM syn11346063',
          limit: 25,
          offset: 0,
        },
      },
      title,
      visibleColumnCount: 4,
      showAccessColumn: true,
      enableDownloadConfirmation: true,
      enableLeftFacetFilter: true,
      shouldDeepLink: true,
    },
  },
}

export default data
