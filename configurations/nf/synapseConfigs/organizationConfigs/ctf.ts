import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute, SynapseConfigArray } from '../../../types/portal-config'
import { buttonColors, facetAliases } from '../commonProps'
import { publicationsCardConfiguration } from '../publications'
import { studiesCardConfiguration } from '../studies'

const studiesConfig: SynapseConfigArray = [
  {
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      facetAliases,
      link: '/Explore/Studies?menuIndex=3&facetValue=CTF',
      linkText: 'Explore Studies',
      unitDescription: 'Studies',
      rgbIndex: 1,
      facetName: 'diseaseFocus',
      initQueryRequest: {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
          | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
          | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql: "SELECT * FROM syn16787123 WHERE fundingAgency = 'CTF'",
          isConsistent: false,
          limit: 25,
          offset: 0,
        },
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
  }
]

const publicationsConfig: SynapseConfigArray = [
  {
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      facetAliases,
      link: '/Explore/Publications?menuIndex=0&facetValue=CTF',
      linkText: 'Explore Publications',
      unitDescription: 'Publications',
      rgbIndex: 0,
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
  },
  {
    name: 'CardContainerLogic',
    props: {
      sql: "SELECT * FROM syn16857542 WHERE fundingAgency = 'CTF'",
      ...publicationsCardConfiguration
    },
    title: 'NEW PUBLICATIONS'
  }
]

const datasetConfig: SynapseConfigArray = [
  {
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      facetAliases,
      link: '/Explore/Datasets?menuIndex=2&facetValue=CTF',
      linkText: 'Explore Datasets',
      unitDescription: 'Studies',
      rgbIndex: 5,
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
  },
  {
    name: 'CardContainerLogic',
    props: {
      sql: "SELECT * FROM syn16859580 WHERE fundingAgency = 'CTF'",
      type: SynapseConstants.DATASET
    },
    title: 'DATASETS'
  }
]

const filesConfig: SynapseConfigArray = [
  {
    name: 'QueryWrapperWithStackedBarChart',
    props: {
      facetAliases,
      link: '/Explore/Files?menuIndex=4&facetValue=CTF',
      linkText: 'Explore Files',
      unitDescription: 'Files',
      rgbIndex: 8,
      facetName: 'assay',
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
