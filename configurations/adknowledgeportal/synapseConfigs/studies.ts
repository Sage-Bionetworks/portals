import { HomeExploreConfig, SynapseConfig } from '../../types/portal-config'
import { GenerateComponentsFromRowProps } from '../../types/portal-util-types'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import studyHeaderSvg from '../style/study-header.svg'

const unitDescription = 'studies'
const rgbIndex = 0
export const studiesSql = 'SELECT * FROM syn17083367'
const sql = studiesSql
const facet = 'Species'
export const studyCardProps: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  secondaryLabelLimit: 4,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Studies',
    URLColumnNames: ['Study'],
  },
  genericCardSchema: {
    type: SynapseConstants.STUDY,
    title: 'Study_Name',
    subTitle: 'Data_Contributor',
    icon: 'Access_Type',
    description: 'Study_Description',
    secondaryLabels: [
      'DataType_All',
      'Diagnosis_or_Model_System',
      'Number_Of_Individuals',
      'Sample_Type',
      'Species',
      'Cohort_Type',
      'Study_Status',
      'Consortium',
      'Grant',
    ],
  },
}
const facetAliases = {
  Consortium: 'Program',
  DataType_All: 'Data Types',
  Data_Contributor: 'Data Contributor',
  Study_Description: 'Study Description',
  Study_Name: 'Study Name',
  Diagnosis_or_Model_System: 'Diagnosis',
  Number_of_Individuals: 'Individuals',
  Sample_Type: 'Tissue',
}
const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      facet,
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
      initQueryRequest: {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: false,
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
      facetAliases,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      name: 'Studies',
      isConsistent: false,
      cardConfiguration: studyCardProps,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'Consortium',
            hintText: 'AMP-AD',
          },
          {
            columnName: 'Data_Contributor',
            hintText: 'LastName',
          },
          {
            columnName: 'DataType_All',
            hintText: 'Gene Expression',
          },
          {
            columnName: 'Diagnosis_or_Model_System',
            hintText: 'LOAD',
          },
          {
            columnName: 'Grant',
            hintText: 'U01AG046139',
          },
          {
            columnName: 'Sample_Type',
            hintText: 'Temporal Cortex',
          },
          {
            columnName: 'Species',
            hintText: 'Drosophila',
          },
          {
            columnName: 'Study_Description',
            hintText: 'RNAseq',
          },
          {
            columnName: 'Study_Name',
            hintText: 'Mayo',
          },
        ],
      },
      menuConfig: [
        {
          sql,
          facet,
        },
        {
          sql,
          facet: 'Grant',
        },
        {
          sql,
          facet: 'Consortium',
          facetAliases: 'Program',
        },
        {
          sql,
        },
      ],
    },
  },
}

export const studiesGenerateComponentsFromRowProps: GenerateComponentsFromRowProps = {
  sql: studiesSql,
  sqlOperator: '=',
  synapseConfigArray: [
    {
      name: 'Markdown',
      columnName: 'Study',
      title: 'Study Description',
      props: {},
    },
    {
      name: 'Markdown',
      // https://www.synapse.org/#!Synapse:syn12666371/wiki/595380
      title: 'Access Requirements',
      standalone: true,
      props: {
        ownerId: 'syn12666371',
        wikiId: '595380',
      },
    },
    {
      name: 'Markdown',
      columnName: 'Methods',
      title: 'Methods',
      props: {},
      resolveSynId: {
        title: true,
      },
    },
    {
      name: 'QueryWrapperFlattened',
      title: 'Study Metadata',
      columnName: 'Study',
      resolveSynId: {
        value: true,
      },
      tableSqlKeys: ['study'],
      props: {
        initQueryRequest: {
          partMask:
            SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
            SynapseConstants.BUNDLE_MASK_QUERY_COUNT |
            SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS |
            SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
          concreteType:
            'org.sagebionetworks.repo.model.table.QueryBundleRequest',
          query: {
            sql:
              "SELECT id, metadataType, dataType, assay FROM syn11346063 WHERE `dataSubtype` = 'metadata'",
            isConsistent: true,
            limit: 25,
            offset: 0,
          },
        },
        loadingScreen,
        facetAliases,
        rgbIndex,
        unitDescription: 'Files',
        synapseId: 'syn11346063',
        title: 'Metadata Files',
      },
    },
    {
      name: 'QueryWrapperFlattened',
      title: 'Study Data',
      columnName: 'Study',
      resolveSynId: {
        value: true,
      },
      tableSqlKeys: ['study'],
      props: {
        initQueryRequest: {
          partMask:
            SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
            SynapseConstants.BUNDLE_MASK_QUERY_COUNT |
            SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS |
            SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
            SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
          concreteType:
            'org.sagebionetworks.repo.model.table.QueryBundleRequest',
          query: {
            sql:
              "SELECT `resourceType`,`dataType`, `assay`, COUNT(`id`) AS `Files` FROM syn11346063 WHERE  (`dataSubtype` <> 'metadata') GROUP BY 1, 2,3 ORDER BY 4 DESC",
            isConsistent: true,
            limit: 25,
            offset: 0,
          },
        },
        loadingScreen,
        facetAliases,
        rgbIndex,
        synapseId: 'syn11346063',
        title: 'Data Files',
      },
    },
    {
      name: 'Markdown',
      // https://www.synapse.org/#!Synapse:syn12666371/wiki/595381
      title: 'Data Updates',
      standalone: true,
      props: {
        ownerId: 'syn12666371',
        wikiId: '595381',
      },
    },
    {
      name: 'CardContainerLogic',
      columnName: 'Related_Studies',
      title: 'Related Studies',
      tableSqlKeys: ['Study'],
      props: {
        sqlOperator: '=',
        sql,
        ...studyCardProps,
      },
    },
  ],
}

export const studiesProgrammaticRouteConfig: SynapseConfig[] = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      isHeader: true,
      ...studyCardProps,
      sql,
      facetAliases,
      secondaryLabelLimit: Infinity,
      backgroundColor: '#5bb0b5',
      iconOptions: {
        study: studyHeaderSvg,
      },
    },
  },
  {
    name: 'GenerateComponentsFromRow',
    isOutsideContainer: false,
    props: studiesGenerateComponentsFromRowProps,
  },
]
export default studies
