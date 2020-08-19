import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import facetAliases from '../facetAliases'

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
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      shouldDeepLink: true,
      sql,
      name: 'Files',
      loadingScreen,
      visibleColumnCount: Infinity,
      tableConfiguration: {},
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'tummorType',
          },
          {
            columnName: 'tissue',
          },
          {
            columnName: 'assay',
          },
          {
            columnName: 'dataFormat',
          },
          {
            columnName: 'species',
          },
          {
            columnName: 'gender',
          },
          {
            columnName: 'grantName',
          },
          {
            columnName: 'grant',
          },
        ],
      },
    },
  },
}
