import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { DetailsPageProps } from 'types/portal-util-types'
import { studyCardConfiguration } from './studies'
import { toolCardConfiguration } from './tools'
import { publicationsCardConfiguration } from './publications'
import {
  peopleSql,
  projectsSql,
  studiesSql,
  toolsSql,
  publicationsSql,
} from '../resources'

const unitDescription = 'Projects'
const rgbIndex = 7
const facet = 'Program'

export const projectCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
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
      link: 'Explore/Projects',
      linkText: 'Explore Projects',
      sql: projectsSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: projectsSql,
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
          'title',
          'primaryInvestigators',
          'abstract',
          'grantNumber',
          'institution',
          'contributors',
          'ndaCollection',
        ],
      },
    },
  },
}

export const projectsDetailsPageConfiguration: DetailsPageProps = {
  showMenu: true,
  sql: projectsSql,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      columnName: 'id',
      title: 'Data',
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
