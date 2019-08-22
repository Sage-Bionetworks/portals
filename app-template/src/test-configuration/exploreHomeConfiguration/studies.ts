import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'

const sql = 'SELECT * FROM syn18483791'
const unitDescription = 'studies'

const rgbIndex = 0
const facet = 'tumorType'


const studySchema: GenericCardSchema = {
  type: SynapseConstants.STUDY,
  title: 'name',
  subTitle: 'centerName',
  description: 'description',
  secondaryLabels: [
    'Theme',
    'tumorType',
    'experimentalStrategy',
    'consortium',
    'grantType',
  ],
  link: 'id',
}

export const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      facet,
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
          facet: 'grantType',
        },
        {
          sql,
          facet: 'consortium',
        }
      ],
    },
  }
}
