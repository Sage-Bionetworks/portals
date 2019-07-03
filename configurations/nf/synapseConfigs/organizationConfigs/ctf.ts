import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute, SynapseConfigArray } from '../../../types/portal-config'
import { buttonColors } from '../commonProps'
import loadingScreen from '../../loadingScreen'
import { publicationsCardConfiguration } from '../publications'
import { studiesCardConfiguration } from '../studies'


const studiesConfig = [
  {
    name: 'LinkedComponent',
    props: {
      link: '/Explore/Study',
      text: 'Explore Study',
      props: {
        name: 'QueryWrapperWithStackedBarChart',
        props: {
          unitDescription: 'Studies',
          rgbIndex: 1,
          loadingScreen,
          facetName: 'diseaseFocus',
          initQueryRequest: {
            concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
            partMask:
              SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
              | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
              | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
            query: {
              sql: "SELECT * FROM syn16857542 WHERE fundingAgency = 'CTF'",
              isConsistent: false,
              limit: 25,
              offset: 0,
            },
          }
        }
      }
    }
  },
  {
    name: 'CardContainerLogic',
    props: {
      sql: "SELECT * FROM syn16787123 WHERE fundingAgency = 'CTF'",
      ...studiesCardConfiguration
    },
    title: 'Funded Studies'
}]

const publicationsConfig = [
  {
    name: 'LinkedComponent',
    props: {
      link: '/Explore/Publication',
      text: 'Explore Study',
      props: {
        name: 'QueryWrapperWithStackedBarChart',
        props: {
          unitDescription: 'Publications',
          rgbIndex: 0,
          loadingScreen,
          facetName: 'diseaseFocus',
          initQueryRequest: {
            concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
            partMask:
              SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
              | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
              | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
            query: {
              sql: "SELECT * FROM syn16857542 WHERE fundingAgency = 'CTF'",
              isConsistent: false,
              limit: 25,
              offset: 0,
            },
          }
        }
      }
    }
  },
  {
    name: 'CardContainerLogic',
    props: {
      sql: "SELECT * FROM syn16857542 WHERE fundingAgency = 'CTF'",
      ...publicationsCardConfiguration
    },
    title: 'NEW PUBLICATIONS'
}]

const datasetConfig: SynapseConfigArray = [
  {
    name: 'LinkedComponent',
    props: {
      link: 'Explore/Dataset',
      text: 'Explore Study',
      props: {
        name: 'QueryWrapperWithStackedBarChart',
        props: {
          unitDescription: 'Studies',
          rgbIndex: 5,
          loadingScreen,
          facetName: 'diseaseFocus',
          initQueryRequest: {
            concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
            partMask:
              SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
              | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
              | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
            query: {
              sql: "SELECT * FROM syn16859580 WHERE fundingAgency = 'CTF'",
              isConsistent: false,
              limit: 25,
              offset: 0,
            },
          }
        }
      }
    }
  },
  {
    name: 'CardContainerLogic',
    props: {
      sql: "SELECT * FROM syn16859580 WHERE fundingAgency = 'CTF'",
      type: SynapseConstants.DATASET
    },
    title: 'DATASETS'
}]

const filesConfig: SynapseConfigArray = [
  {
    name: 'LinkedComponent',
    props: {
      link: 'Explore/Files',
      text: 'Explore Files',
      props: {
        name: 'QueryWrapperWithStackedBarChart',
        props: {
          unitDescription: 'Files',
          rgbIndex: 8,
          loadingScreen,
          facetName: 'diseaseFocus',
          initQueryRequest: {
            concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
            partMask:
              SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
              | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
              | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
            query: {
              sql: "SELECT * FROM syn16858331 WHERE fundingAgency = 'CTF'",
              isConsistent: false,
              limit: 25,
              offset: 0,
            },
          }
        }
      }
    }
  }]

export const ctf: BaseRoute = {
  name: 'CTF',
  to: '/Organizations/CTF',
  isNested: false,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
        limit: 1,
        sql: "SELECT * FROM syn16858699 WHERE abbreviation = 'CTF'",
        type: SynapseConstants.FUNDER
      },
      title: "Children's Tumor Foundation"
    },
    {
      name: 'StatefulButtonControlWrapper',
      props: {
        ...buttonColors,
        configs: [
          {
            name: 'Datasets', synapseConfigArray: datasetConfig
          },
          {
            name: 'Files', synapseConfigArray: filesConfig
          },
          {
            name: 'Studies', synapseConfigArray: studiesConfig
          },
          {
            name: 'Publications', synapseConfigArray: publicationsConfig
          }
        ]
      }
    },
  ]
}
