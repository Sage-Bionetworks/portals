import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { GenerateComponentsFromRowProps } from 'types/portal-util-types'
import { studiesSql, studyCardConfiguration, studiesEntityId } from './studies'
import { toolsSql, toolsEntityId, toolCardConfiguration } from './tools'
import {
  publicationsSql,
  publicationsEntityId,
  publicationsCardConfiguration,
} from './publications'

const unitDescription = 'Projects'
const rgbIndex = 4
export const projectsSql = 'SELECT * FROM syn21438208'
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
      'institutions',
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
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      facet,
      loadingScreen,
      link: 'Explore/Projects',
      linkText: 'Explore Projects',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: true,
          limit: 25,
          offset: 0,
        },
      },
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      entityId,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'title',
            hintText: 'Somatic mosaicism and autism',
          },
          {
            columnName: 'primaryInvestigators',
            hintText: 'LastName',
          },
          {
            columnName: 'abstract',
            hintText: 'Somatic mutations are de novo mutations',
          },
          {
            columnName: 'grantNumber',
            hintText: 'U01MH106876',
          },
          {
            columnName: 'institutions',
            hintText: 'Boston Children’s Hospital',
          },
          {
            columnName: 'contributors',
            hintText: 'LastName',
          },
        ],
      },
      name: 'Projects',
      unitDescription: 'Projects',
      cardConfiguration: projectCardConfiguration,
      menuConfig: [
        {
          sql,
        },
      ],
    },
  },
}

export const projectsDetailsPageConfiguration: GenerateComponentsFromRowProps = {
  showMenu: true,
  sql,
  entityId,
  synapseConfigArray: [
    {
      name: 'Markdown',
      columnName: 'accessRequirements',
      title: 'Access Requirements',
      injectMarkdown: true,
      props: {},
    },
    {
      name: 'CardContainerLogic',
      columnName: 'projectId',
      title: 'Studies',
      tableSqlKeys: ['projectId'],
      props: {
        sql: studiesSql,
        entityId: studiesEntityId,
        ...studyCardConfiguration,
      },
    },
    {
      name: 'CardContainerLogic',
      columnName: 'projectId',
      title: 'Tools',
      tableSqlKeys: ['projectId'],
      props: {
        sql: toolsSql,
        entityId: toolsEntityId,
        ...toolCardConfiguration,
      },
    },
    {
      name: 'CardContainerLogic',
      columnName: 'projectId',
      title: 'Publications',
      tableSqlKeys: ['projectId'],
      props: {
        sql: publicationsSql,
        entityId: publicationsEntityId,
        ...publicationsCardConfiguration,
      },
    },
    // {
    //   name: 'CardContainerLogic',
    //   columnName: 'projectId',
    //   tableSqlKeys: ['projectId'],
    //   title: 'Related Studies',
    //   props: {
    //     sqlOperator: 'LIKE',
    //     sql,
    //     entityId,
    //     ...projectCardConfiguration,
    //   },
    // },
  ],
}

export default projects
