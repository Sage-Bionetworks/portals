import { SynapseConstants } from 'synapse-react-client'
import { DetailsPageProps } from 'types/portal-util-types'
import { SynapseConfig } from 'types/portal-config'
import { facetAliases } from './synapseConfigs/commonProps'
import { publicationsCardConfiguration } from './synapseConfigs/publications'
import { studyCardConfiguration } from './synapseConfigs/studies'
import loadingScreen from './loadingScreen'

const studiesSql = `SELECT * FROM syn16787123`
const datasetsSql = `SELECT * FROM syn16859580`
const filesSql = `SELECT id AS "File ID", fundingAgency, studyName, consortium, dataType, assay, diagnosis, tumorType, species, fileFormat, individualID, dataSubtype AS "Data Subtype", nf1Genotype AS "NF1 Genotype", nf2Genotype AS "NF2 Genotype", name AS "File Name" FROM syn16858331`
const publicationsSql = `SELECT * FROM syn16857542`

export const organizationDetailsPageConfig: DetailsPageProps = {
  sql: 'SELECT * FROM syn16858699',
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
        loadingScreen,
        sql: studiesSql,
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
        ...publicationsCardConfiguration,
        sqlOperator: 'LIKE',
      },
      title: 'Publications',
      columnName: 'fundingAgency',
      tableSqlKeys: ['fundingAgency'],
    },
    {
      name: 'Markdown',
      props: {
        ownerId: 'syn22272075',
        wikiId: '604853',
      },
      title: 'Funding Impact',
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
        type: SynapseConstants.ORGANIZATION,
        description: 'summary',
        icon: 'logo',
        link: 'website',
      },
      isHeader: true,
      backgroundColor: '#125E81',
    },
  },
  {
    name: 'DetailsPage',
    props: organizationDetailsPageConfig,
  },
]
