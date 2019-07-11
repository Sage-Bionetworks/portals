import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { publications, data } from './exploreHomeConfiguration'

// Constants used for testing
export const ABOUT_INDEX =  3
export const EXPLORE_INDEX = 1
export const ORGANIZATION_INDEX = 2
export const HOME_INDEX = 0

const routes: GenericRoute [] = []

routes[ABOUT_INDEX] = {
  isNested: false,
  name: 'About',
  to: '/About',
  synapseConfigArray: [{
    title: 'About',
    name: 'Markdown',
    props: {
      ownerId: 'syn7080714',
      wikiId: '470467'
    }
  }]
}

routes[EXPLORE_INDEX] = {
  name: 'Explore',
  isNested: true,
  routes: [
    {
      name: 'Data',
      isNested: false,
      to: '/Explore/Data',
      synapseConfigArray: [data.explorePageSynapseObject]
    },
    {
      name: 'Publications',
      isNested: false,
      to: '/Explore/Publications',
      synapseConfigArray: [publications.explorePageSynapseObject]
    }
  ],
},

routes[ORGANIZATION_INDEX] = {
  name: 'Organizations',
  isNested: true,
  routes: [
    {
      name: 'Content',
      isNested: true,
      to: '/Organizations/Content',
      synapseConfigArray: [
        {
          title: 'Grants',
          name: 'Markdown',
          props: {
            ownerId: 'syn18421331',
            wikiId: '590615'
          }
        },
        {
          title: 'Cards',
          name: 'CardContainerLogic',
          props: {
            type: SynapseConstants.CSBC_DATASET,
            sql: `SELECT * FROM syn18488466 WHERE ( ( "featured" = 'TRUE' ) )`
          }
        }
      ],
      routes: [
        {
          name: 'Subcontent',
          isNested: false,
          to: '/Organizations/Content/Subcontent',
          synapseConfigArray: [{
            name: 'Markdown',
            props: {
              ownerId: 'syn18421331',
              wikiId: '590615'
            }
          }],
        }
      ]
    }
  ],
},

routes[HOME_INDEX] = {
  name: 'Home',
  to: '/',
  isNested: false,
  synapseConfigArray: [
    {
      title: 'Explore Portal',
      name: 'StatefulButtonControlWrapper',
      props: {
        configs: [
          data.homePageSynapseObject.props,
          publications.homePageSynapseObject.props
        ],
        colors: [
          'green',
          'blue'
        ]
      },
    },
    {
      title: 'Explore Cards',
      name: 'CardContainerLogic',
      link: '/Explore/Data',
      props: {
        sql: 'SELECT * FROM syn9630847',
        type: SynapseConstants.CSBC_DATASET,
        limit: 3
      },
    },
    {
      title: 'Some Markdown',
      name: 'Markdown',
      props: {
        ownerId: 'syn7080714',
        wikiId: '470467',
      }
    }
  ]
}

export default routes
