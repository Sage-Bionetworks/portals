import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { facetAliases } from './commonProps'

import studyActiveSvg from '../style/study-active.svg'
import studyCompleteSvg from '../style/study-complete.svg'
import studyCompleteHeaderSvg from '../style/study-completed-header.svg'
import studyActiveHeaderSvg from '../style/study-active-header.svg'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { DetailsPageProps } from 'types/portal-util-types'
import { toolsCardConfiguration } from './tools'
import { publicationsCardConfiguration } from './publications'
import {
  studiesSql,
  toolsSql,
  datasetsSql,
  publicationsSql,
} from '../resources'

export const newStudiesSql = `${studiesSql} order by ROW_ID desc limit 3`
const type = SynapseConstants.GENERIC_CARD
const unitDescription = 'Studies'
const rgbIndex = 5

export const studyHeaderIconOptions = {
  Active: studyActiveHeaderSvg,
  Completed: studyCompleteHeaderSvg,
}

export const studyCardConfiguration: CardConfiguration = {
  type,
  genericCardSchema: {
    title: 'studyName',
    type: SynapseConstants.STUDY,
    description: 'summary',
    subTitle: 'studyLeads',
    icon: 'studyStatus',
    secondaryLabels: [
      'dataStatus',
      'diseaseFocus',
      'manifestation',
      'fundingAgency',
      'institutions',
      'studyStatus',
    ],
  },
  iconOptions: {
    Active: studyActiveSvg,
    Completed: studyCompleteSvg,
  },
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Studies/DetailsPage',
    URLColumnName: 'studyId',
    matchColumnName: 'studyId',
  }
}

const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      facetAliases,
      unitDescription,
      rgbIndex,
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
      facet: 'diseaseFocus',
      sql: studiesSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: studiesSql,
      name: 'Studies',
      shouldDeepLink: true,
      cardConfiguration: studyCardConfiguration,
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'studyName',
          },
          {
            columnName: 'summary',
          },
          {
            columnName: 'studyLeads',
          },
          {
            columnName: 'studyStatus',
          },
          {
            columnName: 'dataStatus',
          },
          {
            columnName: 'institutions',
          },
          {
            columnName: 'diseaseFocus',
          },
          {
            columnName: 'manifestation',
          },
          {
            columnName: 'fundingAgency',
          },
        ],
      },
    },
  },
}

export const studiesDetailPage: DetailsPageProps = {
  showMenu: true,
  sql: studiesSql,
  synapseConfigArray: [
    {
      name: 'Markdown',
      columnName: 'accessRequirements',
      title: 'Access Requirements',
      injectMarkdown: true,
      props: {},
    },
    {
      name: 'Markdown',
      columnName: 'acknowledgementStatements',
      title: 'Acknowledgement Statements',
      injectMarkdown: true,
      props: {},
    },
    {
      name: 'CardContainerLogic',
      columnName: 'studyId',
      title: 'Datasets',
      tableSqlKeys: ['studyId'],
      props: {
        sql: datasetsSql,
        sqlOperator: '=',
        type: 'dataset',
      },
    },
    {
      name: 'StandaloneQueryWrapper',
      title: 'Data Files',
      columnName: 'studyId',
      tableSqlKeys: ['studyId'],
      props: {
        visibleColumnCount: 7,
        sql: `SELECT id, dataType, assay, diagnosis, tumorType, species, individualID, fileFormat, dataSubtype, nf1Genotype, nf2Genotype, fundingAgency, consortium FROM syn16858331 where resourceType = 'experimentalData'`,
          rgbIndex,
        title: 'Data Files',
      },
    },
    {
      name: 'StandaloneQueryWrapper',
      title: 'Metadata Files',
      columnName: 'studyId',
      tableSqlKeys: ['studyId'],
      props: {
        visibleColumnCount: 7,
        sql: `SELECT id, dataType, assay, diagnosis, tumorType, species, individualID, fileFormat, dataSubtype, nf1Genotype, nf2Genotype, fundingAgency, consortium FROM syn16858331 where resourceType ='report'`,
          rgbIndex,
        title: 'Metadata Files',
      },
    },
    {
      name: 'CardContainerLogic',
      title: 'Tools',
      columnName: 'studyId',
      tableSqlKeys: ['studyId'],
      props: {
        sql: toolsSql,
        ...toolsCardConfiguration,
      },
    },
    {
      name: 'CardContainerLogic',
      title: 'Publications',
      columnName: 'studyId',
      tableSqlKeys: ['studyId'],
      props: {
        sql: publicationsSql,
        ...publicationsCardConfiguration,
      },
    },
    {
      name: 'CardContainerLogic',
      title: 'Related Studies',
      columnName: 'relatedStudies',
      tableSqlKeys: ['studyId'],
      props: {
        sqlOperator: 'LIKE',
        sql: studiesSql,
        ...studyCardConfiguration,
      },
    },
  ],
}

export default studies
