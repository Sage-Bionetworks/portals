import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { datasets, files, studies, publications, tools, funders } from './synapseConfigs'
import { studiesSql, studiesCardConfiguration, studyHeaderIconOptions } from './synapseConfigs/studies'
import { datasetsSql } from './synapseConfigs/datasets'
import { publicationsSql, publicationsCardConfiguration } from './synapseConfigs/publications'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import loadingScreen from './loadingScreen'
import { ntap } from './synapseConfigs/organizationConfigs/ntap'
import { dhartSpore } from './synapseConfigs/organizationConfigs/dhart-spore'
import { ctf } from './synapseConfigs/organizationConfigs/ctf'
import { buttonColors, facetAliases } from './synapseConfigs/commonProps'
import { toolsSql, toolsSchema } from './synapseConfigs/tools'

const limit = 3

const routes: GenericRoute [] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'StatefulButtonControlWrapper',
        title: 'EXPLORE PORTAL',
        props: {
          ...buttonColors,
          configs: [
            { name: 'Studies', synapseConfigArray: [studies.homePageSynapseObject] },
            { name: 'Datasets', synapseConfigArray: [datasets.homePageSynapseObject] },
            { name: 'Files', synapseConfigArray: [files.homePageSynapseObject] },
            { name: 'Publications', synapseConfigArray: [publications.homePageSynapseObject] },
            { name: 'Tools', synapseConfigArray: [tools.homePageSynapseObject] }
          ]
        }
      },
      {
        name: 'CardContainerLogic',
        link: '/Explore/Studies',
        props: {
          limit,
          loadingScreen,
          facetAliases,
          sql: studiesSql,
          ...studiesCardConfiguration,
          title: 'NEW STUDIES',
          titleLinkConfiguration: {
            baseURL: 'Explore/Studies',
            columnValues: ['studyId']
          },
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'NEW PUBLICATIONS',
        link: '/Explore/Publications',
        props: {
          limit,
          loadingScreen,
          facetAliases,
          sql: publicationsSql,
          ...publicationsCardConfiguration
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'New Datasets',
        link: '/Explore/Datasets',
        props: {
          limit,
          loadingScreen,
          facetAliases,
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
          loadingScreen,
          facetAliases,
          type: SynapseConstants.GENERIC_CARD,
          genericCardSchema: toolsSchema,
          sql: toolsSql
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'ORGANIZATIONS',
        props: {
          limit,
          loadingScreen,
          facetAliases,
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
        ],
        programmaticRouteConfig: [
          {
            name: 'CardContainerLogic',
            isOutsideContainer: true,
            props: {
              type: SynapseConstants.GENERIC_CARD,
              sqlOperator: '=',
              isHeader: true,
              backgroundColor: '#119488',
              genericCardSchema: {
                link: 'studyId',
                ...studiesCardConfiguration.genericCardSchema
              },
              iconOptions: studyHeaderIconOptions,
              secondaryLabelLimit: Infinity,
              sql: 'SELECT * FROM syn16787123'
            }
          },
          {
            name: 'CardContainerLogic',
            props: {
              title: 'Publications',
              type: SynapseConstants.GENERIC_CARD,
              sqlOperator: '=',
              ...publicationsCardConfiguration,
              sql: 'SELECT * FROM syn16857542'
            }
          },
          {
            name: 'CardContainerLogic',
            props: {
              title: 'Datasets',
              sqlOperator: '=',
              type: SynapseConstants.DATASET,
              sql: datasetsSql
            }
          }
        ]
      },
      {
        name: 'Datasets',
        isNested: false,
        to: '/Explore/Datasets',
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
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
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: files.explorePageSynapseObject
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
              synapseConfig: publications.explorePageSynapseObject
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
              synapseConfig: tools.explorePageSynapseObject
            }
          }
        ]
      },
    ]
  },
  {
    name: 'Organizations',
    isNested: true,
    routes: [ctf, ntap, dhartSpore]
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
