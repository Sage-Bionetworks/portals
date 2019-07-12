import { SynapseConstants } from 'synapse-react-client'
import { facetAliases } from '../commonProps'
import { publicationsCardConfiguration } from '../publications'
import { studiesCardConfiguration } from '../studies'
import { SynapseConfigArray } from '../../../types/portal-config'

type Key = 'Dataset' | 'Studies' | 'Publications' | 'Files'
type ReturnSynapseConfigArray = (org: string, type: Key, sqlOnly?: boolean) => SynapseConfigArray | string

// This is a helper
export const generateOrgConfig: ReturnSynapseConfigArray = (org, type, sqlOnly = false) => {
  const studiesSql = `SELECT * FROM syn16787123 WHERE fundingAgency = '${org}'`
  const datasetsSql = `SELECT * FROM syn16859580 WHERE fundingAgency = '${org}'`
  const filesSql = `SELECT * FROM syn16858331 WHERE fundingAgency = '${org}'`
  const publicationsSql = `SELECT * FROM syn16857542 WHERE fundingAgency = '${org}'`
  if (type === 'Studies') {
    if (sqlOnly) {
      return studiesSql
    }
    return [
      {
        name: 'QueryWrapperWithStackedBarChart',
        props: {
          facetAliases,
          link: `/Explore/Studies?menuIndex=3&facetValue=${org}`,
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
              sql: studiesSql,
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
          sql: studiesSql,
          ...studiesCardConfiguration,
          filter: 'diseaseFocus',
        },
        title: 'Funded Studies'
      }
    ]
  }
  if (type === 'Dataset') {
    if (sqlOnly) {
      return datasetsSql
    }
    return [
      {
        name: 'QueryWrapperWithStackedBarChart',
        props: {
          facetAliases,
          link: `/Explore/Datasets?menuIndex=2&facetValue=${org}`,
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
              sql: datasetsSql,
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
          sql: datasetsSql,
          type: SynapseConstants.DATASET,
          filter: 'diseaseFocus',
        },
        title: 'NEW DATASETS'
      }
    ]
  }
  if (type === 'Files') {
    if (sqlOnly) {
      return filesSql
    }
    return [
      {
        name: 'QueryWrapperWithStackedBarChart',
        props: {
          facetAliases,
          link: `/Explore/Files?menuIndex=4&facetValue=${org}`,
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
              sql: filesSql,
              isConsistent: false,
              limit: 25,
              offset: 0,
            },
          }
        }
      }
    ]
  }
  if (sqlOnly) {
    return publicationsSql
  }
  return [
    {
      name: 'QueryWrapperWithStackedBarChart',
      props: {
        facetAliases,
        link: `/Explore/Publications?menuIndex=0&facetValue=${org}`,
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
            sql: publicationsSql,
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
        sql: publicationsSql,
        ...publicationsCardConfiguration,
        filter: 'diseaseFocus',
      },
      title: 'NEW PUBLICATIONS'
    }
  ]
}
