import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { facetAliases } from './commonProps'

import hackathonActiveSvg from '../style/hackathon-active.svg'
import hackathonCompleteSvg from '../style/hackathon-complete.svg'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { DetailsPageProps } from 'types/portal-util-types'
import {
  hackathonsSql,
} from '../resources'

const type = SynapseConstants.GENERIC_CARD
const unitDescription = 'Hackathon Projects'
const rgbIndex = 5

export const hackathonCardConfiguration: CardConfiguration = {
  type,
  labelLinkConfig: {
    isMarkdown: true,
    matchColumnName: 'doi',
  },
  genericCardSchema: {
    title: 'name',
    type: 'Hackathon',
    description: 'summary',
    // subTitle: 'subTitle',
    icon: 'studyStatus',
    secondaryLabels: [
      'studyLeads',
      'institutions',
      'studyStatus',
      'diseaseFocus',
      'manifestation',
      'fundingAgency',
      'doi',
      'onSynapse',
    ],
    dataTypeIconNames: 'dataType',
  },
  iconOptions: {
    Active: hackathonActiveSvg,
    Completed: hackathonCompleteSvg,
  },
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Hackathon/DetailsPage',
    URLColumnName: 'id',
    matchColumnName: 'id',
  },
  columnIconOptions: {
    columns: {
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

const hackathons: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      facetAliases,
      unitDescription,
      rgbIndex,
      link: 'Explore/Hackathon%20Projects',
      linkText: 'Explore Hackathon Projects',
      facet: 'diseaseFocus',
      sql: hackathonsSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: hackathonsSql,
      name: 'Hackathon Projects',
      shouldDeepLink: true,
      cardConfiguration: hackathonCardConfiguration,
      facetAliases: {...facetAliases, studyStatus: 'Status'},
      searchConfiguration: {
        searchable: [
          'name',
          'summary',
          'studyStatus',
          'institutions',
          'diseaseFocus',
          'fundingAgency',
          'manifestation',
        ],
      },
    },
  },
}

export const hackathonsDetailPage: DetailsPageProps = {
  showMenu: true,
  sql: hackathonsSql,
  sqlOperator: '=',
  tabLayout: [
    {
      title: "Background & Results",
      iconName: "chart",
    },
    {
      title: "Methodology",
      iconName: "database",
      cssClass: "tab-database"
    }
  ],
  synapseConfigArray: [
    {
      name: 'Markdown',
      columnName: 'tab1wikipointer',
      title: '',
      injectMarkdown: false,
      props: {},
      tabIndex: 0,
    },
    {
      name: 'Markdown',
      columnName: 'acknowledgementStatements',
      title: 'Acknowledgements',
      injectMarkdown: true,
      props: {},
      tabIndex: 0,
    },
    {
      name: 'Markdown',
      columnName: 'tab2wikipointer',
      title: '',
      injectMarkdown: false,
      props: {},
      tabIndex: 1,
    },

  ],
}

export default hackathons
