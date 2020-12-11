import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { computationalSql, projectsSql, publicationsSql, studiesSql, toolSql, peopleSql } from '../resources'
import { DetailsPageProps } from 'types/portal-util-types'
import { studyCardConfiguration } from './studies'
import { publicationCardProps } from './publications'
import { experimentalToolsCardConfiguration } from './experimental_tools'
import { computationalCardConfiguration } from './computational_tools'

const unitDescription = 'Projects'
const rgbIndex = 4
const facet = 'Program'

export const projectCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: 'Project',
    title: 'Name',
    subTitle: 'Principal Investigators',
    description: 'Abstract',
    secondaryLabels: [
      'Institutions',
      'Program',
      'Grant Number',
    ],
  },
  secondaryLabelLimit: 4,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Projects/DetailsPage',
    URLColumnName: 'Grant Number',
    matchColumnName: 'Grant Number',
  },
}

export const projectsDetailsPageConfiguration: DetailsPageProps = {
  showMenu: true,
  sql: projectsSql,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      title: 'People',
      columnName: 'Grant Number',
      tableSqlKeys: ['Grant Number'],
      props: {        
        sql: peopleSql,
        type: SynapseConstants.MEDIUM_USER_CARD,
      },
    },
    {
      name: 'CardContainerLogic',
      columnName: 'Grant Number',
      title: 'Studies',
      tableSqlKeys: ['Grant Number'],
      props: {
        ...studyCardConfiguration,
        sql: studiesSql,
      },
    },
    {
      name: 'CardContainerLogic',
      columnName: 'Grant Number',
      title: 'Publications',
      showTitleSeperator: false,
      tableSqlKeys: ['long_amp_ad_grants'],
      props: {
        sql: publicationsSql,
        ...publicationCardProps,
      },
    },
    {
      name: 'CardContainerLogic',
      columnName: 'Grant Number',
      title: 'Experimental Tools',
      showTitleSeperator: false,
      tableSqlKeys: ['grant'],
      props: {
        sql: toolSql,
        ...experimentalToolsCardConfiguration,
      },
    },
    {
      name: 'CardContainerLogic',
      columnName: 'Grant Number',
      title: 'Computational Tools',
      showTitleSeperator: false,
      tableSqlKeys: ['grant'],
      props: {
        sql: computationalSql,
        ...computationalCardConfiguration,
      },
    },

  ],
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
      shouldDeepLink: true,
      name: 'Projects',
      cardConfiguration: projectCardConfiguration,
      // unitDescription: 'Projects',
      searchConfiguration: {
        searchable: [
          'Name',
          'Grant Number',
          'Program',
          'Principal Investigators',
          'Institutions',
          'Abstract'
        ],
      },
    },
  },
}

export default projects
