import { GenericRoute } from '../types/portal-config'
import { publications, files, datasets, grants, studies } from './synapseConfigurations'
import { SynapseConstants } from 'synapse-react-client'
import { studiesSql } from './synapseConfigurations/studies'
import { publicationSql } from './synapseConfigurations/publications'
import { datasetsSql } from './synapseConfigurations/datasets'
import exploreButtonControlWrapperProps from './exploreButtonControlWrapperProps'

const homeLimit = 3

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
            '#47337D',
            '#407BA0',
            '#7798AC',
            '#77BBBF',
            '#5E697D',
          ],
          configs: [
            { name: 'Grants', SynapseConfig: grants.homePageSynapseObject },
            { name: 'Publications', SynapseConfig: publications.homePageSynapseObject },
            { name: 'Studies', SynapseConfig: studies.homePageSynapseObject },
            { name: 'Datasets', SynapseConfig: datasets.homePageSynapseObject },
            { name: 'Files', SynapseConfig: files.homePageSynapseObject },
          ]
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE STUDIES',
        link: 'Explore/Studies',
        props: {
          sql: studiesSql,
          limit: homeLimit,
          type: SynapseConstants.CSBC_STUDY
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE PUBLICATIONS',
        link: 'Explore/Publications',
        props: {
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
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              SynapseConfig: grants.explorePageSynapseObject
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
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              SynapseConfig: publications.explorePageSynapseObject
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
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              SynapseConfig: studies.explorePageSynapseObject
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
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              SynapseConfig: datasets.explorePageSynapseObject
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
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              SynapseConfig: files.explorePageSynapseObject
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
