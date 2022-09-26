import { GenericRoute } from 'types/portal-config'
import { programs, studies, data } from './synapseConfigs'
import RouteControlWrapperProps from './routeControlWrapperProps'
import { studyDetailPage } from './synapseConfigs/studies'
import { programDetailPage } from './synapseConfigs/programs'

const routes: GenericRoute[] = [
  {
    path: '',
    exact: true,
    synapseConfigArray: [
      {
        name: 'ARKWelcomePage',
        props: undefined,
        isOutsideContainer: true,
      },
      {
        name: 'Goals',
        outsideContainerClassName: 'home-spacer',
        props: {
          entityId: 'syn23021143',
        },
      },
    ],
  },
  {
    path: 'About',
    exact: true,
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'About',
        className: 'AboutPage',
        props: {
          ownerId: 'syn22130826',
        },
      },
    ],
  },
  {
    path: 'Data Access',
    exact: true,
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'Data Access',
        className: 'DataAccessPage',
        props: {
          ownerId: 'syn22130826',
        },
      },
    ],
  },
  {
    path: 'Explore',
    routes: [
      {
        path: 'Programs',
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                props: {
                  ...RouteControlWrapperProps,
                  synapseConfig: programs,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: false,
            synapseConfigArray: programDetailPage,
          },
        ],
      },
      {
        path: 'Studies',
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                props: {
                  ...RouteControlWrapperProps,
                  synapseConfig: studies,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: false,
            synapseConfigArray: studyDetailPage,
          },
        ],
      },
      {
        path: 'All Data',
        exact: true,
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            props: {
              ...RouteControlWrapperProps,
              synapseConfig: data,
            },
          },
        ],
      },
    ],
  },
  {
    exact: true,
    displayName: 'News',
    path: undefined,
    target: '_blank',
    link: 'https://parkportalnews.wpengine.com/',
    synapseConfigArray: [],
  },
  {
    exact: true,
    displayName: 'Help',
    path: undefined,
    target: '_blank',
    link: 'https://help.arkportal.synapse.org/doc/',
  },
]

export default routes
