import { GenericRoute } from '../types/portal-config'

const routes: GenericRoute [] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'Title',
        props: {
          ownerId: 'syn20717442',
          wikiId: '595390'
        }
      }
    ]
  },
  // TODO: Put in drug nomination tool below
  {
    name: 'Apply',
    to: '/Apply',
    isNested: false,
    synapseConfigArray: []
  },
  // TODO: Put in drug nomination tool below
  {
    name: 'Help',
    to: '/Help',
    isNested: false,
    synapseConfigArray: []
  },
]

export default routes
