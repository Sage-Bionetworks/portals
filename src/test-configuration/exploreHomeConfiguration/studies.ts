import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
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
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      facet,
      unitDescription,
      sql,
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
      entityId: 'syn18483791',
      cardConfiguration: {
        type: SynapseConstants.GENERIC_CARD,
        genericCardSchema: studySchema,
      },
      name: 'Data',
      facetAliases: {
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
        },
      ],
    },
  },
}
