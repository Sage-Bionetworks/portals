import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { facetAliases, searchConfiguration } from './commonProps'

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
  filesSql,
  metadataFilesSql,
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
      'studyStatus',
      'dataStatus',
      'diseaseFocus',
      'manifestation',
      'fundingAgency',
      'institutions',
      'studyId',
      'grantDOI',
    ],
    dataTypeIconNames: 'dataType'
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
  columnIconOptions: {
    columns: {
      'dataStatus': {
        'Available': { icon: 'data', color: '#28A745' },
        'Partially Available': { icon: 'data', color: '#DE9A1F' },
        'Under Embargo': { icon: 'dataLocked', color: '#D46D1E' },
        'None': { icon: 'data', color: '#BBBBBC' },
      },
      'studyStatus': {
        'Active': { icon: 'reload', color: '#28A745' },
        'Completed': { icon: 'check', color: '#B2242A' },
      },
      'dataType': {
        'genomicVariants': { icon: 'geneVariants', label: 'Genomic Variants Data Available' },
        'geneExpression': { icon: 'geneExpression', label: 'Gene Expression Data Available' },
        'image': { icon: 'imaging', label: 'Image Data Available' },
        'drugScreen': { icon: 'lineGraph', label: 'Drug Screen (Cell) Data Available' },
        'behavior process': { icon: 'rat', label: 'Behavior Process Data Available' },
        'chromatinActivity': { icon: 'chromatin', label: 'Chromatin Activity Data Available' },
        'proteomics': { icon: 'proteomics', label: 'Proteomics Data Available' },
        'kinomics': { icon: 'kinomics', label: 'Kinomics Data Available' },
        'clinical': { icon: 'clinical', label: 'Clinical Data Available' },
        'other': { icon: 'other', label: 'Other Data Available' },
      }
    }
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
          'studyName',
          'summary',
          'studyLeads',
          'studyStatus',
          'dataStatus',
          'institutions',
          'diseaseFocus',
          'manifestation',
          'fundingAgency',
          'grantDOI',
        ],
      },
    },
  },
}

export const studiesDetailPage: DetailsPageProps = {
  showMenu: true,
  sql: studiesSql,
  tabLayout: [
    {
      title: "Study Details",
      iconName: "study",
    },
    {
      title: "Study Data",
      iconName: "database",
      cssClass: "tab-database"
    }
  ],
  synapseConfigArray: [
    {
      name: 'Markdown',
      columnName: 'accessRequirements',
      title: 'Access Requirements',
      injectMarkdown: true,
      props: {},
      tabIndex: 0,
    },
    {
      name: 'Markdown',
      columnName: 'acknowledgementStatements',
      title: 'Acknowledgement Statements',
      injectMarkdown: true,
      props: {},
      tabIndex: 0,
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
      tabIndex: 0,
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
      tabIndex: 0,
    },
    {
      name: 'CardContainerLogic',
      title: 'Related Studies',
      columnName: 'relatedStudies',
      tableSqlKeys: ['studyId'],
      props: {
        sqlOperator: 'LIKE',
        sql: studiesSql,
        facetAliases,
        ...studyCardConfiguration,
      },
      tabIndex: 0,
    },
    {
      name: 'QueryWrapperPlotNav',
      tabIndex: 1,
      props: {
        rgbIndex: 8,
        shouldDeepLink: false,
        sql: filesSql,
        visibleColumnCount: 7,
        sqlOperator: 'LIKE',
        tableConfiguration: {
          showAccessColumn: true,
          showDownloadColumn: true,
        },
        name: 'Data Files',
        facetAliases,
        searchConfiguration,
      },
      tableSqlKeys: ['studyId'],
      columnName: 'studyId',
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
      tabIndex: 1,
    },
    {
      name: 'StandaloneQueryWrapper',
      tabIndex: 1,
      title: 'Metadata Files',
      columnName: 'studyId',
      tableSqlKeys: ['studyId'],
      props: {
        visibleColumnCount: 7,
        sql: metadataFilesSql,
          rgbIndex,
        title: 'Metadata Files',
      },
      className: 'metadata-table',
    },
  ],
}

export default studies
