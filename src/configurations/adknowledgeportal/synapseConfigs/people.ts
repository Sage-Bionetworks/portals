import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { peopleSql } from '../resources'

const unitDescription = 'people'
const rgbIndex = 2

const people: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      link: 'Explore/People',
      linkText: 'Explore People',
      facet: 'Program',
      sql: peopleSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: peopleSql,
      name: 'People',
      shouldDeepLink: true,
      cardConfiguration: {
        type: SynapseConstants.MEDIUM_USER_CARD,
      },
      searchConfiguration: {
        searchable: [
          'firstName',
          'lastName',
          'institution',
          'Program',
          'Grant Number',          
        ],
      },
    },
  },
}

export default people
