import { GenericRoute } from '../types/portal-config'
import {
  publications,
  files,
  datasets,
  grants,
  studies,
  tools,
} from './synapseConfigs'
import { SynapseConstants } from 'synapse-react-client'
import { studiesSql, studySchema } from './synapseConfigs/studies'
import { facetAliases } from './synapseConfigs/commonProps'
import {
  publicationSql,
  publicationSchema,
} from './synapseConfigs/publications'
import { datasetsSql, datasetSchema } from './synapseConfigs/datasets'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import loadingScreen from './loadingScreen'
import { toolsSchema, toolsSql } from './synapseConfigs/tools'
import { filesSql } from './synapseConfigs/files'
import DatasetSvg from './style/Dataset.svg'
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
          // @ts-ignore TODO: Remove after this prop is added to CardContainerLogic
          facetAliases,
          sql: studiesSql,
          limit: homeLimit,
          type: SynapseConstants.GENERIC_CARD,
          secondaryLabelLimit: 4,
          genericCardSchema: studySchema,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE PUBLICATIONS',
        link: 'Explore/Publications',
        props: {
          loadingScreen,
          facetAliases,
          sql: publicationSql,
          limit: homeLimit,
          type: SynapseConstants.GENERIC_CARD,
          genericCardSchema: publicationSchema,
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
          secondaryLabelLimit: 4,
          limit: homeLimit,
          type: SynapseConstants.GENERIC_CARD,
          genericCardSchema: datasetSchema,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'EXPLORE TOOLS',
        link: 'Explore/Tools',
        props: {
          loadingScreen,
          facetAliases,
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
              type: SynapseConstants.GENERIC_CARD,
              isHeader: true,
              backgroundColor: '#407ba0',
              genericCardSchema: publicationSchema,
              loadingScreen,
              facetAliases,
              labelConfig: [
                {
                  isMarkdown: false,
                  baseURL: 'Explore/Datasets',
                  URLColumnNames: ['datasets'],
                  matchColumnName: 'datasets',
                },
                {
                  isMarkdown: false,
                  baseURL: 'Explore/Studies',
                  URLColumnNames: ['studies'],
                  matchColumnName: 'studies',
                },
              ],
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
              type: SynapseConstants.GENERIC_CARD,
              isHeader: true,
              backgroundColor: '#407ba0',
              genericCardSchema: studySchema,
              loadingScreen,
              // @ts-ignore TODO: Remove after this prop is added to CardContainerLogic
              facetAliases,
              labelConfig: [
                {
                  isMarkdown: false,
                  baseURL: 'Explore/Publications',
                  URLColumnNames: ['Title'],
                  matchColumnName: 'Title',
                },
                {
                  isMarkdown: false,
                  baseURL: 'Explore/Datasets',
                  URLColumnNames: ['datasets'],
                  matchColumnName: 'datasets',
                },
              ],
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
              synapseId: 'syn18483791',
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
              type: SynapseConstants.GENERIC_CARD,
              isHeader: true,
              backgroundColor: '#5bb0b5',
              sqlOperator: '=',
              genericCardSchema: datasetSchema,
              secondaryLabelLimit: Infinity,
              sql: datasetsSql,
              loadingScreen,
              facetAliases,
              iconOptions: {
                dataset: DatasetSvg,
              },
              labelConfig: [
                {
                  isMarkdown: false,
                  baseURL: 'Explore/Studies',
                  URLColumnNames: ['studies'],
                  matchColumnName: 'studies',
                },
                {
                  isMarkdown: false,
                  baseURL: 'Explore/Publications',
                  URLColumnNames: ['Title'],
                  matchColumnName: 'Title',
                },
              ],
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
              synapseId: 'syn18488466',
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
