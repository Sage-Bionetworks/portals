import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import {
  targetEnablingResourcesExploreSql,
  targetEnablingResourcesDetailsPageSql,
} from '../resources'
import { SynapseTableProps } from 'synapse-react-client/dist/containers/table/SynapseTable'

// https://sagebionetworks.jira.com/wiki/spaces/PS/pages/2501607563/AMP-AD+Target+Enabling+Resources+Schema

const targetSchema: GenericCardSchema = {
  type: SynapseConstants.EXPERIMENTAL,
  title: 'title',
  description: 'summary',
  subTitle: 'contributing_center',
  link: 'link',
  secondaryLabels: ['target', 'related_target', 'program', 'grant'],
}

export const targetEnablingResourcesCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: targetSchema,
  labelLinkConfig: [
    {
      isMarkdown: false,
      matchColumnName: 'program',
      URLColumnName: 'Program',
      baseURL: 'Explore/Programs/DetailsPage',
    },
    {
      isMarkdown: false,
      matchColumnName: 'grant',
      URLColumnName: 'Grant Number',
      baseURL: 'Explore/Projects/DetailsPage',
    },
  ],
}

export const targetEnablingResourcesTableConfiguration: SynapseTableProps = {
  title: 'Target Enabling Resources',
  showAccessColumn: false,
  showDownloadColumn: false,
  columnLinks: [
    {
      matchColumnName: 'title',
      linkColumnName: 'link',
      isMarkdown: false,
    },
    {
      isMarkdown: false,
      matchColumnName: 'program',
      URLColumnName: 'Program',
      baseURL: 'Explore/Programs/DetailsPage',
    },
    {
      isMarkdown: false,
      matchColumnName: 'grant',
      URLColumnName: 'Grant Number',
      baseURL: 'Explore/Projects/DetailsPage',
    },
  ],
  hideDownload: true,
  isRowSelectionVisible: false,
}

const rgbIndex = 6
const unitDescription = 'Resources'

const targetEnablingResources: HomeExploreConfig = {
  homePageSynapseObject: {
    // Not currently used
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      unitDescription,
      sql: targetEnablingResourcesDetailsPageSql,
      name: 'Target Enabling Resources',
      shouldDeepLink: true,
      cardConfiguration: targetEnablingResourcesCardConfiguration,
      facetsToPlot: [
        'category',
        'target',
        'related_target',
        'program',
        'grant',
        'contributing_center',
      ],
      searchConfiguration: {
        searchable: [
          'title',
          'category',
          'target',
          'related_target',
          'program',
          'grant',
          'contributing_center',
          'page',
          'summary',
        ],
      },
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: targetEnablingResourcesExploreSql,
      visibleColumnCount: 7,
      name: 'Target Enabling Resources',
      shouldDeepLink: true,
      tableConfiguration: targetEnablingResourcesTableConfiguration,
      facetAliases: {
        related_target: 'Related Target',
        contributing_center: 'Contributing Center',
      },
      facetsToPlot: [
        'category',
        'target',
        'related_target',
        'program',
        'grant',
        'contributing_center',
      ],
      searchConfiguration: {
        searchable: [
          'title',
          'category',
          'target',
          'related_target',
          'program',
          'grant',
          'contributing_center',
          'page',
          'summary',
        ],
      },
    },
  },
}

export default targetEnablingResources
