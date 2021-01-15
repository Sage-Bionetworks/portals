import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { DetailsPageProps } from 'types/portal-util-types'
import { SynapseConstants } from 'synapse-react-client'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import studyHeaderSvg from '../style/study-header.svg'
import { studiesSql, dataSql } from '../resources'

const unitDescription = 'studies'
const rgbIndex = 0
const facet = 'Species'
export const studyCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  secondaryLabelLimit: 4,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Studies/DetailsPage',
    URLColumnName: 'Study',
    matchColumnName: 'Study',
  },
  labelLinkConfig: [
    {
      isMarkdown: false,
      matchColumnName: 'Program',
      URLColumnName: 'Program',
      baseURL: 'Explore/Programs/DetailsPage',
    },
  ],
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
      'Program',
      'Grant',
    ],
  },
}
const facetAliases = {
  Program: 'Program',
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
      facet,
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
      sql: studiesSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      facetAliases,
      sql: studiesSql,
      name: 'Studies',
      shouldDeepLink: true,
      cardConfiguration: studyCardConfiguration,
      searchConfiguration: {
        searchable: [
          'Study_Name',
          'Study_Description',
          'DataType_All',
          'Diagnosis_or_Model_System',
          'Data_Contributor',
          'Sample_Type',
          'Species',
          'Grant',
          'Program',          
        ],
      },
    },
  },
}

export const studiesDetailsPageProps: DetailsPageProps = {
  sql: studiesSql,
  sqlOperator: 'LIKE',
  tabLayout: [
    {
      title: "Study Details",
      iconName: "study",
    },
    {
      title: "Study Data",
      iconName: "database",
      cssClass: "tab-database"
    },
  ],
  synapseConfigArray: [
    {
      name: 'Markdown',
      columnName: 'Study',
      title: 'Study Description',
      props: {},
      tabIndex: 0,
    },
    {
      name: 'Markdown',
      columnName: 'Methods',
      title: 'Methods',
      props: {},
      resolveSynId: {
        title: true,
      },
      tabIndex: 0,
    },
    {
      name: 'Markdown',
      title: 'Acknowledgement',
      columnName: 'Acknowledgement',
      props: {},
      tabIndex: 0,
    },
    {
      name: 'CardContainerLogic',
      columnName: 'Related_Studies',
      title: 'Related Studies',
      tableSqlKeys: ['Study'],
      props: {
        sqlOperator: '=',
        sql: studiesSql,
        ...studyCardConfiguration,
      },
      tabIndex: 0,
    },
    {
      name: 'RssFeedCards',
      title: 'Recent Data Updates',
      columnName: 'Study',
      resolveSynId: {
        value: true,
      },
      props: {
        url: 'https://news.adknowledgeportal.org',
        itemsToShow:3,
        allowCategories: ['Data Release', 'News', 'Webinar'],
        // mailChimpListName: 'study specific list name????',
        // mailChimpUrl:'https://study specific url????'
        viewAllNewsButtonText: 'VIEW ALL DATA UPDATES',
      },
      tabIndex: 1,
    },
    {
      name: 'Markdown',
      title: 'Access Requirements',
      columnName: 'accessReqs',
      props: {},
      tabIndex: 1,
    },
    {
      name: 'Markdown',
      title: 'Study Metadata',
      columnName: 'studyMetadata',
      props: {},
      tabIndex: 1,
    },
    {
      name: 'StandaloneQueryWrapper',
      showTitleSeperator: false,
      columnName: 'Study',
      resolveSynId: {
        value: true,
      },
      tableSqlKeys: ['study'],
      props: {
        sql:
          "SELECT id, metadataType, dataType, assay FROM syn11346063 WHERE `dataSubtype` = 'metadata'",
        facetAliases,
        rgbIndex,
        unitDescription: 'Files',
        title: 'Metadata Files',
      },
      tabIndex: 1,
      className: 'metadata-table'
    },
    {
      name: "QueryWrapperPlotNav",
      tabIndex: 1,
      props: {
        sqlOperator: 'HAS',
        rgbIndex,
        name: 'Study Data',
        visibleColumnCount: 10,
        tableConfiguration: {
          showAccessColumn: true,
          showDownloadColumn: true,
          columnLinks: [
            {
              matchColumnName: 'study',
              isMarkdown: false,
              baseURL: 'Explore/Studies/DetailsPage',
              URLColumnName: 'Study_Name',
              wrapValueWithParens: true,
            },
          ],
        },
        sql: dataSql,
        shouldDeepLink: false,
      },
      resolveSynId: {
        value: true,
      },
      tableSqlKeys: ['study'],
      columnName: 'Study'
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
      sql: studiesSql,
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
    containerClassName: 'container-full-width',
  },
]
export default studies
