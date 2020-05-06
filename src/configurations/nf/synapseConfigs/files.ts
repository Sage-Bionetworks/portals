import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { facetAliases } from './commonProps'

const rgbIndex = 1
const unitDescription = 'Files'
const title = 'Files'
const visibleColumnCount = 7
export const filesEntityId = 'syn16858331'
const entityId = filesEntityId

const files: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      link: 'Explore/Files',
      linkText: 'Explore Files',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          isConsistent: true,
          limit: 25,
          offset: 0,
          sql:
            "SELECT * FROM syn16858331 WHERE resourceType = 'experimentalData'",
        },
      },
      facet: 'assay',
      facetAliases,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      name: 'Files',
      sql: `SELECT id AS "File ID", assay, dataType, diagnosis, tumorType,  species, individualID,  fileFormat, dataSubtype, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", studyName, fundingAgency, consortium, name AS "File Name", accessType, accessTeam  FROM syn16858331 WHERE resourceType = 'experimentalData'`,
      entityId,
      loadingScreen,
      tableConfiguration: {
        // visibleColumnCount,
        title,
      },
      shouldDeepLink: true,
      // @ts-ignore
      facetAliases,
    },
  },
}

export default files
