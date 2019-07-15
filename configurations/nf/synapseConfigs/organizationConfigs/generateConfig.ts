import { SynapseConstants } from 'synapse-react-client'
import { facetAliases } from '../commonProps'
import { publicationsCardConfiguration } from '../publications'
import { studiesCardConfiguration } from '../studies'
import { SynapseConfigArray } from '../../../types/portal-config'
import loadingScreen from '../../loadingScreen'

type Key = 'Dataset' | 'Studies' | 'Publications' | 'Files'
type ReturnSynapseConfigArray = (org: string, type: Key, sqlOnly?: boolean) => SynapseConfigArray | string

// This is a helper
export const generateOrgConfig: ReturnSynapseConfigArray = (org, type, sqlOnly = false) => {
  const studiesSql = `SELECT * FROM syn16787123 WHERE fundingAgency = '${org}'`
  const datasetsSql = `SELECT * FROM syn16859580 WHERE fundingAgency = '${org}'`
  const filesSql = `SELECT id AS "File ID", fundingAgency AS "Funding Agency", studyName AS "Study Name", consortium AS "Consortium", dataType AS "Data Type", assay AS "Assay", diagnosis AS "Diagnosis", tumorType AS "Tumor Type", species AS "Species", fileFormat AS "File Format", individualID AS "Individual ID", dataSubtype AS "Data Subtype", nf1Genotype AS "NF1 Genotype", nf2Genotype AS "NF2 Genotype", name AS "File Name" FROM syn16858331 WHERE fundingAgency = '${org}'`
  const publicationsSql = `SELECT * FROM syn16857542 WHERE fundingAgency = '${org}'`
  if (type === 'Studies') {
    if (sqlOnly) {
      return studiesSql
    }
    return [
      {
        name: 'QueryWrapperFlattened',
        props: {
          facetAliases,
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
          loadingScreen,
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
        name: 'QueryWrapperFlattened',
        props: {
          facetAliases,
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
          loadingScreen,
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
        name: 'QueryWrapperFlattened',
        props: {
          facetAliases,
          unitDescription: 'Files',
          title: 'Files',
          synapseId: 'syn16858331',
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
      name: 'QueryWrapperFlattened',
      props: {
        facetAliases,
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
        loadingScreen,
        sql: publicationsSql,
        ...publicationsCardConfiguration,
        filter: 'diseaseFocus',
      },
      title: 'NEW PUBLICATIONS'
    }
  ]
}
