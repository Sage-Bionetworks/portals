import { SynapseConstants } from 'synapse-react-client'
import { DetailsPageProps } from 'types/portal-util-types'
import { SynapseConfig } from 'types/portal-config'
import { facetAliases, searchConfiguration } from './synapseConfigs/commonProps'
import { publicationsCardConfiguration } from './synapseConfigs/publications'
import { studyCardConfiguration } from './synapseConfigs/studies'
import { iconOptions } from './synapseConfigs/iconOptions'
import { filesSql } from './resources'

const studiesSql = `SELECT * FROM syn16787123`
const datasetsSql = `SELECT * FROM syn16859580`
const publicationsSql = `SELECT * FROM syn16857542`

export const organizationDetailsPageConfig: DetailsPageProps = {
  sql: 'SELECT * FROM syn16858699',
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
        type: SynapseConstants.DATASET,
      },
      columnName: 'fundingAgency',
      title: 'Datasets',
      tableSqlKeys: ['fundingAgency'],
      tabIndex: 1,
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
        icon: 'abbreviation',
        link: 'website',
      },
      iconOptions,
      isHeader: true,
      backgroundColor: '#125E81',
    },
  },
  {
    name: 'DetailsPage',
    props: organizationDetailsPageConfig,
    containerClassName: 'container-full-width',
  },
]
