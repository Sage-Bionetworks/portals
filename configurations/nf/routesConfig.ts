import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { datasets, files, studies, publications, tools, funders } from './synapseConfigurations'
import { studiesSql } from './synapseConfigurations/studies'
import { datasetsSql } from './synapseConfigurations/datasets'
import { publicationsSql } from './synapseConfigurations/publications'
import exploreButtonControlWrapperProps from './exploreButtonControlWrapperProps'

const limit = 3

const routes: GenericRoute [] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'HomeButtonControlWrapper',
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
              name: 'Datasets', synapseConfig: datasets.homePageSynapseObject
            },
            {
              name: 'Files', synapseConfig: files.homePageSynapseObject
            },
            {
              name: 'Studies', synapseConfig: studies.homePageSynapseObject
            },
            {
              name: 'Publications', synapseConfig: publications.homePageSynapseObject
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
        synapseConfigArray: [
          {
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              synapseConfig: datasets.explorePageSynapseObject
            }
          }
        ]
      },
      {
        name: 'Files',
        isNested: false,
        to: '/Explore/Files',
        synapseConfigArray: [
          {
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              synapseConfig: files.explorePageSynapseObject
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
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              synapseConfig: studies.explorePageSynapseObject
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
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              synapseConfig: publications.explorePageSynapseObject
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
        synapseConfigArray: [
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
        synapseConfigArray: [
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
        synapseConfigArray: [
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
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'About',
        props: {
          ownerId:'syn5702691',
          wikiId:'583906'
        }
      }
    ]
  }
]

export default routes
