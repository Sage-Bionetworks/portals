import { SynapseConstants } from 'synapse-react-client'
import { GenerateComponentsFromRowProps } from 'types/portal-util-types'
import { SynapseConfig } from 'types/portal-config'
import { facetAliases } from './synapseConfigs/commonProps'
import { publicationsCardConfiguration } from './synapseConfigs/publications'
import { studyCardConfiguration } from './synapseConfigs/studies'
import loadingScreen from './loadingScreen'

const studiesEntityId = 'syn16787123'
const datasetsEntityId = 'syn16859580'
const publicationsEntityId = 'syn16857542'

const studiesSql = `SELECT * FROM syn16787123`
const datasetsSql = `SELECT * FROM syn16859580`
const filesSql = `SELECT id AS "File ID", fundingAgency, studyName, consortium, dataType, assay, diagnosis, tumorType, species, fileFormat, individualID, dataSubtype AS "Data Subtype", nf1Genotype AS "NF1 Genotype", nf2Genotype AS "NF2 Genotype", name AS "File Name" FROM syn16858331`
const publicationsSql = `SELECT * FROM syn16857542`

export const organizationDetailsPageConfig: GenerateComponentsFromRowProps = {
  entityId: 'syn16858699',
  sql: 'SELECT * FROM syn16858699',
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
        loadingScreen,
        sql: studiesSql,
        entityId: studiesEntityId,
        ...studyCardConfiguration,
      },
      title: 'Funded Studies',
      columnName: 'fundingAgency',
      tableSqlKeys: ['fundingAgency'],
    },
    {
      name: 'CardContainerLogic',
      props: {
        loadingScreen,
        entityId: datasetsEntityId,
        sql: datasetsSql,
        type: SynapseConstants.DATASET,
      },
      columnName: 'fundingAgency',
      title: 'Datasets',
      tableSqlKeys: ['fundingAgency'],
    },
    {
      name: 'StandaloneQueryWrapper',
      props: {
        facetAliases,
        title: 'Files',
        rgbIndex: 1,
        facet: 'assay',
        sql: filesSql,
      },
      title: 'Files',
      columnName: 'fundingAgency',
      tableSqlKeys: ['fundingAgency'],
    },
    {
      name: 'CardContainerLogic',
      props: {
        loadingScreen,
        sql: publicationsSql,
        entityId: publicationsEntityId,
        ...publicationsCardConfiguration,
        sqlOperator: 'LIKE',
      },
      title: 'Publications',
      columnName: 'fundingAgency',
      tableSqlKeys: ['fundingAgency'],
    },
    {
      name: 'ExternalFileHandleLink',
      props: {
        synId: 'syn22276050',
      },
      title: 'Funder Dashboard',
      standalone: true,
    },
  ],
}

export const organizationDetailsPage: SynapseConfig[] = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      limit: 1,
      sql: 'SELECT * FROM syn16858699',
      type: SynapseConstants.GENERIC_CARD,
      genericCardSchema: {
        title: 'organizationName',
        type: 'ORGANIZATION',
        description: 'summary',
        icon: 'logo',
        link: 'website',
      },
      entityId: 'syn16858699',
      isHeader: true,
      backgroundColor: '#125E81',
    },
  },
  {
    name: 'GenerateComponentsFromRow',
    props: organizationDetailsPageConfig,
  },
]
