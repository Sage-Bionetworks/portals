import { GenericRoute } from 'types/portal-config'
import {
  publications,
  files,
  datasets,
  grants,
  projects,
  tools,
} from './synapseConfigs'
import { SynapseConstants } from 'synapse-react-client'
import {
  projectsSql,
  projectCardConfiguration,
  projectsEntityId,
} from './synapseConfigs/projects'
import { publicationSql } from './synapseConfigs/publications'
import {
  datasetsSql,
  datasetCardConfiguration,
  datasetsEntityId,
} from './synapseConfigs/datasets'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import loadingScreen from './loadingScreen'
import {
  toolsConfiguration,
  toolsSql,
  toolsEntityId,
} from './synapseConfigs/tools'
import { filesSql, filesEntityId } from './synapseConfigs/files'
import DatasetSvg from './style/Dataset.svg'
import {
  publicationsCardConfiguration,
  publicationEntityId,
} from './synapseConfigs/publications'
import {
  grantsCardConfiguration,
  grantsEntityId,
  grantsSql,
} from './synapseConfigs/grants'
import { toolsCardConfiguration } from 'configurations/nf/synapseConfigs/tools'
const homeLimit = 3

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'StatefulButtonControlWrapper',
        title: 'EXPLORE PORTAL',
        props: {
          colors: [
            '#47337D',
            '#407BA0',
            '#7798AC',
            '#77BBBF',
            '#58A158',
            '#3C4A63',
          ],
          configs: [
            {
              name: 'Grants',
              synapseConfigArray: [grants.homePageSynapseObject],
            },
            {
              name: 'Projects',
              synapseConfigArray: [projects.homePageSynapseObject],
            },
            {
              name: 'Publications',
              synapseConfigArray: [publications.homePageSynapseObject],
            },
            {
              name: 'Datasets',
              synapseConfigArray: [datasets.homePageSynapseObject],
            },
            {
              name: 'Files',
              synapseConfigArray: [files.homePageSynapseObject],
            },
            {
              name: 'Tools',
              synapseConfigArray: [tools.homePageSynapseObject],
            },
          ],
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE PROJECTS',
        link: 'Explore/Projects',
        props: {
          loadingScreen,
          entityId: projectsEntityId,
          sql: projectsSql,
          ...projectCardConfiguration,
          limit: homeLimit,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE PUBLICATIONS',
        link: 'Explore/Publications',
        props: {
          loadingScreen,
          entityId: publicationEntityId,
          sql: publicationSql,
          ...publicationsCardConfiguration,
          limit: homeLimit,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE DATASETS',
        link: 'Explore/Datasets',
        props: {
          loadingScreen,
          sql: datasetsSql,
          entityId: datasetsEntityId,
          limit: homeLimit,
          ...datasetCardConfiguration,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE TOOLS',
        link: 'Explore/Tools',
        props: {
          loadingScreen,
          entityId: toolsEntityId,
          sql: toolsSql,
          limit: homeLimit,
          ...toolsConfiguration,
        },
      },
    ],
  },
  {
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: 'Grants',
        to: '/Explore/Grants',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: grants.explorePageSynapseObject,
            },
          },
        ],
        programmaticRouteConfig: [
          {
            name: 'CardContainerLogic',
            isOutsideContainer: true,
            props: {
              isHeader: true,
              backgroundColor: '#407ba0',
              entityId: grantsEntityId,
              ...grantsCardConfiguration,
              secondaryLabelLimit: Infinity,
              sql: grantsSql,
            },
          },
          {
            name: 'GenerateComponentsFromRow',
            props: {
              sql: grantsSql,
              sqlOperator: 'LIKE',
              entityId: grantsEntityId,
              synapseConfigArray: [
                {
                  name: 'CardContainerLogic',
                  columnName: 'grantName',
                  title: 'Related Projects',
                  tableSqlKeys: ['grantName'],
                  props: {
                    sqlOperator: 'LIKE',
                    sql: projectsSql,
                    entityId: projectsEntityId,
                    ...projectCardConfiguration,
                  },
                },
                {
                  name: 'CardContainerLogic',
                  columnName: 'grantName',
                  title: 'Related Publications',
                  tableSqlKeys: ['grantName'],
                  props: {
                    sqlOperator: 'LIKE',
                    sql: publicationSql,
                    entityId: publicationEntityId,
                    ...publicationsCardConfiguration,
                  },
                },
                {
                  name: 'CardContainerLogic',
                  columnName: 'grantName',
                  title: 'Related Datasets',
                  tableSqlKeys: ['grantName'],
                  props: {
                    sqlOperator: 'LIKE',
                    sql: datasetsSql,
                    entityId: datasetsEntityId,
                    ...datasetCardConfiguration,
                  },
                },
                {
                  name: 'CardContainerLogic',
                  columnName: 'grantName',
                  title: 'Related Tools',
                  tableSqlKeys: ['grantName'],
                  props: {
                    sqlOperator: 'LIKE',
                    sql: toolsSql,
                    entityId: toolsEntityId,
                    ...toolsCardConfiguration,
                  },
                },
              ],
            },
          },
        ],
      },
      {
        name: 'Projects',
        to: '/Explore/Projects',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: projects.explorePageSynapseObject,
            },
          },
        ],
        programmaticRouteConfig: [
          {
            name: 'CardContainerLogic',
            isOutsideContainer: true,
            props: {
              isHeader: true,
              backgroundColor: '#407ba0',
              entityId: projectsEntityId,
              loadingScreen,
              ...projectCardConfiguration,
              secondaryLabelLimit: Infinity,
              sql: projectsSql,
            },
          },
          {
            name: 'QueryWrapperFlattened',
            title: 'Data',
            props: {
              initQueryRequest: {
                partMask:
                  SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
                  SynapseConstants.BUNDLE_MASK_QUERY_COUNT |
                  SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS |
                  SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
                entityId: filesEntityId,
                concreteType:
                  'org.sagebionetworks.repo.model.table.QueryBundleRequest',
                query: {
                  sql: filesSql,
                  selectedFacets: [],
                  isConsistent: true,
                  limit: 25,
                  offset: 0,
                },
              },
              loadingScreen,
              rgbIndex: 1,
              unitDescription: 'Files',
              title: 'Study Files',
            },
          },
        ],
      },
      {
        name: 'Publications',
        to: '/Explore/Publications',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: publications.explorePageSynapseObject,
            },
          },
        ],
        programmaticRouteConfig: [
          {
            name: 'CardContainerLogic',
            isOutsideContainer: true,
            props: {
              isHeader: true,
              backgroundColor: '#407ba0',
              entityId: publicationEntityId,
              ...publicationsCardConfiguration,
              secondaryLabelLimit: Infinity,
              sql: publicationSql,
            },
          },
        ],
      },
      {
        name: 'Datasets',
        to: '/Explore/Datasets',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: datasets.explorePageSynapseObject,
            },
          },
        ],
        programmaticRouteConfig: [
          {
            name: 'CardContainerLogic',
            isOutsideContainer: true,
            props: {
              isHeader: true,
              backgroundColor: '#5bb0b5',
              sqlOperator: '=',
              ...datasetCardConfiguration,
              secondaryLabelLimit: Infinity,
              entityId: datasetsEntityId,
              sql: datasetsSql,
              iconOptions: {
                dataset: DatasetSvg,
              },
            },
          },
          {
            name: 'QueryWrapperFlattened',
            title: 'Data',
            props: {
              initQueryRequest: {
                entityId: filesEntityId,
                partMask:
                  SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
                  SynapseConstants.BUNDLE_MASK_QUERY_COUNT |
                  SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS |
                  SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
                concreteType:
                  'org.sagebionetworks.repo.model.table.QueryBundleRequest',
                query: {
                  sql: filesSql,
                  selectedFacets: [],
                  isConsistent: true,
                  limit: 25,
                  offset: 0,
                },
              },
              loadingScreen,
              sqlOperator: '=',
              rgbIndex: 0,
              unitDescription: 'Files',
              title: 'Dataset Files',
            },
          },
        ],
      },
      {
        name: 'Files',
        to: '/Explore/Files',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: files.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        name: 'Tools',
        to: '/Explore/Tools',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: tools.explorePageSynapseObject,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'About',
    to: '/About',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn7080714',
          wikiId: '470467',
        },
      },
    ],
  },
]

export default routes
