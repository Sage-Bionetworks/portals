import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'people'
const rgbIndex = 2
const sql = 'SELECT * FROM syn13897207'

const people: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      link: 'Explore/People',
      linkText: 'Explore People',
      facet: 'Program',
      sql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql,
      loadingScreen,
      name: 'People',
      shouldDeepLink: true,
      cardConfiguration: {
        type: SynapseConstants.MEDIUM_USER_CARD,
      },
    },
  },
}

export default people
