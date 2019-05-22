import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'people'
const rgbIndex = 2
const sql = 'SELECT * FROM syn13897207'
const synapseId = 'syn13897207'
const title = 'People'

const people: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperHelper',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      facetName: 'Program',
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
      loadingScreen,
      menuConfig: [
        {
          synapseId,
          title,
          unitDescription,
          facetName: 'Program',
          sql: "select firstName as \"First Name\", lastName as \"Last Name\", institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
        },
        {
          synapseId,
          title,
          unitDescription,
          facetName: 'Grant Number',
          sql: "select firstName as First, lastName as Last, institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
        },
        {
          synapseId,
          title,
          unitDescription,
          sql:
          "select firstName as First, lastName as Last, institution as Institution, Program, 'Grant Number', 'Grant Title' from syn13897207",
          facetName: 'institution',
          facetDisplayValue: 'Institution',
        },
      ]
    }
  }
}

export default people
