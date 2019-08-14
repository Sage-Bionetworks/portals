import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'

const sql = 'SELECT * FROM syn18483791'
const unitDescription = 'studies'

const rgbIndex = 0
const facetName = 'tumorType'


const studySchema: GenericCardSchema = {
  type: SynapseConstants.STUDY,
  title: 'name',
  subTitle: 'centerName',
  description: 'description',
  secondaryLabels: {
    0: { key: 'Theme' },
    1: { key: 'tumorType', alias: 'Disease' },
    2: { key: 'experimentalStrategy', alias: 'Assay' },
    3: { key: 'consortium', alias: 'Program' },
    4: { key: 'grantType', alias: 'Grant Type' },
  },
  link: 'id',
}

export const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      facetName,
      unitDescription,
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
      },
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
      cardConfiguration: {
        type: SynapseConstants.GENERIC_CARD,
        genericCardSchema: studySchema
      },
      name: 'Data',
      facetAliases: {
        grantType: 'Grant Type',
        consortium: 'Program',
      },
      menuConfig: [
        {
          sql,
          facetName: 'grantType',
        },
        {
          sql,
          facetName: 'consortium',
        }
      ],
    },
  }
}
