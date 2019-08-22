import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'studies'
const rgbIndex = 0
const sql = 'SELECT * FROM syn17083367'
const facet = 'Species'

export const studyCardProps =  {
  sql,
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: SynapseConstants.STUDY,
    secondaryLabelLimit: 4,
    title: 'Study_Name',
    subTitle: 'Data_Contributor',
    icon: 'Access_Type',
    link: 'Study',
    description: 'Study_Description',
    secondaryLabels: [
      'DataType_All',
      'Diagnosis_or_Model_System',
      'Number_Of_Individuals',
      'Sample_Type',
      'Species',
      'Cohort_Type',
      'Study_Status',
      'Consortium',
      'Grant'
    ]
  }
}

const facetAliases = {
  Consortium: 'Program',
  DataType_All: 'Data Types',
  Diagnosis_or_Model_System: 'Diagnosis',
  Number_of_Individuals: 'Individuals',
  Sample_Type: 'Tissue'
}

const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      facet,
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
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
      facetAliases,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      name: 'Studies',
      isConsistent: true,
      cardConfiguration: {
        ...studyCardProps
      },
      searchConfiguration: {
        searchable: [
          {
            columnName: 'Consortium',
            hintText: 'AMP-AD'
          },
          {
            columnName: 'Data_Contributor',
            hintText: 'LastName'
          },
          {
            columnName: 'DataType_All',
            hintText: 'Gene Expression'
          },
          {
            columnName: 'Diagnosis_or_Model_System',
            hintText: 'LOAD'
          },
          {
            columnName: 'Grant',
            hintText: 'U01AG046139'
          },
          {
            columnName: 'Sample_Type',
            hintText: 'Temporal Cortex'
          },
          {
            columnName: 'Species',
            hintText: 'Drosophila'
          },
          {
            columnName: 'Study_Description',
            hintText: 'RNAseq'
          },
          {
            columnName: 'Study_Name',
            hintText: 'Mayo'
          },
        ]
      },
      menuConfig: [
        {
          sql,
          facet,
        },
        {
          sql,
          facet: 'Grant'
        },
        {
          sql,
          facet: 'Consortium',
        }
      ]
    }
  }
}

export default studies
