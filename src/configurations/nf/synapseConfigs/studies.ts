import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { facetAliases } from './commonProps'
import loadingScreen from '../loadingScreen'
import studyActiveSvg from '../style/study-active.svg'
import studyCompleteSvg from '../style/study-complete.svg'
import studyCompleteHeaderSvg from '../style/study-completed-header.svg'
import studyActiveHeaderSvg from '../style/study-active-header.svg'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { GenerateComponentsFromRowProps } from 'types/portal-util-types'
import { datasetsSql, datasetsEntityId } from './datasets'
import { toolsSql, toolsEntityId, toolsCardConfiguration } from './tools'
import {
  publicationsSql,
  publicationsEntityId,
  publicationsCardConfiguration,
} from './publications'

const sql = 'SELECT * FROM syn16787123'
export const studiesEntityId = 'syn16787123'
const entityId = studiesEntityId
export const studiesSql = sql
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
  },
  loadingScreen,
}

const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      facetAliases,
      unitDescription,
      rgbIndex,
      loadingScreen,
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
      facet: 'diseaseFocus',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: true,
          limit: 25,
          offset: 0,
        },
      },
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      entityId,
      name: 'Studies',
      cardConfiguration: studyCardConfiguration,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'studyName',
            hintText: 'Synodos NF2',
          },
          {
            columnName: 'summary',
            hintText: 'nonsurgical therapy',
          },
          {
            columnName: 'studyLeads',
            hintText: 'Schwann cell',
          },
          {
            columnName: 'studyStatus',
            hintText: 'Active',
          },
          {
            columnName: 'dataStatus',
            hintText: 'Under Embargo',
          },
          {
            columnName: 'institutions',
            hintText: 'Massachusetts General Hospital',
          },
          {
            columnName: 'diseaseFocus',
            hintText: 'Neurofibromatosis 2',
          },
          {
            columnName: 'manifestation',
            hintText: 'Schwannoma',
          },
          {
            columnName: 'fundingAgency',
            hintText: 'NTAP',
          },
        ],
      },
      facetAliases,
      menuConfig: [
        {
          sql,
          facet: 'studyStatus',
        },
        {
          sql,
          facet: 'dataStatus',
        },
        {
          sql,
          facet: 'institutions',
        },
        {
          sql,
          facet: 'fundingAgency',
        },
        {
          sql,
          facet: 'manifestation',
        },
        {
          sql,
          facet: 'diseaseFocus',
        },
        {
          sql,
        },
      ],
    },
  },
}

export const studiesDetailPage: GenerateComponentsFromRowProps = {
  showMenu: true,
  sql: studiesSql,
  entityId: studiesEntityId,
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
        entityId: datasetsEntityId,
      },
    },
    {
      name: 'QueryWrapperFlattened',
      title: 'Data Files',
      columnName: 'studyId',
      tableSqlKeys: ['studyId'],
      props: {
        visibleColumnCount: 7,
        initQueryRequest: {
          partMask:
            SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
            SynapseConstants.BUNDLE_MASK_QUERY_COUNT |
            SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS |
            SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
            SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
          concreteType:
            'org.sagebionetworks.repo.model.table.QueryBundleRequest',
          entityId,
          query: {
            sql: `SELECT id, dataType, assay, diagnosis, tumorType, species, individualID, fileFormat, dataSubtype, nf1Genotype, nf2Genotype, fundingAgency, consortium FROM syn16858331 where resourceType = 'experimentalData'`,
            limit: 25,
            offset: 0,
          },
        },
        loadingScreen,
        rgbIndex,
        title: 'Data Files',
      },
    },
    {
      name: 'QueryWrapperFlattened',
      title: 'Metadata Files',
      columnName: 'studyId',
      tableSqlKeys: ['studyId'],
      props: {
        visibleColumnCount: 7,
        initQueryRequest: {
          partMask:
            SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
            SynapseConstants.BUNDLE_MASK_QUERY_COUNT |
            SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS |
            SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
            SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
          concreteType:
            'org.sagebionetworks.repo.model.table.QueryBundleRequest',
          entityId,
          query: {
            sql: `SELECT id, dataType, assay, diagnosis, tumorType, species, individualID, fileFormat, dataSubtype, nf1Genotype, nf2Genotype, fundingAgency, consortium FROM syn16858331 where resourceType ='report'`,
            limit: 25,
            offset: 0,
          },
        },
        loadingScreen,
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
        entityId: toolsEntityId,
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
        entityId: publicationsEntityId,
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
        entityId: studiesEntityId,
        ...studyCardConfiguration,
      },
    },
  ],
}

export default studies
