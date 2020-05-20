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
    name: 'Participants',
    isNested: true,
    to: '/',
    routes: [
      {
        name: 'Uncategorized',
        to: '/Participants/Uncategorized',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: uncategorized,
            },
          },
        ],
      },
      {
        name: 'Selected',
        to: '/Participants/Selected',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: selected,
            },
          },
        ],
      },
      {
        name: 'Invited',
        to: '/Participants/Invited',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: invited,
            },
          },
        ],
      },
      {
        name: 'Hidden',
        to: '/Participants/Hidden',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: hidden,
            },
          },
        ],
      },
    ],
  },
]

export default routes
