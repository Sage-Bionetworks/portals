import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { publications, data } from './exploreHomeConfiguration'

const routes: GenericRoute [] = [
  {
    isNested: false,
    name: 'About',
    to: '/About',
    type: 'Route',
    synapseObject: [{
      title: 'About',
      name: 'Markdown',
      props: {
        ownerId: 'syn7080714',
        wikiId: '470467'
      }
    }]
  },
  {
    // Explore route is a special case
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: 'Data',
        type: 'ExploreRoute',
        isNested: false,
        to: '/Explore/Data',
        homePageSynapseObject: data.homePageSynapseObject,
        explorePageSynapseObject: data.explorePageSynapseObject
      },
      {
        name: 'Publication',
        type: 'ExploreRoute',
        isNested: false,
        to: '/Explore/Publication',
        homePageSynapseObject: publications.homePageSynapseObject,
        explorePageSynapseObject: publications.explorePageSynapseObject
      }
    ],
  },
  {
    name: 'Organizations',
    isNested: true,
    routes: [
      {
        name: 'Organization-CTF',
        isNested: false,
        to: '/Organizations/Organization-CTF',
        type: 'Route',
        synapseObject: [
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
        ]
      }
    ],
  },
  {
    name: 'Home',
    type: 'Route',
    to: '/',
    isNested: false,
    synapseObject: [
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
]

export default routes
