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
    name: 'Tools',
    to: '/Tools',
    isNested: false,
    synapseConfigArray: []
  },
]

export default routes
