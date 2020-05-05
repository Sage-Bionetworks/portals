import { GenericRoute } from 'types/portal-config'
import {
  files,
  studies,
} from './synapseConfigs'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
    ],
  },
  {
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: 'Files',
        to: '/Explore/Files',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: files.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        name: 'Studies',
        to: '/Explore/Studies',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: studies.explorePageSynapseObject,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'About',
    to: '/About',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn7080714',
          wikiId: '470467',
        },
      },
    ],
  },
]

export default routes
