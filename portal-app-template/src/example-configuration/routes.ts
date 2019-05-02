import { GenericRoute } from '../types/portal-config'

const routes: GenericRoute [] = [
  {
    name: 'About',
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
    isNested: true,
    routes: [
      {
        name: 'About',
        synapseObject: {
          title: 'About',
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
