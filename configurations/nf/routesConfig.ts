import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { datasets, files, studies, publications, tools, funders } from './homeExploreConfiguration'
import { studiesSql } from './homeExploreConfiguration/studies'
import { datasetsSql } from './homeExploreConfiguration/datasets'
import { publicationsSql } from './homeExploreConfiguration/publications'
import exploreButtonControlProps from './exploreButtonControlProps'

const limit = 3

const routes: GenericRoute [] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseObject: [
      {
        name: 'HomeButtonControl',
        title: 'EXPLORE PORTAL',
        props: {
          colors: [
            '#119488',
            '#58A058',
            '#407BA0',
            '#5BB0B5',
          ],
          configs: [
            {
              name: 'Datasets', synapseObjectSingle: datasets.homePageSynapseObject
            },
            {
              name: 'Files', synapseObjectSingle: files.homePageSynapseObject
            },
            {
              name: 'Studies', synapseObjectSingle: studies.homePageSynapseObject
            },
            {
              name: 'Publications', synapseObjectSingle: publications.homePageSynapseObject
            }
          ]
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'NEW STUDIES',
        link: '/Explore/Studies',
        props: {
          limit,
          sql: studiesSql,
          type: SynapseConstants.STUDY
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'NEW PUBLICATIONS',
        link: '/Explore/Publications',
        props: {
          limit,
          sql: publicationsSql,
          type: SynapseConstants.PUBLICATION
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'New Datasets',
        link: '/Explore/Datasets',
        props: {
          limit,
          sql: datasetsSql,
          type: SynapseConstants.DATASET
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'TOOLS',
        link: '/Explore/Tools',
        props: {
          limit,
          sql: tools.sql,
          type: tools.type
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'ORGANIZATIONS',
        props: {
          limit,
          sql: funders.sql,
          type: funders.type
        }
      }
    ]
  },
  {
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: 'Datasets',
        isNested: false,
        to: '/Explore/Datasets',
        synapseObject: [
          {
            name: 'ExploreButtonControl',
            props: {
              ...exploreButtonControlProps,
              synapseObjectSingle: datasets.explorePageSynapseObject
            }
          }
        ]
      },
      {
        name: 'Files',
        isNested: false,
        to: '/Explore/Files',
        synapseObject: [
          {
            name: 'ExploreButtonControl',
            props: {
              ...exploreButtonControlProps,
              synapseObjectSingle: files.explorePageSynapseObject
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
            name: 'ExploreButtonControl',
            props: {
              ...exploreButtonControlProps,
              synapseObjectSingle: studies.explorePageSynapseObject
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
            name: 'ExploreButtonControl',
            props: {
              ...exploreButtonControlProps,
              synapseObjectSingle: publications.explorePageSynapseObject
            }
          }
        ]
      }
    ]
  },
  {
    name: 'Organizations',
    isNested: true,
    routes: [
      {
        name: 'CTF',
        to: '/Organizations/CTF',
        isNested: false,
        synapseObject: [
          {
            name: 'CardContainerLogic',
            props: {
              limit: 1,
              sql: "SELECT * FROM syn16858699 WHERE abbreviation = 'CTF'",
              type: funders.type
            },
            title: "Children's Tumor Foundation"
          },
          {
            name: 'CardContainerLogic',
            props: {
              sql: "SELECT * FROM syn16787123 WHERE fundingAgency = 'CTF'",
              type: SynapseConstants.STUDY
            },
            title: 'Funded Studies'
          },
          {
            name: 'CardContainerLogic',
            props: {
              sql: "SELECT * FROM syn16857542 WHERE fundingAgency = 'CTF'",
              type: SynapseConstants.PUBLICATION
            },
            title: 'NEW PUBLICATIONS'
          },
          {
            name: 'CardContainerLogic',
            props: {
              sql: "SELECT * FROM syn16859580 WHERE fundingAgency = 'CTF'",
              type: SynapseConstants.DATASET
            },
            title: 'DATASETS'
          },
        ]
      },
      {
        name: 'NTAP',
        to: '/Organizations/NTAP',
        isNested: false,
        synapseObject: [
          {
            name: 'CardContainerLogic',
            props: {
              limit: 1,
              sql: "SELECT * FROM syn16858699 WHERE abbreviation = 'NTAP'",
              type: funders.type
            },
            title: 'The Neurofibromatosis Therapeutic Acceleration Program'
          },
          {
            name: 'CardContainerLogic',
            props: {
              sql: "SELECT * FROM syn16787123 WHERE fundingAgency = 'NTAP'",
              type: SynapseConstants.STUDY
            },
            title: 'Funded Studies'
          },
          {
            name: 'CardContainerLogic',
            props: {
              sql: "SELECT * FROM syn16857542 WHERE fundingAgency = 'NTAP'",
              type: SynapseConstants.PUBLICATION
            },
            title: 'NEW PUBLICATIONS'
          },
          {
            name: 'CardContainerLogic',
            props: {
              sql: "SELECT * FROM syn16859580 WHERE fundingAgency = 'NTAP'",
              type: SynapseConstants.DATASET
            },
            title: 'DATASETS'
          },
        ]
      },
      {
        name: 'DHART-SPORE',
        to: '/Organizations/DHART-SPORE',
        isNested: false,
        synapseObject: [
          {
            name: 'CardContainerLogic',
            props: {
              limit: 1,
              sql: "SELECT * FROM syn16858699 WHERE abbreviation = 'DHART SPORE'",
              type: funders.type
            },
            title: 'The Developmental And Hyperactive RAS Tumor SPORE'
          },
          {
            name: 'CardContainerLogic',
            props: {
              sql: "SELECT * FROM syn16787123 WHERE fundingAgency = 'NIH-NCI'",
              type: SynapseConstants.STUDY
            },
            title: 'Funded Studies'
          },
          // {
          //   name: 'CardContainerLogic',
          //   props: {
          //     sql: "SELECT * FROM syn16857542 WHERE fundingAgency = 'DHART SPORE'",
          //     type: SynapseConstants.PUBLICATION
          //   },
          //   title: 'NEW PUBLICATIONS'
          // },
          // {
          //   name: 'CardContainerLogic',
          //   props: {
          //     sql: "SELECT * FROM syn16859580 WHERE fundingAgency = 'DHART SPORE'",
          //     type: SynapseConstants.DATASET
          //   },
          //   title: 'DATASETS'
          // },
        ]
      }
    ]
  },
  {
    name: 'About',
    to: '/About',
    isNested: false,
    synapseObject: [
      {
        name: 'Markdown',
        props: {
          ownerId:'syn5702691',
          wikiId:'583906'
        }
      }
    ]
  }
]

export default routes
