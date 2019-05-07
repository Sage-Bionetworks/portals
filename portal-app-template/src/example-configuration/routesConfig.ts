import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { publications, data } from './exploreHomeConfiguration'

const routes: GenericRoute [] = [
  {
    isNested: false,
    name: 'About',
    to: '/About',
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
        isNested: false,
        to: '/Explore/Data',
        synapseObject: [{ ...data.explorePageSynapseObject }]
      },
      {
        name: 'Publication',
        isNested: false,
        to: '/Explore/Publication',
        synapseObject: [{ ...publications.homePageSynapseObject }]
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
