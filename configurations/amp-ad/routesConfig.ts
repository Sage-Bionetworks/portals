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
        props: {
          sql: 'SELECT * FROM syn17024173',
          type: SynapseConstants.AMP_CONSORTIUM
        }
      },
      {
        name: 'Markdown',
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
    name: 'Research Tools',
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
    name: 'Data Access',
    isNested: true,
    routes: [
      {
        name: 'Getting Access to Data',
        isNested: false,
        to: '/DataAcess/Instructions',
        synapseObject: [
          {
            name: 'Markdown',
            props: {
              ownerId: 'syn12666371',
              wikiId: '585317'
            }
          }
        ]
      },
      {
        name: 'Acknowleding Data Use',
        isNested: false,
        to: '/DataAccess',
        synapseObject: [
          {
            name: 'Markdown',
            props: {
              ownerId: 'syn2580853',
              wikiId: '584597'
            }
          }
        ]
      },
      {
        name: 'About',
        isNested: false,
        to: '/About',
        synapseObject: [
          {
            name: 'Markdown',
            props: {
              wikiId:'581939',
              ownerId:'syn12666371'
            }
          }
        ]
      }
    ]
  }
]

export default routes
