import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { projects, studies, data, people, programs, publications } from './synapseConfigs'
import exploreButtonsConfiguration from './exploreButtonsConfiguration'
import { ampAd, move2Ad, modelAd, resilienceAd } from './synapseConfigs/programs/'

const routes: GenericRoute [] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseObject: [
      {
        name: 'HomeButtonControl',
        title: 'EXPLORE CONTENT',
        props: {
          configs: [
            { name: 'Projects', synapseObject: projects.homePageSynapseObject },
            { name: 'Studies', synapseObject: studies.homePageSynapseObject },
            { name: 'Data', synapseObject: data.homePageSynapseObject },
            { name: 'People', synapseObject: people.homePageSynapseObject }
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
        synapseObject: [
          {
            ...exploreButtonsConfiguration,
            props: {
              ...exploreButtonsConfiguration.props,
              synapseObjectSingle: programs
            }
          }
        ],
        routes: [
          {
            name: 'AMP-AD',
            isNested: false,
            to: '/Explore/Programs/AMP-AD',
            synapseObject: ampAd
          },
          {
            name: 'M2OVE-AD',
            isNested: false,
            to: '/Explore/Programs/M2OVE-AD',
            synapseObject: move2Ad
          },
          {
            name: 'MODEL-AD',
            isNested: false,
            to: '/Explore/Programs/MODEL-AD',
            synapseObject: modelAd
          },
          {
            name: 'Resilience-AD',
            isNested: false,
            to: '/Explore/Programs/AResilience-AD',
            synapseObject: resilienceAd
          },
        ]
      },
      {
        name: 'Projects',
        isNested: false,
        to: '/Explore/Projects',
        synapseObject: [
          {
            ...exploreButtonsConfiguration,
            props: {
              ...exploreButtonsConfiguration.props,
              synapseObjectSingle: projects.explorePageSynapseObject
            }
          }
        ]
      },
      {
        name: 'Studies',
        isNested: false,
        to: '/Explore/Studies',
        synapseObject: [
          {
            ...exploreButtonsConfiguration,
            props: {
              ...exploreButtonsConfiguration.props,
              synapseObjectSingle: studies.explorePageSynapseObject
            }
          }
        ]
      },
      {
        name: 'Data',
        isNested: false,
        to: '/Explore/Data',
        synapseObject: [
          {
            ...exploreButtonsConfiguration,
            props: {
              ...exploreButtonsConfiguration.props,
              synapseObjectSingle: data.explorePageSynapseObject
            }
          }
        ]
      },
      {
        name: 'Publications',
        isNested: false,
        to: '/Explore/Publications',
        synapseObject: [
          {
            ...exploreButtonsConfiguration,
            props: {
              ...exploreButtonsConfiguration.props,
              synapseObjectSingle: publications
            }
          }
        ]
      },
      {
        name: 'People',
        isNested: false,
        to: '/Explore/People',
        synapseObject: [
          {
            ...exploreButtonsConfiguration,
            props: {
              ...exploreButtonsConfiguration.props,
              synapseObjectSingle: people.explorePageSynapseObject
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
    synapseObject: [
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
        synapseObject: [
          {
            name: 'Markdown',
            title: 'GETTING ACCESS TO DATA',
            props: {
              ownerId: 'syn12666371',
              wikiId: '585317'
            }
          }
        ]
      },
      {
        name: 'Acknowleding-Data-Use',
        displayName: 'Acknowleding Data Use',
        isNested: false,
        to: '/DataAccess/Acknowleding-Data-Use',
        synapseObject: [
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
    synapseObject: [
      {
        name: 'Markdown',
        title: 'About',
        props: {
          wikiId:'581939',
          ownerId:'syn12666371'
        }
      }
    ]
  }
]

export default routes
