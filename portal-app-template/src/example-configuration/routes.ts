import { GenericRoute } from '../types/portal-config'

const routes: GenericRoute [] = [
  {
    isNested: false,
    name: 'About',
    to: '/About',
    synapseObject: {
      title: 'About',
      name: 'Markdown',
      props: {
        ownerId: 'syn7080714',
        wikiId: '470467'
      }
    }
  },
  {
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: 'Grants',
        isNested: false,
        to: '/Explore/Grants',
        synapseObject: {
          title: 'Grants',
          name: 'Markdown',
          props: {
            ownerId: '123',
            wikiId: '470467'
          }
        }
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
        synapseObject: {
          title: 'Grants',
          name: 'Markdown',
          props: {
            ownerId: 'syn18421331',
            wikiId: '590615'
          }
        }
      }
    ]
  },
]

export default routes
