
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
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      facetName: 'study',
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
      loadingScreen,
      unitDescription,
      isConsistent: true,
      tableConfiguration: {
        title,
        synapseId,
        visibleColumnCount: 4,
      },
      menuConfig: [
        {
          sql: 'SELECT study, dataType, assay, id AS file_id, consortium as program, grant, species, organ, tissue, cellType, fileFormat, specimenID FROM syn11346063',
          facetName: 'study',
          facetDisplayValue: 'Study',
        },
        {
          sql:
            'SELECT species, dataType, id as file_id, consortium as program, grant, study, organ, tissue, cellType, assay, fileFormat, specimenID FROM syn11346063',
          facetName: 'species',
          facetDisplayValue: 'Species',
        },
        {
          sql:
            'SELECT organ, tissue, dataType, assay, id AS file_id, consortium as program, grant, study, species, cellType, specimenID FROM syn11346063',
          facetName: 'organ',
          facetDisplayValue: 'Organ',
        },
        {
          sql:
            'SELECT dataType, assay, study, id AS file_id, consortium as program, grant, species, organ, tissue, cellType, fileFormat, specimenID FROM syn11346063',
          facetName: 'dataType',
          facetDisplayValue: 'Data Type',
        },
        {
          sql:
            'SELECT assay, fileFormat, id AS file_id, consortium as program, grant, study, species, organ, tissue, cellType, dataType, specimenID FROM syn11346063',
          facetName: 'assay',
          facetDisplayValue: 'Assay',
        },
        {
          sql:
            'SELECT diagnosis, sex, dataType, assay, id as file_id, consortium as program, grant, study, species, organ, tissue, cellType, fileFormat, specimenID, anonymized_individualID FROM syn17024112',
          facetName: 'diagnosis',
          facetDisplayValue: 'Diagnosis',
        }
      ]
    }
  }
}

export default data
