
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
    name: 'QueryWrapper',
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
          title,
          synapseId,
          unitDescription,
          sql: 'SELECT study, dataType, assay, id AS file_id, consortium as program, grant, species, organ, tissue, cellType, fileFormat, specimenID FROM syn11346063',
          facetName: 'study',
          facetDisplayValue: 'Study',
          visibleColumnCount: 4,
        },
        {
          title,
          synapseId,
          unitDescription,
          sql:
            'SELECT species, dataType, id as file_id, consortium as program, grant, study, organ, tissue, cellType, assay, fileFormat, specimenID FROM syn11346063',
          facetName: 'species',
          facetDisplayValue: 'Species',
          visibleColumnCount: 3,
        },
        {
          title,
          synapseId,
          unitDescription,
          sql:
            'SELECT organ, tissue, dataType, assay, id AS file_id, consortium as program, grant, study, species, cellType, specimenID FROM syn11346063',
          facetName: 'organ',
          facetDisplayValue: 'Organ',
          visibleColumnCount: 5,
        },
        {
          title,
          synapseId,
          unitDescription,
          sql:
            'SELECT dataType, assay, study, id AS file_id, consortium as program, grant, species, organ, tissue, cellType, fileFormat, specimenID FROM syn11346063',
          facetName: 'dataType',
          facetDisplayValue: 'Data Type',
          visibleColumnCount: 4,
        },
        {
          title,
          synapseId,
          unitDescription,
          sql:
            'SELECT assay, fileFormat, id AS file_id, consortium as program, grant, study, species, organ, tissue, cellType, dataType, specimenID FROM syn11346063',
          facetName: 'assay',
          facetDisplayValue: 'Assay',
          visibleColumnCount: 4,
        },
        {
          title,
          synapseId,
          unitDescription,
          sql:
            'SELECT diagnosis, sex, dataType, assay, id as file_id, consortium as program, grant, study, species, organ, tissue, cellType, fileFormat, specimenID, anonymized_individualID FROM syn17024112',
          facetName: 'diagnosis',
          facetDisplayValue: 'Diagnosis',
          visibleColumnCount: 5,
        }
      ]
    }
  }
}

export default data
