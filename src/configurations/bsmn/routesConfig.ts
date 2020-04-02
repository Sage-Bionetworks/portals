import { GenericRoute } from 'types/portal-config'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import projects, {
  projectCardConfiguration,
  projectsSql,
  projectsEntityId,
  projectsDetailsPageConfiguration,
} from './synapseConfigs/projects'
import studies, {
  studyCardConfiguration,
  studiesSql,
  studiesEntityId,
  studiesDetailPageConfiguration,
} from './synapseConfigs/studies'
import publications from './synapseConfigs/publications'
import tools from './synapseConfigs/tools'
import people from './synapseConfigs/people'

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
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
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: 'Projects',
        to: '/Explore/Projects',
        isNested: true,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: projects.explorePageSynapseObject,
            },
          },
        ],
        routes: [
          {
            name: 'DetailsPage',
            isNested: false,
            to: 'Explore/Projects/DetailsPage',
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  ...projectCardConfiguration,
                  sql: projectsSql,
                  entityId: projectsEntityId,
                  isAlignToLeftNav: true,
                  secondaryLabelLimit: Infinity,
                  backgroundColor: '#5bb0b5',
                },
              },
              {
                name: 'GenerateComponentsFromRow',
                props: projectsDetailsPageConfiguration,
              },
            ],
          },
        ],
      },
      {
        name: 'Studies',
        to: '/Explore/Studies',
        isNested: true,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: studies.explorePageSynapseObject,
            },
          },
        ],
        routes: [
          {
            name: 'DetailsPage',
            to: '/Explore/Studies/DetailsPage',
            isNested: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  ...studyCardConfiguration,
                  sql: studiesSql,
                  entityId: studiesEntityId,
                  isAlignToLeftNav: true,
                  secondaryLabelLimit: Infinity,
                  backgroundColor: '#5bb0b5',
                },
              },
              {
                name: 'GenerateComponentsFromRow',
                props: studiesDetailPageConfiguration,
              },
            ],
          },
        ],
      },
      {
        name: 'Tools',
        to: '/Explore/Tools',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: tools.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        name: 'People',
        to: '/Explore/People',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: people.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        name: 'Publications',
        to: '/Explore/Publications',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: publications.explorePageSynapseObject,
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
          ownerId: 'syn21645000',
        },
      },
    ],
  },
]

export default routes
