import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { data } from './explore/data'
import { Publications } from './explore/publications'

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
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: 'Data',
        isNested: false,
        to: '/Explore/Data',
        synapseObject: [{
          title: 'Data',
          name: 'QueryWrapperMenuOverload',
          props: data.props,
          countQuery: data.countQuery
        }]
      },
      {
        name: 'Publications',
        isNested: false,
        to: '/Explore/Publications',
        synapseObject: [{
          title: 'Publications',
          name: 'QueryWrapperMenuOverload',
          props: { ...Publications },
          countQuery: Publications.countQuery
        }]
      }
    ]
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
    ]
  },
]

export default routes
