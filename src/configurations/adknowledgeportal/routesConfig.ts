import { GenericRoute } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import {
  projects,
  studies,
  data,
  people,
  programs,
  publications,
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
} from './synapseConfigs/projects'
import { results } from './synapseConfigs/results'
import { iconHeaderOptions } from './synapseConfigs/iconOptions'
import loadingScreen from './loadingScreen'
import { publicationProgrammatic } from './synapseConfigs/publications'
import { programCardConfiguration } from './synapseConfigs/programs'
import experimentalTools from './synapseConfigs/experimental_tools'
import computationalTools from './synapseConfigs/computational_tools'

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'StatefulButtonControlWrapper',
        title: 'EXPLORE CONTENT',
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
              name: 'Experimental Tools',
              synapseConfigArray: [experimentalTools.homePageSynapseObject],
            },
            {
              name: 'Computational Tools',
              synapseConfigArray: [computationalTools.homePageSynapseObject],
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
            '#D46D1E',
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
        isNested: true,
        to: '/Explore/Programs',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: {
                name: 'CardContainerLogic',
                props: {
                  ...programs,
                  sql: 'SELECT  * FROM syn17024173',
                },
              },
            },
          },
        ],
        routes: [
          {
            name: 'DetailsPage',
            isNested: false,
            to: '/Explore/Programs/DetailsPage',
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  loadingScreen,
                  sql: 'SELECT  * FROM syn17024173',
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
                },
              },
            ],
          },
        ],
      },
      {
        name: 'Projects',
        isNested: true,
        to: '/Explore/Projects',
        routes: [
          {
            name: 'DetailsPage',
            to: 'Explore/Projects/DetailsPage',
            isNested: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  sql: projectsSql,
                  isHeader: true,
                  ...projectCardConfiguration,
                  backgroundColor: '#DE9A1F',
                },
              },
              {
                name: 'CardContainerLogic',
                props: {
                  title: 'PEOPLE',
                  sql:
                    'SELECT ownerID as ownerId, firstName, lastName, institution FROM syn13897207',
                  type: SynapseConstants.MEDIUM_USER_CARD,
                },
              },
              {
                name: 'CardContainerLogic',
                title: 'STUDIES',
                props: {
                  ...studyCardConfiguration,
                  loadingScreen,
                  sql: studiesSql,
                },
              },
              publicationProgrammatic,
            ],
          },
        ],
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
      },
      {
        name: 'Studies',
        isNested: true,
        to: '/Explore/Studies',
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
            name: 'DetailsPage',
            to: 'Explore/Studies/DetailsPage',
            isNested: false,
            synapseConfigArray: studiesProgrammaticRouteConfig,
          },
        ],
      },
      {
        name: 'Data',
        isNested: false,
        to: '/Explore/Data',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
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
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
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
        name: 'Experimental Tools',
        isNested: false,
        to: '/Explore/Experimental Tools',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: experimentalTools.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        name: 'Computational Tools',
        isNested: false,
        to: '/Explore/Computational Tools',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: computationalTools.explorePageSynapseObject,
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
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
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
        to: '/DataAccess/DataUseCertificates',
        displayName: 'Data Use Certificates',
        isNested: false,
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
  // Uncomment to expose Contribute route (once research team is monitoring submissions)
  {
    name: 'Contribute',
    isNested: true,
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
          pathpart: '/Contribute/FormSubmission',
          formGroupId: '11',
          itemNoun: 'contribution-request',
          formClass: 'contribution-request',
        },
      },
    ],
    routes: [
      {
        isNested: false,
        to: '/Contribute/FormSubmission',
        hideRouteFromNavbar: true,
        name: 'FormSubmission',
        synapseConfigArray: [
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
    synapseConfigArray: news,
  },
]

export default routes
