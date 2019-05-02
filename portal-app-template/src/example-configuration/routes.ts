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
        ownerId: '123',
        synapseId: '123'
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
            synapseId: '123'
          }
        }
      }
    ]
  }
]

export default routes
