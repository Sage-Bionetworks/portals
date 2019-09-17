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
  {
    name: 'Help',
    to: '/Help',
    isNested: true,
    routes: [
      {
        name: 'How It Works',
        to: '/Help/How It Works',
        isNested: false,
        synapseConfigArray: [{
          name: 'Markdown',
          title: 'How It Works',
          props: {
            ownerId: 'syn20717442',
            wikiId: '595391'
          }
        }]
      },
      {
        name: 'Data Requirements',
        to: '/Help/Data Requirements',
        isNested: false,
        synapseConfigArray: [{
          name: 'Markdown',
          title: 'Data Requirements',
          props: {
            ownerId: 'syn20717442',
            wikiId: '595544'
          }
        }]
      },
    ]
  },
]

export default routes
