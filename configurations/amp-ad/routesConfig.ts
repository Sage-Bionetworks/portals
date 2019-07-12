import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { projects, studies, data, people, programs, publications } from './synapseConfigs'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import { ampAd, move2Ad, modelAd, resilienceAd } from './synapseConfigs/programs/'
import { studyCardProps } from './synapseConfigs/studies'
// @ts-ignore
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
        name: 'CardContainerLogic',
        title: 'PROGRAMS',
        props: {
          sql: 'SELECT * FROM syn17024173',
          type: SynapseConstants.AMP_CONSORTIUM
        }
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
        isNested: true,
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
        routes: [
          {
            name: 'AMP-AD',
            isNested: false,
            to: '/Explore/Programs/AMP-AD',
            synapseConfigArray: ampAd
          },
          {
            name: 'M2OVE-AD',
            isNested: false,
            to: '/Explore/Programs/M2OVE-AD',
            synapseConfigArray: move2Ad
          },
          {
            name: 'MODEL-AD',
            isNested: false,
            to: '/Explore/Programs/MODEL-AD',
            synapseConfigArray: modelAd
          },
          {
            name: 'Resilience-AD',
            isNested: false,
            to: '/Explore/Programs/Resilience-AD',
            synapseConfigArray: resilienceAd
          },
        ]
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
                secondaryLabels: {
                  0: { key: 'Grant Number', alias: 'GRANT' },
                  1: { key: 'Key Data Contributors', alias: 'KEY DATA CONTRIBUTORS' },
                  2: { key: 'Institutions', alias: 'INSTITUTIONS' },
                  3: { key: 'Program', alias: 'PROGRAM' },
                }
              },
              secondaryLabelLimit: 4,
              backgroundColor: '#DE9A1F'
            }
          },
          {
            name: 'CardContainerLogic',
            title: 'People',
            props: {
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
      }
    ]
  },
  {
    name: 'ResearchTools',
    displayName: 'Research Tools',
    to: '/ResearchTools',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'Research Tools',
        props: {
          ownerId:'syn2580853',
          wikiId:'409845'
        }
      }
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
    name: 'ExploreResults',
    displayName: 'Explore Results',
    icon: iconAgoraSvg,
    isNested: false,
    to: 'https://agora.ampadportal.org/genes',
    synapseConfigArray: []
  }
]

export default routes
