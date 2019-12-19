import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import {
  projects,
  studies,
  data,
  people,
  programs,
  publications,
  tools,
  news,
} from './synapseConfigs'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import {
  studyCardConfiguration,
  studiesProgrammaticRouteConfig,
  studiesSql,
} from './synapseConfigs/studies'
import {
  projectCardConfiguration,
  projectsSql,
  projectsEntityId,
} from './synapseConfigs/projects'
import { results } from './synapseConfigs/results'
import { iconHeaderOptions } from './synapseConfigs/programs/iconOptions'
import loadingScreen from './loadingScreen'
import { publicationProgrammatic } from './synapseConfigs/publications'
import {
  programCardConfiguration,
  programEntityId,
} from './synapseConfigs/programs'
import { studiesEntityId } from './synapseConfigs/studies'

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'StatefulButtonControlWrapper',
        title: 'EXPLORE CONTENT',
        containerClassName: 'home-explore-container',
        props: {
          configs: [
            {
              name: 'Projects',
              synapseConfigArray: [projects.homePageSynapseObject],
            },
            {
              name: 'Studies',
              synapseConfigArray: [studies.homePageSynapseObject],
            },
            { name: 'Data', synapseConfigArray: [data.homePageSynapseObject] },
            {
              name: 'Publications',
              synapseConfigArray: [publications.homePageSynapseObject],
            },
            {
              name: 'People',
              synapseConfigArray: [people.homePageSynapseObject],
            },
            {
              name: 'Tools',
              synapseConfigArray: [tools.homePageSynapseObject],
            },
            { name: 'Results', synapseConfigArray: [results] },
          ],
          colors: [
            '#E5AE4C',
            '#5BB0B5',
            '#407BA0',
            '#0F9488',
            '#D4689A',
            '#3C4A63',
            '#407BA0',
          ],
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'PROGRAMS',
        props: {
          ...programs,
          sql: 'SELECT * FROM syn17024173',
          entityId: 'syn17024173',
        },
      },
      {
        name: 'Markdown',
        title: "WHAT'S NEW",
        className: 'whats-new',
        props: {
          ownerId: 'syn12666371',
          wikiId: '582408',
        },
      },
    ],
  },
  {
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: 'Programs',
        isNested: false,
        to: '/Explore/Programs',
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: {
                name: 'CardContainerLogic',
                props: {
                  ...programs,
                  sql: 'SELECT  * FROM syn17024173',
                  entityId: programEntityId,
                },
              },
            },
          },
        ],
        programmaticRouteConfig: [
          {
            name: 'CardContainerLogic',
            isOutsideContainer: true,
            props: {
              loadingScreen,
              sql: 'SELECT  * FROM syn17024173',
              entityId: programEntityId,
              isHeader: true,
              ...programCardConfiguration,
              genericCardSchema: {
                ...programCardConfiguration.genericCardSchema!,
                description: 'Long Description',
              },
              iconOptions: iconHeaderOptions,
              backgroundColor: '#5960A5',
            },
          },
          {
            name: 'CardContainerLogic',
            title: 'Explore Projects',
            props: {
              ...projectCardConfiguration,
              sql: projectsSql,
              entityId: projectsEntityId,
            },
          },
        ],
      },
      {
        name: 'Projects',
        isNested: false,
        to: '/Explore/Projects',
        programmaticRouteConfig: [
          {
            name: 'CardContainerLogic',
            isOutsideContainer: true,
            props: {
              sql: projectsSql,
              isHeader: true,
              ...projectCardConfiguration,
              entityId: projectsEntityId,
              backgroundColor: '#DE9A1F',
            },
          },
          {
            name: 'CardContainerLogic',
            props: {
              title: 'PEOPLE',
              sql:
                'SELECT ownerID as ownerId, firstName, lastName, institution FROM syn13897207',
              entityId: 'syn13897207',
              type: SynapseConstants.MEDIUM_USER_CARD,
            },
          },
          {
            name: 'CardContainerLogic',
            title: 'STUDIES',
            props: {
              ...studyCardConfiguration,
              loadingScreen,
              entityId: studiesEntityId,
              sql: studiesSql,
            },
          },
          publicationProgrammatic,
        ],
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
        isNested: false,
        to: '/Explore/Studies',
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: studies.explorePageSynapseObject,
            },
          },
        ],
        programmaticRouteConfig: studiesProgrammaticRouteConfig,
      },
      {
        name: 'Data',
        isNested: false,
        to: '/Explore/Data',
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: data.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        name: 'Publications',
        isNested: false,
        to: '/Explore/Publications',
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
        name: 'People',
        isNested: false,
        to: '/Explore/People',
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
        name: 'Tools',
        isNested: false,
        to: '/Explore/Tools',
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
        name: 'Results',
        isNested: false,
        to: '/Explore/Results',
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: results,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'DataAccess',
    displayName: 'Data Access',
    isNested: true,
    routes: [
      {
        name: 'Instructions',
        displayName: 'Getting Access to Data',
        isNested: false,
        to: '/DataAccess/Instructions',
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'GETTING ACCESS TO DATA',
            props: {
              ownerId: 'syn12666371',
              wikiId: '585317',
            },
          },
        ],
      },
      {
        name: 'DataUseCertificates',
        displayName: 'Data Use Certificates',
        to: '/DataAccess/DataUseCertificates',
        isNested: false,
        hideRouteFromNavbar: true,
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'Data Use Certificates',
            props: {
              ownerId: 'syn12666371',
              wikiId: '585318',
            },
          },
        ],
      },
      {
        name: 'AcknowledgementStatements',
        displayName: 'Acknowledging Data Use',
        isNested: false,
        to: '/DataAccess/AcknowledgementStatements',
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'ACKNOWLEDGEMENT STATEMENTS',
            props: {
              ownerId: 'syn2580853',
              wikiId: '584597',
            },
          },
        ],
      },
    ],
  },
  {
    name: 'Contribute',
    isNested: false,
    to: '/Contribute',
    synapseConfigArray: [
      {
        name: 'Markdown',
        className: 'amp-project-component',
        props: {
          ownerId: 'syn12666371',
          wikiId: '600033',
        },
      },
      {
        name: 'SynapseFormSubmissionsGrid',
        props: {
          pathpart: '#/Contribute',
          formGroupId: '11',
          itemNoun: 'contribution-request',
          formClass: 'contribution-request',
        },
      },
    ],
    programmaticRouteConfig: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn12666371',
          wikiId: '600034',
        },
      },
      {
        name: 'SynapseFormWrapper',
        props: {
          formSchemaEntityId: 'syn20692910',
          fileNamePath: 'study.submission_name',
          formUiSchemaEntityId: 'syn20692911',
          formNavSchemaEntityId: 'syn20968007',
          isWizardMode: true,
          formTitle: 'Your Contribution Request',
          formClass: 'contribution-request',
        },
      },
    ],
  },
  {
    name: 'About',
    isNested: false,
    to: '/About',
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'About',
        props: {
          wikiId: '581939',
          ownerId: 'syn12666371',
        },
      },
    ],
  },
  {
    name: 'News',
    to: '/News',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'News',
        props: {
          markdown:
            'The latest from the AMP-AD Community, including the latest data releases, updates such as events and stories, and links to the quarterly newsletter\n---------',
        },
      },
      news,
    ],
  },
]

export default routes
