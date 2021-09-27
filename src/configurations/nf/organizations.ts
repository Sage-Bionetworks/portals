import { SynapseConstants } from 'synapse-react-client'
import { DetailsPageProps } from 'types/portal-util-types'
import { SynapseConfig } from 'types/portal-config'
import { facetAliases, searchConfiguration } from './synapseConfigs/commonProps'
import { publicationsCardConfiguration } from './synapseConfigs/publications'
import { studyCardConfiguration } from './synapseConfigs/studies'
import { filesSql, fundersSql, studiesSql, datasetsSql, publicationsSql } from './resources'
import { CardLink } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'

export const organizationDetailsPageConfig: DetailsPageProps = {
  sql: fundersSql,
  tabLayout: [
    {
      title: "Organization Details",
      iconName: "study",
    },
    {
      title: "Organization Data",
      iconName: "database",
      cssClass: "tab-database"
    }
  ],
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
          sql: studiesSql,
          limit: 3,
          ...studyCardConfiguration,
      },
      title: 'Funded Studies',
      columnName: 'fundingAgency',
      tableSqlKeys: ['fundingAgency'],
      tabIndex: 0,
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql: publicationsSql,
        limit: 3,
        ...publicationsCardConfiguration,
        sqlOperator: 'LIKE',
      },
      title: 'Publications',
      columnName: 'fundingAgency',
      tableSqlKeys: ['fundingAgency'],
      tabIndex: 0,
    },
    {
      name: 'Markdown',
      props: {
        ownerId: 'syn22272075',
        wikiId: '604853',
      },
      title: 'Funding Impact',
      standalone: true,
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
      tableSqlKeys: ['fundingAgency'],
      columnName: 'fundingAgency',
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql: datasetsSql,
        limit: 3,
        type: SynapseConstants.DATASET,
      },
      columnName: 'fundingAgency',
      title: 'Datasets',
      tableSqlKeys: ['fundingAgency'],
      tabIndex: 1,
    },
  ],
}

export const organizationDetailsPageLinkConfig: CardLink = {
  matchColumnName: 'abbreviation',
  isMarkdown: false,
  baseURL: 'Organizations/DetailsPage',
  URLColumnName: 'abbreviation',
}

export const organizationCardSchema: GenericCardSchema = {
  title: 'organizationName',
  type: SynapseConstants.ORGANIZATION,
  description: 'summary',
  icon: 'abbreviation',
  link: 'website',
  thumbnailRequiresPadding: true
}

export const organizationDetailsPage: SynapseConfig[] = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      sql: fundersSql,
      type: SynapseConstants.GENERIC_CARD,
      genericCardSchema: { ...organizationCardSchema,        
        imageFileHandleColumnName: 'headerLogo',      
      },
      isHeader: true,
    },
  },
  {
    name: 'DetailsPage',
    props: organizationDetailsPageConfig,
    containerClassName: 'container-full-width',
  },
]
