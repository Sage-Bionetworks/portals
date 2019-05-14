import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
// import { publications, data } from './exploreHomeConfiguration'

const routes: GenericRoute [] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseObject: [
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
    // {
    //   name: 'Explore',
    //   isNested: true,
    //   routes: [
    //     {

    //     }
    //   ]
    // }
  },
  {
    name: 'ResearchTools',
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
    isNested: true,
    routes: [
      {
        name: 'Instructions',
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
