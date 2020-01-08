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
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      isConsistent: true,
      name: 'Data',
      entityId,
      tableConfiguration: {
        title,
        visibleColumnCount: 4,
        showAccessColumn: true,
      },
      menuConfig: [
        {
          sql:
            'SELECT study, dataType, assay, id AS file_id, specimenID, individualID, diagnosis, sex, consortium as "Program", grant, species, organ, tissue, cellType, fileFormat FROM syn11346063',
          facet: 'study',
        },
        {
          sql:
            'SELECT species, dataType, id as file_id, specimenID, individualID, diagnosis, sex, consortium as "Program", grant, study as "Study", organ, tissue, cellType, assay, fileFormat FROM syn11346063',
          facet: 'species',
        },
        {
          sql:
            'SELECT organ, tissue, dataType, assay, id AS file_id, specimenID, individualID, diagnosis, sex, consortium as "Program", grant, study as "Study", species, cellType FROM syn11346063',
          facet: 'organ',
        },
        {
          sql:
            'SELECT dataType, assay, study as "Study", id AS file_id, specimenID, individualID, diagnosis, sex, consortium as "Program", grant, species, organ, tissue, cellType, fileFormat FROM syn11346063',
          facet: 'dataType',
        },
        {
          sql:
            'SELECT assay, fileFormat, id AS file_id, specimenID, individualID, diagnosis, sex, consortium as "Program", grant, study as "Study", species, organ, tissue, cellType, dataType  FROM syn11346063',
          facet: 'assay',
        },
        {
          sql:
            'SELECT diagnosis, sex, dataType, specimenID, individualID, id as file_id, assay, consortium as "Program", grant, species, organ, tissue, cellType, fileFormat FROM syn11346063 ORDER BY 1 DESC',
          facet: 'diagnosis',
        },
        {
          sql:
            'SELECT diagnosis, sex, dataType, assay, count(distinct(id)) as "Files", count(distinct(specimenID)) as "Specimens", count(distinct(individualID)) as "Individuals" FROM syn11346063 GROUP BY 1,2,3,4 ORDER BY 1 DESC',
          facet: 'individuals',
        },
      ],
    },
  },
}

export default data
