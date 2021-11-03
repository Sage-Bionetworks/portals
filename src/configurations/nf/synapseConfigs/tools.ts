import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'

import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { facetAliases } from './commonProps'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { toolsSql, observationsSql, investigatorSql, developmentPublicationSql,publicationCitationSql, fundingAgencySql, usageRequirementsSql, vendorSql, catalogNumberSql, mtaRequiredSql, toolApplicationsSql, mutationsSql, publicationsV2Sql } from '../resources'
import { DetailsPageProps } from 'types/portal-util-types'
import { publicationsV2CardConfiguration } from './publications'

export const newToolsSql = `${toolsSql} order by ROW_ID desc limit 3`

export const toolsSchema: GenericCardSchema = {
  type: SynapseConstants.EXPERIMENTAL_TOOL,
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
      synapseConfigArray: [
        {
          name: 'UserCardListRotate',
          title: 'Tool Origin',
          subtitle: 'Investigator',
          props: {
            sql: investigatorSql,
            count: 1,
            size: SynapseConstants.MEDIUM_USER_CARD,
            useQueryResultUserData: true,
            sqlOperator: '=',
          },
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id',
        },
        {
          name: 'SubsectionRowRenderer',
          outsideContainerClassName: 'home-spacer',
          props: {
            sql: developmentPublicationSql,
            isMarkdown: true,
            sqlOperator: '=',
          },
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id',
        },
        {
          name: 'SubsectionRowRenderer',
          outsideContainerClassName: 'home-spacer',
          props: {
            sql: publicationCitationSql,
            isMarkdown: true,
            sqlOperator: '=',
          },
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id',
        },
        {
          name: 'SubsectionRowRenderer',
          outsideContainerClassName: 'home-spacer',
          props: {
            sql: fundingAgencySql,
            isMarkdown: true,
            sqlOperator: '=',
          },
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id',
        },
        {
          name: 'SubsectionRowRenderer',
          title: 'Tool Availability',
          outsideContainerClassName: 'home-spacer',
          props: {
            sql: usageRequirementsSql,
            isMarkdown: true,
            sqlOperator: '=',
          },
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id',
        },
        {
          name: 'SubsectionRowRenderer',
          outsideContainerClassName: 'home-spacer',
          props: {
            sql: vendorSql,
            sqlOperator: '=',
            columnLink: {
              linkColumnName: 'Vendor Url',
              matchColumnName: 'Vendor',
              isMarkdown: false,
            },
            limit: 1,
          },
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id',
        },
        {
          name: 'SubsectionRowRenderer',
          outsideContainerClassName: 'home-spacer',
          props: {
            sql: catalogNumberSql,
            sqlOperator: '=',
            columnLink: {
              linkColumnName: 'Catalog Number URL',
              matchColumnName: 'Catalog Number',
              isMarkdown: false,
            }
          },
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id',
        },
        {
          name: 'SubsectionRowRenderer',
          outsideContainerClassName: 'home-spacer',
          props: {
            sql: mtaRequiredSql,
            sqlOperator: '=',
            columnNameIsSectionTitle: true,
            isMarkdown: true,
            friendlyValuesMap: {
              'no': 'A MTA is **not** required for usage of this resource.',
              'yes': 'A MTA is required for usage of this resource.',
              'unknown': 'It is unknown whether a MTA is required for usage of this resource.'
            }
          },
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id',
        },
        {
          name: 'SubsectionRowRenderer',
          outsideContainerClassName: 'home-spacer',
          props: {
            sql: toolApplicationsSql,
            columnNameIsSectionTitle: true,
            sqlOperator: '=',
            limit: 1,
          },
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id',
        },
        {
          name: 'StandaloneQueryWrapper',
          title: 'Mutations',
          props: {
            title: 'Mutations',
            unitDescription: 'Mutations',
            sqlOperator: '=',
            rgbIndex,
            name: 'Mutations',
            sql: mutationsSql,
          },
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id'
        },
        {
          name: 'CardContainerLogic',
          title: 'Publications',
          props: {
            limit: 3,
            facetAliases,
            sql: publicationsV2Sql,
            ...publicationsV2CardConfiguration,
          },
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id'
        },
        {
          name: 'Markdown',
          title: 'Submit an Observation',
          standalone: true,
          props: {
            ownerId: 'syn26338068',
            wikiId: '613438',
          },
        },
      ]
    },
    {
      title: "Observations",
      iconName: "database",
      cssClass: "tab-database",
      synapseConfigArray: [
        {
          name: 'CardContainerLogic',
          props: {
            sql: `${observationsSql} WHERE observationTime IS NOT NULL ORDER BY observationTime DESC`,
            type: SynapseConstants.OBSERVATION_CARD,
            limit: 3,
          },
          title: 'Experimental Tool Timeline',
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id',
        },
        {
          name: 'CardContainerLogic',
          props: {
            sql: `${observationsSql} WHERE observationTime IS NULL`,
            type: SynapseConstants.OBSERVATION_CARD,
            limit: 3,
          },
          title: 'Community Observations',
          tableSqlKeys: ['resourceId'],
          columnName: 'Resource_id',
        },
        {
          name: 'Markdown',
          title: 'Submit an Observation',
          standalone: true,
          props: {
            ownerId: 'syn26338068',
            wikiId: '613438',
          },
        },
      ]
    },
    {
      title: "Data",
      iconName: "database",
      cssClass: "tab-database",
      tabLayout: [
        {
          title: 'Data Files',
          synapseConfigArray: [
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
            //   tableSqlKeys: ['Resource_id'], // TODO: replace with the new resource annotation key name
            //   columnName: 'Resource_id'
            // },
          ],
        },
        // {
        //   title: 'Datasets',
        //   synapseConfigArray: [
        //     ...
        //   ],
        // },
        {
          title: 'Metadata Files',
          synapseConfigArray: [
            // {
            //   name: 'QueryWrapperPlotNav',
            //   props: {
            //     sqlOperator: '=',
            //     rgbIndex,
            //     name: 'Metadata Files',
            //     sql: metadataFilesSql,
            //     visibleColumnCount,
            //     tableConfiguration: {
            //       showAccessColumn: true,
            //       showDownloadColumn: true,
            //     },
            //     shouldDeepLink: false,
            //     facetAliases,
            //   },
            //   tableSqlKeys: ['Resource_id'], // TODO: replace with the new resource annotation key name
            //   columnName: 'Resource_id'
            // },
          ],
        },
      ]
    }
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
