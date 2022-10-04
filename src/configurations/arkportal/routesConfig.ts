import { GenericRoute } from 'types/portal-config'
import { programs, projects, data, datasets, datasetCollections } from './synapseConfigs'
import RouteControlWrapperProps from './routeControlWrapperProps'
import { projectDetailPage } from './synapseConfigs/projects'
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
          entityId: 'syn38103451',
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
          ownerId: 'syn26710600',
          wikiId: '619467'
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
          ownerId: 'syn26710600',
          wikiId: '619468'
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
        path: 'Projects',
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
                  synapseConfig: projects,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: false,
            synapseConfigArray: projectDetailPage,
          },
        ],
      },
      {
        path: 'Collections',
        exact: true,
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            className: 'CollectionList',
            props: {
              ...RouteControlWrapperProps,
              synapseConfig: datasetCollections,
            },
          },
        ],
      },
      {
        path: 'Datasets',
        exact: true,
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            props: {
              ...RouteControlWrapperProps,
              synapseConfig: datasets,
            },
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
