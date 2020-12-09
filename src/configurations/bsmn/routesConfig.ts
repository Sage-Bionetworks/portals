import { GenericRoute } from 'types/portal-config'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import projects, {
  projectCardConfiguration,
  projectsDetailsPageConfiguration,
} from './synapseConfigs/projects'
import studies, {
  studyCardConfiguration,
  studiesDetailPageConfiguration,
} from './synapseConfigs/studies'
import publications from './synapseConfigs/publications'
import tools from './synapseConfigs/tools'
import people from './synapseConfigs/people'
import { studiesSql, projectsSql } from './resources'
import {SynapseConstants} from "synapse-react-client";

const routes: GenericRoute[] = [
  {
    to: '',
    isNested: false,
    synapseConfigArray: [
      {
        title: 'About the Portal',
        centerTitle: true,
        name: 'Markdown',
        props: {
          ownerId: 'syn21645000',
        },
      },
      {
        name: 'Goals',
        outsideContainerClassName: 'home-spacer',
        props: {
          entityId: 'syn23021143',
        },
      },
      {
        name: 'UserCardListGroups',
        title: 'Grants and Principal Investigators',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer home-bg-dark',
        props: {
          sql: 'SELECT * FROM syn21781196 WHERE isFeatured=\'true\'',
          columnName: 'Project Title',
          facetValues: [
            'Somatic Mosaicism in the brain of Tourette syndrome',
            'Somatic Mosaicism in Schizophrenia and Control Brains',
            '1/3-Schizophrenia Genetics and Brain Somatic Mosaicism',
            '2/3-Schizophrenia Genetics and Brain Somatic Mosaicism',
            '3/3-Schizophrenia Genetics and Brain Somatic Mosaicism',
            'Role of brain somatic mosaicism in autism, schizophrenia, and bipolar disorder',
            'Mosaicism in focal cortical dysplasias spectrum seen in neuropsychiatric disease',
            '1/2-Somatic mosaicism and autism spectrum disorder',
            '2/2-Somatic mosaicism and autism spectrum disorder',
          ],
          size: SynapseConstants.MEDIUM_USER_CARD,
          useQueryResultUserData: true,
          summaryLinkText:'EXPLORE ALL PEOPLE',
          summaryLink: '/Explore/People',
          count: 6
        }
      },
      {
        title: 'Acknowledgement',
        centerTitle: true,
        name: 'Markdown',
        props: {
          ownerId: 'syn23308351',
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
            containerClassName: 'container-full-width',
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
        to: 'Data',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
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
            containerClassName: 'container-full-width',
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
            containerClassName: 'container-full-width',
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
            containerClassName: 'container-full-width',
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
