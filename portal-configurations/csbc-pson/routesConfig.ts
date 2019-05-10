import { GenericRoute } from '../types/portal-config'
import { publications, data, datasets, grants, studies } from './exploreHomeConfiguration'
import { SynapseConstants } from 'synapse-react-client'
import { studiesSql } from './exploreHomeConfiguration/studies'
import { publicationSql } from './exploreHomeConfiguration/publications'
import { datasetsSql } from './exploreHomeConfiguration/datasets'

const homeLimit = 3

const routes: GenericRoute [] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseObject: [
      {
        name: 'StackedBarChartPreview',
        title: 'Explore Portal',
        props: {
          queryWrapperConfigs: [
            {
              ...grants.homePageSynapseObject.props
            },
            {
              ...publications.homePageSynapseObject.props
            },
            {
              ...studies.homePageSynapseObject.props
            },
            {
              ...datasets.homePageSynapseObject.props
            },
            {
              ...data.homePageSynapseObject.props,
            },
          ]
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'Explore Studies',
        props: {
          sql: studiesSql,
          limit: homeLimit,
          type: SynapseConstants.CSBC_STUDY
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'Explore Publications',
        props: {
          sql: publicationSql,
          limit: homeLimit,
          type: SynapseConstants.CSBC_PUBLICATION
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'Explore Datasets',
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
        synapseObject: {
          ...grants.explorePageSynapseObject.props
        },
      },
      {
        name: 'Publications',
        to: '/Explore/Publications',
        isNested: false,
        synapseObject: {
          ...publications.explorePageSynapseObject.props
        },
      },
      {
        name: 'Studies',
        to: '/Explore/Studies',
        isNested: false,
        synapseObject: {
          ...studies.explorePageSynapseObject.props
        },
      },
      {
        name: 'Datasets',
        to: '/Explore/Datasets',
        isNested: false,
        synapseObject: {
          ...datasets.explorePageSynapseObject.props
        },
      },
      {
        name: 'Data',
        to: '/Explore/Data',
        isNested: false,
        synapseObject: {
          ...data.explorePageSynapseObject.props
        },
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
