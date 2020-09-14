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
} from './synapseConfigs/studies'
import { projectCardConfiguration } from './synapseConfigs/projects'
import { results } from './synapseConfigs/results'
import { iconHeaderOptions } from './synapseConfigs/iconOptions'
import loadingScreen from './loadingScreen'
import { publicationProgrammatic } from './synapseConfigs/publications'
import { programCardConfiguration } from './synapseConfigs/programs'
import experimentalTools from './synapseConfigs/experimental_tools'
import computationalTools from './synapseConfigs/computational_tools'
import { projectsSql, studiesSql } from './resources'

const routes: GenericRoute[] = [
  {
    to: '',
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
    to: 'Explore',
    isNested: true,
    routes: [
      {
        isNested: true,
        to: 'Programs',
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
            isNested: false,
            to: 'DetailsPage',
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
        isNested: true,
        to: 'Projects',
        routes: [
          {
            to: 'DetailsPage',
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
        isNested: true,
        to: 'Studies',
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
            synapseConfigArray: studiesProgrammaticRouteConfig,
          },
        ],
      },
      {
        isNested: false,
        to: 'Data',
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
        isNested: false,
        to: 'Publications',
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
        isNested: false,
        to: 'People',
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
        isNested: false,
        to: 'Experimental Tools',
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
        isNested: false,
        to: 'Computational Tools',
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
        isNested: false,
        to: 'Results',
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
    isNested: false,
    to: 'Analytical Workspace',
    synapseConfigArray: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn22300949',
          wikiId: '604940',
        },
      },
    ],
  },
  {
    to: 'DataAccess',
    displayName: 'Data Access',
    isNested: true,
    routes: [
      {
        displayName: 'Getting Access to Data',
        isNested: false,
        to: 'Instructions',
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
        to: 'DataUseCertificates',
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
        displayName: 'Acknowledging Data Use',
        isNested: false,
        to: 'AcknowledgementStatements',
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
      {
        displayName: 'Data Use Proposals',
        isNested: false,
        to: 'DataUseProposals',
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'DATA USE PROPOSALS',
            props: {
              ownerId: 'syn2580853',
              wikiId: '409843',
            },
          },
        ],
      },
    ],
  },
  // Uncomment to expose Contribute route (once research team is monitoring submissions)
  {
    isNested: true,
    to: 'Contribute',
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
        to: 'FormSubmission',
        hideRouteFromNavbar: true,
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
    isNested: false,
    to: 'About',
    hideRouteFromNavbar: true,
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
    to: 'News',
    isNested: false,
    synapseConfigArray: news,
  },
  {
    to: 'Help',
    isNested: true,
    synapseConfigArray: news,
    routes: [
      {
        isNested: false,
        to: 'FAQ',
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'FAQ',
            props: {
              ownerId: 'syn12666371',
              wikiId: '605050',
            },
          },
        ],
      },
      {
        isNested: false,
        displayName: 'Forum',
        to: undefined,
        link: 'https://www.synapse.org/#!Synapse:syn2580853/discussion/default',
        synapseConfigArray: [],
      },
      {
        isNested: false,
        displayName: 'Contact Us',
        to: undefined,
        link: 'mailto:ampadportal@sagebionetworks.org',
        synapseConfigArray: [],
      },
    ],
  },
]

export default routes
