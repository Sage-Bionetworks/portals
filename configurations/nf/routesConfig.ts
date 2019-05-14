import { GenericRoute } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { datasets, files, studies, publications, tools, funders } from './exploreHomeConfiguration'
import { studiesSql } from './exploreHomeConfiguration/studies'
import { datasetsSql } from './exploreHomeConfiguration/datasets';
import { publicationsSql } from './exploreHomeConfiguration/publications';

const routes: GenericRoute [] = [
  {
    name: 'Home',
    to: '/Home',
    isNested: false,
    synapseObject: [
      {
        name: 'StackedBarChartControl',
        title: 'EXPLORE PORTAL',
        props: {
          queryWrapperConfigs: [
            datasets.homePageSynapseObject.props,
            files.homePageSynapseObject.props,
            studies.homePageSynapseObject.props,
            publications.homePageSynapseObject.props
          ]
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'NEW STUDIES',
        link: '/Explore/Studies',
        props: {
          sql: studiesSql,
          type: SynapseConstants.STUDY
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'NEW PUBLICATIONS',
        link: '/Explore/Publications',
        props: {
          sql: publicationsSql,
          type: SynapseConstants.STUDY
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'New Datasets',
        link: '/Explore/Datasets',
        props: {
          sql: datasetsSql,
          type: SynapseConstants.DATASET
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'TOOLS',
        link: '/Explore/Tools',
        props: {
          sql: datasetsSql,
          type: SynapseConstants.DATASET
        }
      },
      {
        name: 'CardContainerLogic',
        title: 'ORGANIZATIONS',
        props: {
          sql: datasetsSql,
          type: SynapseConstants.DATASET
        }
      }
    ]
  }
]

export default routes
