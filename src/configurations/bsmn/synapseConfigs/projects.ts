import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { DetailsPageProps } from 'types/portal-util-types'
import { studiesSql, studyCardConfiguration } from './studies'
import { toolsSql, toolCardConfiguration } from './tools'
import { publicationsSql, publicationsCardConfiguration } from './publications'
import { peopleSql } from './people'

const unitDescription = 'Projects'
const rgbIndex = 7
export const projectsSql = 'SELECT * FROM syn21438208 ORDER BY ndaCollection'
export const projectsEntityId = 'syn21438208'
const entityId = projectsEntityId
const sql = projectsSql
const facet = 'Program'

export const projectCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  loadingScreen,
  genericCardSchema: {
    type: 'Project',
    title: 'title',
    subTitle: 'primaryInvestigators',
    description: 'abstract',
    secondaryLabels: [
      'grantNumber',
      'institution',
      'contributors',
      'ndaCollection',
    ],
  },
  secondaryLabelLimit: 4,
  labelLinkConfig: [
    {
      isMarkdown: true,
      matchColumnName: 'ndaCollection',
    },
  ],
  titleLinkConfig: {
    isMarkdown: false,
    URLColumnName: 'id',
    matchColumnName: 'id',
    baseURL: 'Explore/Projects/DetailsPage',
  },
}

const projects: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      facet,
      loadingScreen,
      link: 'Explore/Projects',
      linkText: 'Explore Projects',
      sql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql,
      name: 'Projects',
      cardConfiguration: projectCardConfiguration,
      shouldDeepLink: true,
      hideDownload: true,
      facetsToPlot: ['primaryInvestigators', 'grantNumber', 'institutions'],
      facetAliases: {
        ndaCollection: 'NDA Collection',
      },
      searchConfiguration: {
        searchable: [
          {
            columnName: 'title',
          },
          {
            columnName: 'primaryInvestigators',
          },
          {
            columnName: 'abstract',
          },
          {
            columnName: 'grantNumber',
          },
          {
            columnName: 'institution',
          },
          {
            columnName: 'contributors',
          },
          {
            columnName: 'ndaCollection',
          },
        ],
      },
    },
  },
}

export const projectsDetailsPageConfiguration: DetailsPageProps = {
  showMenu: true,
  sql,
  entityId,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      columnName: 'id',
      title: 'Studies',
      tableSqlKeys: ['project'],
      props: {
        sql: studiesSql,
        ...studyCardConfiguration,
      },
    },
    {
      name: 'CardContainerLogic',
      columnName: 'id',
      title: 'People',
      tableSqlKeys: ['project'],
      props: {
        sql: peopleSql,
        type: SynapseConstants.MEDIUM_USER_CARD,
      },
    },
    {
      name: 'CardContainerLogic',
      columnName: 'id',
      title: 'Tools',
      tableSqlKeys: ['project'],
      props: {
        sql: toolsSql,
        ...toolCardConfiguration,
      },
    },
    {
      name: 'CardContainerLogic',
      columnName: 'id',
      title: 'Publications',
      tableSqlKeys: ['project'],
      props: {
        sql: publicationsSql,
        ...publicationsCardConfiguration,
      },
    },
  ],
}

export default projects
