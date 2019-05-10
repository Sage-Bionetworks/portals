import { GenericRoute } from '../types/portal-config'
import { publications, data, datasets, grants, studies } from './homeExploreConfiguration'
import { SynapseConstants } from 'synapse-react-client'
import { studiesSql } from './homeExploreConfiguration/studies'
import { publicationSql } from './homeExploreConfiguration/publications'
import { datasetsSql } from './homeExploreConfiguration/datasets'

const homeLimit = 3

const routes: GenericRoute [] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseObject: [
      {
        name: 'StackedBarChartPreview',
        title: 'EXPLORE PORTALS',
        props: {
          queryWrapperConfigs: [
            grants.homePageSynapseObject.props,
            publications.homePageSynapseObject.props,
            studies.homePageSynapseObject.props,
            datasets.homePageSynapseObject.props,
            data.homePageSynapseObject.props
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
        synapseObject: [grants.explorePageSynapseObject],
      },
      {
        name: 'Publications',
        to: '/Explore/Publications',
        isNested: false,
        synapseObject: [publications.explorePageSynapseObject],
      },
      {
        name: 'Studies',
        to: '/Explore/Studies',
        isNested: false,
        synapseObject: [studies.explorePageSynapseObject],
      },
      {
        name: 'Datasets',
        to: '/Explore/Datasets',
        isNested: false,
        synapseObject: [datasets.explorePageSynapseObject],
      },
      {
        name: 'Data',
        to: '/Explore/Data',
        isNested: false,
        synapseObject: [data.explorePageSynapseObject],
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
