import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'

import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { facetAliases } from './commonProps'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { toolsSql, observationsSql, investigatorSql } from '../resources'
import { DetailsPageProps } from 'types/portal-util-types'

export const newToolsSql = `${toolsSql} order by ROW_ID desc limit 3`

export const toolsSchema: GenericCardSchema = {
  type: 'TOOL',
  icon: 'icon', // TODO: use a column to determine what icon to show?
  title: 'Resource Name',
  subTitle: 'Resource Type',
  description: 'Description',
  secondaryLabels: [
    'rrid',
    'Synonyms',
  ],
}

export const toolsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Tools/DetailsPage',
    URLColumnName: 'Resource_id',
    matchColumnName: 'Resource_id',
  },
  genericCardSchema: toolsSchema,
}
const rgbIndex = 6
const tools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      unitDescription: 'Tools',
      link: 'Explore/Tools',
      linkText: 'Explore Tools',
      facet: 'type',
      sql: toolsSql,
      facetAliases,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: toolsSql,
      shouldDeepLink: true,
      name: 'Tools',
      cardConfiguration: toolsCardConfiguration,
      facetAliases,
      searchConfiguration: {
        searchable: [
        ],
      },
    },
  },
}

export const toolDetailsPageConfig: DetailsPageProps = {
  sql: toolsSql,
  sqlOperator: '=',
  tabLayout: [
    {
      title: "Details",
      iconName: "study",
    },
    {
      title: "Observations",
      iconName: "database",
      cssClass: "tab-database"
    },
    {
      title: "Data",
      iconName: "database",
      cssClass: "tab-database"
    }

  ],
  synapseConfigArray: [
    {
      name: 'UserCardListRotate',
      title: 'Investigator',
      outsideContainerClassName: 'home-spacer',
      props: {
        sql: investigatorSql,
        count: 1,
        size: SynapseConstants.MEDIUM_USER_CARD,
        useQueryResultUserData: true,
        sqlOperator: '=',
      },
      tableSqlKeys: ['Resource_id'],
      columnName: 'Resource_id',
      tabIndex: 0,
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql: `${observationsSql} WHERE "Observation Time" IS NOT NULL ORDER BY "Observation Time" DESC`,
        type: SynapseConstants.OBSERVATION_CARD,
        limit: 3,
      },
      title: 'Experimental Tool Timeline',
      tableSqlKeys: ['Resource_id'],
      columnName: 'Resource_id',
      tabIndex: 1,
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql: `${observationsSql} WHERE "Observation Time" IS NULL`,
        type: SynapseConstants.OBSERVATION_CARD,
        limit: 3,
      },
      title: 'Community Observations',
      tableSqlKeys: ['Resource_id'],
      columnName: 'Resource_id',
      tabIndex: 1,
    },
    // {
    //   name: 'QueryWrapperPlotNav',
    //   props: {
    //     sqlOperator: '=',
    //     rgbIndex,
    //     name: 'Files',
    //     sql: filesSql,
    //     visibleColumnCount,
    //     tableConfiguration: {
    //       showAccessColumn: true,
    //       showDownloadColumn: true,
    //     },
    //     shouldDeepLink: false,
    //     facetAliases,
    //   },
    //   tabIndex: 2,
    //   tableSqlKeys: ['Resource_id'], // TODO: replace with the new resource annotation key name
    //   columnName: 'Resource_id'
    // },
  ],
}

export const toolsDetailsPage: SynapseConfig[] = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      sql: toolsSql,
      type: SynapseConstants.GENERIC_CARD,
      genericCardSchema: toolsSchema,
      isHeader: true,
    },
  },
  {
    name: 'DetailsPage',
    props: toolDetailsPageConfig,
    containerClassName: 'container-full-width',
  },
]

export default tools
