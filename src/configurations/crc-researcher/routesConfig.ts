import { GenericRoute } from 'types/portal-config'
import { uncategorized, selected, invited, hidden } from './synapseConfigs'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import { baseDataSql, allFacetsToPlot } from './synapseConfigs/uncategorized'

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
        name: '1. Uncategorized',
        to: '/Explore/1. Uncategorized',
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
        name: '2. Selected',
        to: '/Explore/2. Selected',
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
        name: '3. Invited',
        to: '/Explore/3. Invited',
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
