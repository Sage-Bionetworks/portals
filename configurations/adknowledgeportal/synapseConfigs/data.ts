
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
        individuals: 'Individuals',
        sex: 'Sex'
      },
      menuConfig: [
        {
          sql: 'SELECT study as "Study", dataType as "Data Type", assay as "Assay", id AS file_id, specimenID, individualID, diagnosis AS "Diagnosis", sex as "Sex", consortium as "Program", grant as "Grant", species as "Species", organ AS "Organ", tissue, cellType, fileFormat FROM syn11346063',
          facet: 'study',
        },
        {
          sql: 'SELECT species as "Species", dataType as "Data Type", id as file_id, specimenID, individualID, diagnosis AS "Diagnosis", sex as "Sex", consortium as "Program", grant as "Grant", study as "Study", organ AS "Organ", tissue, cellType, assay as "Assay", fileFormat FROM syn11346063',
          facet: 'species',
        },
        {
          sql: 'SELECT organ AS "Organ", tissue, dataType as "Data Type", assay as "Assay", id AS file_id, specimenID, individualID, diagnosis AS "Diagnosis", sex as "Sex", consortium as "Program", grant as "Grant", study as "Study", species as "Species", cellType FROM syn11346063',
          facet: 'organ',
        },
        {
          sql:  'SELECT dataType as "Data Type", assay as "Assay", study as "Study", id AS file_id, specimenID, individualID, diagnosis AS "Diagnosis", sex as "Sex", consortium as "Program", grant as "Grant", species as "Species", organ AS "Organ", tissue, cellType, fileFormat FROM syn11346063',
          facet: 'dataType',
        },
        {
          sql: 'SELECT assay as "Assay", fileFormat, id AS file_id, specimenID, individualID, diagnosis AS "Diagnosis", sex as "Sex", consortium as "Program", grant as "Grant", study as "Study", species as "Species", organ AS "Organ", tissue, cellType, dataType as "Data Type"  FROM syn11346063',
          facet: 'assay',
        },
        {
          sql:  'SELECT diagnosis AS "Diagnosis", sex as "Sex", dataType as "Data Type", specimenID, individualID, id as file_id, assay as "Assay", consortium as "Program", grant as "Grant", species as "Species", organ AS "Organ", tissue, cellType, fileFormat FROM syn11346063 ORDER BY 1 DESC',
          facet: 'diagnosis',
        },
        {
          sql: 'SELECT diagnosis AS "Diagnosis", sex as "Sex", dataType as "Data Type", assay as "Assay", count(distinct(id)) as "Files", count(distinct(specimenID)) as "Specimens", count(distinct(individualID)) as "Individuals" FROM syn11346063 GROUP BY 1,2,3,4 ORDER BY 1 DESC',
          facet: 'individuals'
        }
      ]
    }
  }
}

export default data
