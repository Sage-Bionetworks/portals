import { GenericRoute } from '../types/portal-config'
import { publications, files, datasets, grants, studies } from './synapseConfigs'
import { SynapseConstants } from 'synapse-react-client'
import { studiesSql } from './synapseConfigs/studies'
import { publicationSql } from './synapseConfigs/publications'
import { datasetsSql } from './synapseConfigs/datasets'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import loadingScreen from './loadingScreen'

const homeLimit = 3

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
          colors: [
            '#47337D',
            '#407BA0',
            '#7798AC',
            '#77BBBF',
            '#5E697D',
          ],
          configs: [
            { name: 'Grants', synapseConfigArray: [grants.homePageSynapseObject] },
            { name: 'Publications', synapseConfigArray: [publications.homePageSynapseObject] },
            { name: 'Studies', synapseConfigArray: [studies.homePageSynapseObject] },
            { name: 'Datasets', synapseConfigArray: [datasets.homePageSynapseObject] },
            { name: 'Files', synapseConfigArray: [files.homePageSynapseObject] },
          ]
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE STUDIES',
        link: 'Explore/Studies',
        props: {
          loadingScreen,
          sql: studiesSql,
          limit: homeLimit,
          type: SynapseConstants.CSBC_STUDY,
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE PUBLICATIONS',
        link: 'Explore/Publications',
        props: {
          loadingScreen,
          sql: publicationSql,
          limit: homeLimit,
          type: SynapseConstants.CSBC_PUBLICATION
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE DATASETS',
        link: 'Explore/Datasets',
        props: {
          loadingScreen,
          sql: datasetsSql,
          limit: homeLimit,
          type: SynapseConstants.CSBC_DATASET
        },
      },
    ]
  },
  {
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: 'Grants',
        to: '/Explore/Grants',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: grants.explorePageSynapseObject
            }
          }
        ],
      },
      {
        name: 'Publications',
        to: '/Explore/Publications',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: publications.explorePageSynapseObject
            }
          }
        ],
      },
      {
        name: 'Studies',
        to: '/Explore/Studies',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: studies.explorePageSynapseObject
            }
          }
        ],
      },
      {
        name: 'Datasets',
        to: '/Explore/Datasets',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: datasets.explorePageSynapseObject
            }
          }
        ],
      },
      {
        name: 'Files',
        to: '/Explore/Files',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: files.explorePageSynapseObject
            }
          }
        ],
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
        props: {
          ownerId: 'syn7080714',
          wikiId: '470467'
        }
      }
    ]
  }
]

export default routes
