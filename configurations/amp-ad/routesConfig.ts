import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { projects, studies, data, people, programs, publications, tools, news } from './synapseConfigs'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import { studyCardProps } from './synapseConfigs/studies'
import { projectCardProps } from './synapseConfigs/projects'
import { iconHeaderOptions } from './synapseConfigs/programs/iconOptions'
import loadingScreen from './loadingScreen'
import iconAgoraSvg from './style/icon-agora.svg'

const routes: GenericRoute [] = [
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
            { name: 'Projects', synapseConfigArray: [projects.homePageSynapseObject] },
            { name: 'Studies', synapseConfigArray: [studies.homePageSynapseObject] },
            { name: 'Data', synapseConfigArray: [data.homePageSynapseObject] },
            { name: 'People', synapseConfigArray: [people.homePageSynapseObject] }
          ],
          colors: [
            '#E5AE4C',
            '#5BB0B5',
            '#5171C0',
            '#D4689A',
          ]
        }
      },
      {
        ...programs,
        title: 'PROGRAMS',
      },
      {
        name: 'Markdown',
        title: "WHAT'S NEW",
        props: {
          ownerId:'syn12666371',
          wikiId:'582408'
        }
      }
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
              synapseConfig: programs
            }
          }
        ],
        programmaticRouteConfig: [{
          name: 'CardContainerLogic',
          isOutsideContainer: true,
          props: {
            iconOptions: iconHeaderOptions,
            loadingScreen,
            sql: 'SELECT  * FROM syn17024173',
            isHeader: true,
            type: SynapseConstants.GENERIC_CARD,
            genericCardSchema: {
              type: 'Program',
              title: 'Full Name',
              subTitle: 'Short Description',
              icon: 'Program',
              description: 'Long Description',
            },
            backgroundColor: '#5960a5'
          }
        },
        {
          name: 'CardContainerLogic',
          title: 'Explore Projects',
          props: {
            loadingScreen,
            ...projectCardProps,
            sql: `SELECT  * FROM syn17024229`,
          }
        }
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
              sql: 'SELECT * FROM syn17024229',
              isHeader: true,
              type: SynapseConstants.GENERIC_CARD,
              genericCardSchema: {
                type: 'Project',
                title: 'Name',
                subTitle: 'Key Investigators',
                icon: 'icon',
                description: 'Abstract',
                secondaryLabels: [
                  'Grant Number',
                  'Key Data Contributors',
                  'Institutions',
                  'Program',
                ]
              },
              secondaryLabelLimit: 4,
              backgroundColor: '#DE9A1F'
            }
          },
          {
            name: 'CardContainerLogic',
            props: {
              title: 'PEOPLE',
              sql: 'SELECT ownerID as ownerId, firstName, lastName, institution FROM syn13897207',
              type: SynapseConstants.MEDIUM_USER_CARD
            }
          },
          {
            name: 'CardContainerLogic',
            title: 'STUDIES',
            props: studyCardProps
          },
        ],
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: projects.explorePageSynapseObject
            }
          }
        ]
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
              synapseConfig: studies.explorePageSynapseObject
            }
          }
        ]
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
              synapseConfig: data.explorePageSynapseObject
            }
          }
        ]
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
              synapseConfig: publications
            }
          }
        ]
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
              synapseConfig: people.explorePageSynapseObject
            }
          }
        ]
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
              synapseConfig: tools
            }
          }
        ]
      },
    ]
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
              wikiId: '585317'
            }
          }
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
              wikiId: '585318'
            }
          }
        ]
      },
      {
        name: 'AcknowledgementStatements',
        displayName: 'Acknowleding Data Use',
        isNested: false,
        to: '/DataAccess/AcknowledgementStatements',
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'ACKNOWLEDGEMENT STATEMENTS',
            props: {
              ownerId: 'syn2580853',
              wikiId: '584597'
            }
          }
        ]
      },
    ]
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
          wikiId:'581939',
          ownerId:'syn12666371'
        }
      }
    ]
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
          markdown:'The latest from the AMP-AD Community, including the latest data releases, updates such as events and stories, and links to the quartlery newsletter\n---------'
        }
      },
      news
    ]
  },
  {
    name: 'ExploreResults',
    displayName: 'Explore Results',
    icon: iconAgoraSvg,
    isNested: false,
    to: 'https://agora.ampadportal.org/genes',
    synapseConfigArray: []
  }
]

export default routes
