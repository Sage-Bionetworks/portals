import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { projects, studies, data, people, programs, publications } from './homeExploreConfiguration'

const routes: GenericRoute [] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseObject: [
      {
        name: 'StackedBarChartControl',
        title: 'EXPLORE CONTENT',
        props: {
          queryWrapperConfigs: [
            projects.homePageSynapseObject.props,
            studies.homePageSynapseObject.props,
            data.homePageSynapseObject.props,
            people.homePageSynapseObject.props
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
    addOns: {
      colors: [
        '#6C5C97',
        '#E5AE4C',
        '#5BB0B5',
        '#5171C0',
        '#0F9488',
        '#D4689A',
      ]
    },
    routes: [
      {
        name: 'Programs',
        isNested: false,
        to: '/Explore/Programs',
        synapseObject: [
          programs
        ]
      },
      {
        name: 'Projects',
        isNested: false,
        to: '/Explore/Projects',
        synapseObject: [
          projects.explorePageSynapseObject
        ]
      },
      {
        name: 'Studies',
        isNested: false,
        to: '/Explore/Studies',
        synapseObject: [
          studies.explorePageSynapseObject
        ]
      },
      {
        name: 'Data',
        isNested: false,
        to: '/Explore/Data',
        synapseObject: [
          data.explorePageSynapseObject
        ]
      },
      {
        name: 'Publications',
        isNested: false,
        to: '/Explore/Publications',
        synapseObject: [
          publications
        ]
      },
      {
        name: 'People',
        isNested: false,
        to: '/Explore/People',
        synapseObject: [
          people.explorePageSynapseObject
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
