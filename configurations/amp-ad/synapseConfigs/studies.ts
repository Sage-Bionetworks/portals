
import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'studies'
const rgbIndex = 0
const sql = 'SELECT * FROM syn17083367'
const facetName = 'Species'

export const studyCardProps =  {
  sql: 'SELECT Study, Study_Name, Data_Contributor, Access_Type, Study_Description, Model_System, Organism, Number_of_Individuals, Consortium FROM syn17083367',
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
      0: { key: 'Model_System', alias: 'MODEL' },
      1: { key: 'Organism', alias: 'Organism' },
      2: { key: 'Number_Of_Individuals', alias: 'INDIVIDUALS' },
      3: { key: 'Consortium', alias: 'PROGRAM' },
      4: { key: 'Grant', alias: 'GRANT' },
    }
  }
}

const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      facetName,
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
      name: 'Studies',
      isConsistent: true,
      cardConfiguration: {
        ...studyCardProps
      },
      menuConfig: [
        {
          sql,
          facetName,
        },
        {
          sql,
          facetName: 'Grant'
        },
        {
          sql,
          facetName: 'Consortium',
          facetAliases: {
            Consortium: 'Program',
          },
        }
      ]
    }
  }
}

export default studies
