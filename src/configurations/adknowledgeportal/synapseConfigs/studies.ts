import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { DetailsPageProps } from 'types/portal-util-types'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import studyHeaderSvg from '../style/study-header.svg'

const unitDescription = 'studies'
const rgbIndex = 0
export const studiesSql = 'SELECT * FROM syn17083367 ORDER BY isFeatured DESC'
const sql = studiesSql
const facet = 'Species'
export const studyCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  secondaryLabelLimit: 4,
  loadingScreen,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Studies/DetailsPage',
    URLColumnName: 'Study',
    matchColumnName: 'Study',
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
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      facet,
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
      sql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      facetAliases,
      loadingScreen,
      sql,
      name: 'Studies',
      shouldDeepLink: true,
      cardConfiguration: studyCardConfiguration,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'Study_Name',
          },
          {
            columnName: 'Study_Description',
          },
          {
            columnName: 'DataType_All',
          },
          {
            columnName: 'Diagnosis_or_Model_System',
          },
          {
            columnName: 'Data_Contributor',
          },
          {
            columnName: 'Sample_Type',
          },
          {
            columnName: 'Species',
          },
          {
            columnName: 'Grant',
          },
          {
            columnName: 'Consortium',
          },
        ],
      },
    },
  },
}

export const studiesDetailsPageProps: DetailsPageProps = {
  sql: studiesSql,
  sqlOperator: 'LIKE',
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
      name: 'StandaloneQueryWrapper',
      title: 'Study Metadata',
      columnName: 'Study',
      resolveSynId: {
        value: true,
      },
      tableSqlKeys: ['study'],
      props: {
        sql:
          "SELECT id, metadataType, dataType, assay FROM syn11346063 WHERE `dataSubtype` = 'metadata'",
        loadingScreen,
        facetAliases,
        rgbIndex,
        unitDescription: 'Files',
        title: 'Metadata Files',
      },
    },
    {
      name: 'StandaloneQueryWrapper',
      title: 'Study Data',
      columnName: 'Study',
      resolveSynId: {
        value: true,
      },
      tableSqlKeys: ['study'],
      props: {
        sql:
          "SELECT `resourceType`,`dataType`, `assay`, COUNT(`id`) AS `Files` FROM syn11346063 WHERE  (`dataSubtype` <> 'metadata' OR `dataSubtype` IS NULL) GROUP BY 1, 2,3 ORDER BY 4 DESC",
        loadingScreen,
        facetAliases,
        rgbIndex,
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
        ...studyCardConfiguration,
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
      ...studyCardConfiguration,
      sql,
      facetAliases,
      isAlignToLeftNav: true,
      secondaryLabelLimit: Infinity,
      backgroundColor: '#5bb0b5',
      iconOptions: {
        study: studyHeaderSvg,
      },
    },
  },
  {
    name: 'DetailsPage',
    isOutsideContainer: false,
    props: studiesDetailsPageProps,
  },
]
export default studies
