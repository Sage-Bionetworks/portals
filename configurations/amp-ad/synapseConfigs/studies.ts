import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'studies'
const rgbIndex = 0
const sql = 'SELECT * FROM syn17083367'
const facet = 'Species'

export const studyCardProps =  {
  sql: 'SELECT * FROM syn17083367',
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: SynapseConstants.STUDY,
    secondaryLabelLimit: 4,
    title: 'Study_Name',
    subTitle: 'Data_Contributor',
    icon: 'Access_Type',
    link: 'Study',
    description: 'Study_Description',
    secondaryLabels: {
      0: { key: 'DataType_All', alias: 'Data Types' },
      1: { key: 'Diagnosis_or_Model_System', alias: 'Diagnosis' },
      2: { key: 'Number_Of_Individuals', alias: 'Individuals' },
      3: { key: 'Sample_Type', alias: 'Tissue' },
      4: { key: 'Species' },
      5: { key: 'Cohort_Type', alias: 'Cohort Type' },
      6: { key: 'Study_Status', alias: 'Study Status' },
      7: { key: 'Consortium', alias: 'Program' },
      8: { key: 'Grant' }
    }
  }
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
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      name: 'Studies',
      isConsistent: true,
      cardConfiguration: {
        ...studyCardProps
      },
      facetAliases: {
        Consortium: 'Program',
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
