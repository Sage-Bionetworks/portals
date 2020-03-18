import { GenericRoute } from 'types/portal-config'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import projects from './synapseConfigs/projects'
import studies from './synapseConfigs/studies'
import publications from './synapseConfigs/publications'
import tools from './synapseConfigs/tools'
import individuals from './synapseConfigs/individuals'

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'StatefulButtonControlWrapper',
        title: 'EXPLORE PORTAL',
        props: {
          colors: ['#F06531', '#48ACDD', '#154C9A', '#96C647', '#F4A632'],
          configs: [
            {
              name: 'Projects',
              synapseConfigArray: [projects.homePageSynapseObject],
            },
            {
              name: 'Studies',
              synapseConfigArray: [studies.homePageSynapseObject],
            },
            {
              name: 'Publications',
              synapseConfigArray: [publications.homePageSynapseObject],
            },
            {
              name: 'Tools',
              synapseConfigArray: [tools.homePageSynapseObject],
            },
            {
              name: 'Individuals',
              synapseConfigArray: [individuals.homePageSynapseObject],
            },
          ],
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
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: projects.explorePageSynapseObject,
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
        name: 'Individuals',
        to: '/Explore/Individuals',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: individuals.explorePageSynapseObject,
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
          ownerId: 'syn4921369',
          wikiId: '235539',
        },
      },
    ],
  },
]

export default routes
