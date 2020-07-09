import { GenericRoute } from 'types/portal-config'
import { uncategorized, potential, invited, scheduled, tested, hidden } from './synapseConfigs'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'ParticipantsBarPlot',
        isOutsideContainer: true,
        props: {
        }
      }
    ],
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
        name: '2. Potential',
        to: '/Explore/2. Potential',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: potential,
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
        name: '4. Scheduled',
        to: '/Explore/4. Scheduled',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: scheduled,
            },
          },
        ],
      },
      {
        name: '5. Tested',
        to: '/Explore/5. Tested',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: tested,
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
