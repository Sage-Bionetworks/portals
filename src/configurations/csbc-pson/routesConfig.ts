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
import { toolsSql, toolsEntityId } from './synapseConfigs/tools'
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
import { onPointClick } from './synapseConfigs/onPointClick'

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'ConsortiaGoals',
        props: undefined,
        isOutsideContainer: true,
      },
      {
        name: 'ThemesPlot',
        containerClassName: 'CSBC-ThemesPlot',
        title: 'What Research Themes are Scientists Currently Focusing On?',
        props: {
          onPointClick,
          topBarPlot: {
            entityId: 'syn21641485',
            xField: 'totalCount',
            yField: 'groupBy',
            groupField: 'consortium',
            colors: {
              CSBC: 'rgba(64,123,160, 1)',
              'PS-ON': 'rgba(91,176,181,1)',
            },
            whereClause: 'totalCount is not NULL',
          },
          sideBarPlot: {
            entityId: 'syn21649281',
            xField: 'totalCount',
            yField: 'theme',
            groupField: 'consortium',
            countLabel: 'projects',
            colors: {
              CSBC: '#1c76af',
              'PS-ON': '#5bb0b5',
            },
          },
          dotPlot: {
            entityId: 'syn21639584',
            xField: 'totalCount',
            yField: 'theme',
            groupField: 'groupBy',
            infoField: 'themeDescription',
            whereClause: "groupBy IN ('publications', 'tools', 'datasets')",
            markerStyle: {
              line: 'rgba(0, 0, 0,0.5)',
              fill: 'rgba(0, 0, 0,0.5)',
              size: 9,
            },
          },
        },
      },
      {
        name: 'Ecosystem',
        isOutsideContainer: true,
        props: {
          config: [
            {
              title: 'Public Repositories',
              ownerId: 'syn21498902',
              wikiId: '601489',
            },
            {
              title: 'Data Common Nodes',
              ownerId: 'syn21498902',
              wikiId: '601490',
            },
            {
              title: 'Data Coordination',
              ownerId: 'syn21498902',
              wikiId: '601574',
            },
            {
              title: 'Data Exploration',
              ownerId: 'syn21498902',
              wikiId: '601575',
            },
            {
              title: 'Cloud Platform',
              ownerId: 'syn21498902',
              wikiId: '601576',
            },
          ],
          title: 'The Cancer Resource Information Ecosystem',
          subtitle:
            'The Cancer Resource Information ecosystem contains a growing list of tools and resources. Explore some of them below.',
        },
      },
      {
        name: 'AboutPortal',
        props: {
          title: 'About the CSBC-PSON Portal',
          ownerId: 'syn21498902',
          wikiId: '601366',
          cardProps: [
            { ownerId: 'syn21498902', wikiId: '601367' },
            { ownerId: 'syn21498902', wikiId: '601368' },
            { ownerId: 'syn21498902', wikiId: '601369' },
          ],
        },
      },
      {
        name: 'DevelopedBySage',
        props: undefined,
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
        isNested: true,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: grants.explorePageSynapseObject,
            },
          },
        ],
        routes: [
          {
            name: 'DetailsPage',
            to: '/Explore/Grants/DetailsPage',
            isNested: false,
            synapseConfigArray: [
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
      },
      {
        name: 'Datasets',
        to: '/Explore/Datasets',
        isNested: true,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: datasets.explorePageSynapseObject,
            },
          },
        ],
        routes: [
          {
            name: 'DetailsPage',
            to: '/Explore/Datasets/DetailsPage',
            isNested: false,
            synapseConfigArray: [
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
