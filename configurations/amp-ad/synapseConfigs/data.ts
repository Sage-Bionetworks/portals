
import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'data files'
const rgbIndex = 1
const sql = 'SELECT * FROM syn11346063'
const synapseId = 'syn11346063'
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
      initQueryRequest : {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask: SynapseConstants.BUNDLE_MASK_QUERY_FACETS
          | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: true,
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
      unitDescription,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      isConsistent: true,
      name: 'Data',
      tableConfiguration: {
        title,
        synapseId,
        visibleColumnCount: 4,
      },
      facetAliases: {
        study: "Study",
        species: 'Species',
        organ: 'Organ',
        dataType: 'Data Type',
        assay: 'Assay',
        diagnosis: 'Diagnosis',
        consortium: 'Program',
      },
      menuConfig: [
        {
          sql: 'SELECT study as "Study", dataType as "Data Type", assay as "Assay", id AS file_id, consortium as "Program", grant as "Grant", species as "Species", organ AS "Organ", tissue, cellType, fileFormat, specimenID FROM syn11346063',
          facet: 'study',
        },
        {
          sql:
            'SELECT species as "Species", dataType as "Data Type", id as file_id, consortium as "Program", grant as "Grant", study as "Study", organ AS "Organ", tissue, cellType, assay as "Assay", fileFormat, specimenID FROM syn11346063',
          facet: 'species',
        },
        {
          sql:
            'SELECT organ AS "Organ", tissue, dataType as "Data Type", assay as "Assay", id AS file_id, consortium as "Program", grant as "Grant", study as "Study", species as "Species", cellType, specimenID FROM syn11346063',
          facet: 'organ',
        },
        {
          sql:
            'SELECT dataType as "Data Type", assay as "Assay", study as "Study", id AS file_id, consortium as "Program", grant as "Grant", species as "Species", organ AS "Organ", tissue, cellType, fileFormat, specimenID FROM syn11346063',
          facet: 'dataType',
        },
        {
          sql:
            'SELECT assay as "Assay", fileFormat, id AS file_id, consortium as "Program", grant as "Grant", study as "Study", species as "Species", organ AS "Organ", tissue, cellType, dataType as "Data Type", specimenID FROM syn11346063',
          facet: 'assay',
        },
        {
          sql:
            'SELECT diagnosis AS "Diagnosis", sex, dataType as "Data Type", assay as "Assay", id as file_id, consortium as "Program", grant as "Grant", study as "Study", species as "Species", organ AS "Organ", tissue, cellType, fileFormat, specimenID, anonymized_individualID FROM syn17024112',
          facet: 'diagnosis',
        }
      ]
    }
  }
}

export default data
