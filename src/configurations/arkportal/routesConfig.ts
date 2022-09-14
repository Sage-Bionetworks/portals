import { GenericRoute } from 'types/portal-config'
import { publications, studies, data, tools } from './synapseConfigs'
import RouteControlWrapperProps from './routeControlWrapperProps'
import { studyDetailPage } from './synapseConfigs/studies'
import { toolsDetailsLandingPage } from './synapseConfigs/tools'

const routes: GenericRoute[] = [
  {
    path: '',
    exact: true,
    synapseConfigArray: [
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
        path: 'Collections',
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
        path: 'Data',
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
      {
        path: 'Tools',
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
                  synapseConfig: tools,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            synapseConfigArray: toolsDetailsLandingPage,
          },
        ],
      },
      {
        path: 'Publications',
        exact: true,
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            props: {
              ...RouteControlWrapperProps,
              synapseConfig: publications,
            },
          },
        ],
      },
    ],
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
