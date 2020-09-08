import { GenericRoute } from 'types/portal-config'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import projects, {
  projectCardConfiguration,
  projectsSql,
  projectsDetailsPageConfiguration,
} from './synapseConfigs/projects'
import studies, {
  studyCardConfiguration,
  studiesSql,
  studiesDetailPageConfiguration,
} from './synapseConfigs/studies'
import publications from './synapseConfigs/publications'
import tools from './synapseConfigs/tools'
import people from './synapseConfigs/people'

const routes: GenericRoute[] = [
  {
    to: '',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn21645000',
        },
      },
      {
        name: 'RouteButtonControlWrapper',
        title: 'EXPLORE',
        props: {
          customRoutes: [
            'Projects',
            'Studies',
            'Tools',
            'People',
            'Publications',
          ],
          colors: ['#D46D1E', '#5BB0B5', '#58A148', '#47337D', '#109488'],
        },
      },
    ],
  },
  {
    to: 'Explore',
    isNested: true,
    routes: [
      {
        to: 'Projects',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: projects.explorePageSynapseObject,
            },
          },
        ],
        routes: [
          {
            isNested: false,
            to: 'DetailsPage',
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  ...projectCardConfiguration,
                  sql: projectsSql,
                  isAlignToLeftNav: true,
                  secondaryLabelLimit: Infinity,
                  backgroundColor: '#5bb0b5',
                },
              },
              {
                name: 'DetailsPage',
                props: projectsDetailsPageConfiguration,
              },
            ],
          },
        ],
      },
      {
        to: 'Studies',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: studies.explorePageSynapseObject,
            },
          },
        ],
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  ...studyCardConfiguration,
                  titleLinkConfig: undefined,
                  sql: studiesSql,
                  isAlignToLeftNav: true,
                  secondaryLabelLimit: Infinity,
                  backgroundColor: '#5bb0b5',
                },
              },
              {
                name: 'DetailsPage',
                props: studiesDetailPageConfiguration,
              },
            ],
          },
        ],
      },
      {
        to: 'Tools',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: tools.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        to: 'People',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: people.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        to: 'Publications',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: publications.explorePageSynapseObject,
            },
          },
        ],
      },
    ],
  },
  {
    to: 'About',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn21896405',
        },
      },
    ],
  },
]

export default routes
