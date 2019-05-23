import { GenericRoute } from '../types/portal-config'
import { publications, files, datasets, grants, studies } from './synapseConfigs'
import { SynapseConstants } from 'synapse-react-client'
import { studiesSql } from './synapseConfigs/studies'
import { publicationSql } from './synapseConfigs/publications'
import { datasetsSql } from './synapseConfigs/datasets'
import exploreButtonControlWrapperProps from './exploreButtonControlWrapperProps'

const homeLimit = 3

const routes: GenericRoute [] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseObject: [
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
            { name: 'Grants', synapseObjectSingle: grants.homePageSynapseObject },
            { name: 'Publications', synapseObjectSingle: publications.homePageSynapseObject },
            { name: 'Studies', synapseObjectSingle: studies.homePageSynapseObject },
            { name: 'Datasets', synapseObjectSingle: datasets.homePageSynapseObject },
            { name: 'Files', synapseObjectSingle: files.homePageSynapseObject },
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
        synapseObject: [
          {
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              synapseObjectSingle: grants.explorePageSynapseObject
            }
          }
        ],
      },
      {
        name: 'Publications',
        to: '/Explore/Publications',
        isNested: false,
        synapseObject: [
          {
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              synapseObjectSingle: publications.explorePageSynapseObject
            }
          }
        ],
      },
      {
        name: 'Studies',
        to: '/Explore/Studies',
        isNested: false,
        synapseObject: [
          {
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              synapseObjectSingle: studies.explorePageSynapseObject
            }
          }
        ],
      },
      {
        name: 'Datasets',
        to: '/Explore/Datasets',
        isNested: false,
        synapseObject: [
          {
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              synapseObjectSingle: datasets.explorePageSynapseObject
            }
          }
        ],
      },
      {
        name: 'Files',
        to: '/Explore/Files',
        isNested: false,
        synapseObject: [
          {
            ...exploreButtonControlWrapperProps,
            props: {
              ...exploreButtonControlWrapperProps.props,
              synapseObjectSingle: files.explorePageSynapseObject
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
    synapseObject: [
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
