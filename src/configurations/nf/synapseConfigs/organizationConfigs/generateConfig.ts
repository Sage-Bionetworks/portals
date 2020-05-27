import { SynapseConstants } from 'synapse-react-client'
import { facetAliases } from '../commonProps'
import { publicationsCardConfiguration } from '../publications'
import { studyCardConfiguration } from '../studies'
import loadingScreen from '../../loadingScreen'
import { StatefulButtonControlConfigs } from 'portal-components/StatefulButtonControlWrapper'
import { studyEntityId } from 'configurations/digitalhealth/synapseConfigs/studies'
import { filesEntityId } from '../files'

type Key = 'Dataset' | 'Studies' | 'Publications' | 'Files'

const studiesEntityId = 'syn16787123'
const datasetsEntityId = 'syn16859580'
const publicationsEntityId = 'syn16857542'

// Helper function to more easily generate configs for NF
export const generateOrgConfigImproved = (
  org: string,
): StatefulButtonControlConfigs[] => {
  const studiesSql = `SELECT * FROM syn16787123 WHERE fundingAgency LIKE '%${org}%'`
  const datasetsSql = `SELECT * FROM syn16859580 WHERE fundingAgency = '${org}'`
  const filesSql = `SELECT id AS "File ID", fundingAgency, studyName, consortium, dataType, assay, diagnosis, tumorType, species, fileFormat, individualID, dataSubtype AS "Data Subtype", nf1Genotype AS "NF1 Genotype", nf2Genotype AS "NF2 Genotype", name AS "File Name" FROM syn16858331 WHERE fundingAgency = '${org}'`
  const publicationsSql = `SELECT * FROM syn16857542 WHERE fundingAgency HAS('${org}')`
  return [
    {
      name: 'Studies',
      entityId: studyEntityId,
      sql: studiesSql,
      synapseConfigArray: [
        {
          name: 'StandaloneQueryWrapper',
          props: {
            facetAliases,
            unitDescription: 'Studies',
            rgbIndex: 5,
            facet: 'diseaseFocus',
            sql: studiesSql,
          },
        },
        {
          name: 'CardContainerLogic',
          props: {
            loadingScreen,
            sql: studiesSql,
            entityId: studiesEntityId,
            ...studyCardConfiguration,
            facet: 'diseaseFocus',
          },
          title: 'Funded Studies',
        },
      ],
    },
    {
      name: 'Datasets',
      entityId: datasetsEntityId,
      sql: datasetsSql,
      synapseConfigArray: [
        {
          name: 'StandaloneQueryWrapper',
          props: {
            facetAliases,
            unitDescription: 'Studies',
            rgbIndex: 8,
            facet: 'diseaseFocus',
            sql: datasetsSql,
          },
        },
        {
          name: 'CardContainerLogic',
          props: {
            loadingScreen,
            entityId: datasetsEntityId,
            sql: datasetsSql,
            type: SynapseConstants.DATASET,
            facet: 'diseaseFocus',
          },
          title: 'NEW DATASETS',
        },
      ],
    },
    {
      name: 'Files',
      entityId: filesEntityId,
      sql: filesSql,
      synapseConfigArray: [
        {
          name: 'StandaloneQueryWrapper',
          props: {
            facetAliases,
            unitDescription: 'Files',
            title: 'Files',
            rgbIndex: 1,
            facet: 'assay',
            sql: filesSql,
          },
        },
      ],
    },
    {
      name: 'Publications',
      entityId: publicationsEntityId,
      sql: publicationsSql,
      synapseConfigArray: [
        {
          name: 'CardContainerLogic',
          props: {
            loadingScreen,
            sql: publicationsSql,
            entityId: publicationsEntityId,
            ...publicationsCardConfiguration,
            facet: 'diseaseFocus',
            sqlOperator: 'LIKE',
          },
          title: 'NEW PUBLICATIONS',
        },
      ],
    },
  ]
}
