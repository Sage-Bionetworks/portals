import { GenericRoute } from 'types/portal-config'
import { uncategorized, selected, invited, hidden } from './synapseConfigs'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [],
  },
  {
    name: 'Explore',
    isNested: true,
    to: '/',
    routes: [
      {
        name: 'Uncategorized',
        to: '/Explore/Uncategorized',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: uncategorized,
            },
          },
        ],
      },
      {
        name: 'Selected',
        to: '/Explore/Selected',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: selected,
            },
          },
        ],
      },
      {
        name: 'Invited',
        to: '/Explore/Invited',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: invited,
            },
          },
        ],
      },
      {
        name: 'Hidden',
        to: '/Explore/Hidden',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: hidden,
            },
          },
        ],
      },
    ],
  },
]

export default routes
