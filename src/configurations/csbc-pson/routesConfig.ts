import { GenericRoute } from 'src/types/portal-config'
import {
  publications,
  files,
  datasets,
  grants,
  studies,
  tools,
} from './synapseConfigs'
import { SynapseConstants } from 'synapse-react-client'
import {
  studiesSql,
  studyCardConfiguration,
  studiesEntityId,
} from './synapseConfigs/studies'
import { facetAliases } from './synapseConfigs/commonProps'
import { publicationSql } from './synapseConfigs/publications'
import {
  datasetsSql,
  datasetCardConfiguration,
  datasetsEntityId,
} from './synapseConfigs/datasets'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import loadingScreen from './loadingScreen'
import { toolsSchema, toolsSql, toolsEntityId } from './synapseConfigs/tools'
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
        containerClassName: 'home-explore-container',
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
              name: 'Publications',
              synapseConfigArray: [publications.homePageSynapseObject],
            },
            {
              name: 'Studies',
              synapseConfigArray: [studies.homePageSynapseObject],
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
        title: 'EXPLORE STUDIES',
        link: 'Explore/Studies',
        props: {
          loadingScreen,
          facetAliases,
          entityId: studiesEntityId,
          sql: studiesSql,
          ...studyCardConfiguration,
          limit: homeLimit,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE PUBLICATIONS',
        link: 'Explore/Publications',
        props: {
          loadingScreen,
          facetAliases,
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
          facetAliases,
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
          facetAliases,
          entityId: toolsEntityId,
          sql: toolsSql,
          limit: homeLimit,
          type: SynapseConstants.GENERIC_CARD,
          genericCardSchema: toolsSchema,
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
                  columnName: 'centerName',
                  title: 'Related Publications',
                  tableSqlKeys: ['centerName'],
                  props: {
                    sqlOperator: 'LIKE',
                    sql: publicationSql,
                    entityId: publicationEntityId,
                    ...publicationsCardConfiguration,
                  },
                },
                {
                  name: 'CardContainerLogic',
                  columnName: 'centerName',
                  title: 'Related Studies',
                  tableSqlKeys: ['centerName'],
                  props: {
                    sqlOperator: 'LIKE',
                    sql: studiesSql,
                    entityId: studiesEntityId,
                    ...studyCardConfiguration,
                  },
                },
                {
                  name: 'CardContainerLogic',
                  columnName: 'centerName',
                  title: 'Related Datasets',
                  tableSqlKeys: ['centerName'],
                  props: {
                    sqlOperator: 'LIKE',
                    sql: datasetsSql,
                    entityId: datasetsEntityId,
                    ...datasetCardConfiguration,
                  },
                },
              ],
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
              facetAliases,
              ...publicationsCardConfiguration,
              secondaryLabelLimit: Infinity,
              sql: publicationSql,
            },
          },
        ],
      },
      {
        name: 'Studies',
        to: '/Explore/Studies',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: studies.explorePageSynapseObject,
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
              entityId: studiesEntityId,
              loadingScreen,
              facetAliases,
              ...studyCardConfiguration,
              secondaryLabelLimit: Infinity,
              sql: studiesSql,
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
              facetAliases,
              rgbIndex: 1,
              facet: 'consortium',
              unitDescription: 'Files',
              title: 'Study Files',
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
              facetAliases,
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
              facetAliases,
              rgbIndex: 0,
              facet: 'consortium',
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
