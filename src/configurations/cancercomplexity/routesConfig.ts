import { GenericRoute } from 'types/portal-config'
import { publications, files, datasets, grants, tools } from './synapseConfigs'
import { projectCardConfiguration } from './synapseConfigs/projects'
import { datasetCardConfiguration } from './synapseConfigs/datasets'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import { toolsConfiguration } from './synapseConfigs/tools'
import DatasetSvg from './style/Dataset.svg'
import { publicationsCardConfiguration } from './synapseConfigs/publications'
import { grantsCardConfiguration } from './synapseConfigs/grants'
import { onPointClick } from './synapseConfigs/onPointClick'
import facetAliases from './facetAliases'
import {
  datasetsSql,
  filesSql,
  grantsSql,
  publicationSql,
  projectsSql,
  toolsSql,
} from './resources'

const routes: GenericRoute[] = [
  {
    to: '',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'FunderCards',
        props: undefined,
        isOutsideContainer: true,
      },
      {
        name: 'ConsortiaGoals',
        title: 'Consortia Activity',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer home-bg-dark',
        props: undefined,        
      },
      {
        name: 'ThemesPlot',
        containerClassName: 'CSBC-ThemesPlot',
        title: 'What Research Themes are Scientists Currently Focusing On?',
        centerTitle: true,
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
              ICBP: 'rgba(197, 191, 223, 1)',
              TEC: 'rgba(156, 196, 233, 1)',
            },
            whereClause: 'totalCount is not NULL',
          },
          sideBarPlot: {
            entityId: 'syn21649281',
            xField: 'totalCount',
            yField: 'theme',
            groupField: 'consortium',
            countLabel: 'grants',
            plotStyle: {
              backgroundColor: '#f5f9fa',
            },
            colors: {
              CSBC: '#1c76af',
              'PS-ON': '#5bb0b5',
              ICBP: '#9cc4e9',
              TEC: '#c5bfdf',
            },
          },
          dotPlot: {
            entityId: 'syn21639584',
            xField: 'totalCount',
            yField: 'theme',
            groupField: 'groupBy',
            infoField: 'themeDescription',
            whereClause: "groupBy IN ('publications', 'tools', 'datasets')",
            markerSymbols: {
              tools: 'y-down',
              datasets: 'diamond-x',
              publications: 'circle',
            },
            plotStyle: {
              markerLine: 'rgba(0, 0, 0,1)',
              markerFill: 'rgba(255, 255, 255,1)',
              markerSize: 11,
              backgroundColor: '#f5f9fa',
            },
          },
        },
      },
      {
        name: 'Ecosystem',
        title: 'The Cancer Resource Information Ecosystem',
        centerTitle: true,
        subtitle:
            'The Cancer Resource Information ecosystem contains a growing list of tools and resources. Explore some of them below.',
        outsideContainerClassName: 'home-spacer home-bg-dark',
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
        },
      },
      {
        name: 'AboutPortal',
        title: 'About the Cancer Complexity Knowledge Portal',
        subtitle: 'The portal is built to disseminate resources to accelerate discovery and collaboration in the cancer research community. We aim to provide rich context about and access to activities and contributors that have produced the resources hosted within this and other repositories.',
        centerTitle: true,
        props: {          
          cardProps: [
            { ownerId: 'syn21498902', wikiId: '601369' },
            { ownerId: 'syn21498902', wikiId: '601370' },
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
    to: 'Explore',
    isNested: true,
    routes: [
      {
        to: 'Grants',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: grants.explorePageSynapseObject,
            },
          },
        ],
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  backgroundColor: 'rgb(71, 51, 125)',
                  ...grantsCardConfiguration,
                  secondaryLabelLimit: Infinity,
                  sql: grantsSql,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: `${grantsSql}`,
                  sqlOperator: 'LIKE',
                  synapseConfigArray: [
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantName',
                      title: 'Related Projects',
                      tableSqlKeys: ['grantName'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: `${projectsSql} where grantType LIKE '%U54%'`,
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
                        ...publicationsCardConfiguration,
                        facetAliases,
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
                        ...datasetCardConfiguration,
                        facetAliases,
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
                        ...toolsConfiguration,
                        facetAliases,
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
        to: 'Publications',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: publications.explorePageSynapseObject,
            },
          },
        ],
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  backgroundColor: '#407ba0',
                  ...publicationsCardConfiguration,
                  secondaryLabelLimit: Infinity,
                  facetAliases,
                  sql: publicationSql,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: publicationSql,
                  sqlOperator: 'LIKE',
                  synapseConfigArray: [
                    {
                      name: 'CardContainerLogic',
                      columnName: 'publicationTitle',
                      title: 'Related Datasets',
                      tableSqlKeys: ['publicationTitle'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: datasetsSql,
                        ...datasetCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'publicationTitle',
                      title: 'Related Tools',
                      tableSqlKeys: ['publicationTitle'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: toolsSql,
                        ...toolsConfiguration,
                        facetAliases,
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
        to: 'Datasets',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: datasets.explorePageSynapseObject,
            },
          },
        ],
        routes: [
          {
            to: 'DetailsPage',
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
                  sql: datasetsSql,
                  iconOptions: {
                    dataset: DatasetSvg,
                  },
                  facetAliases,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: datasetsSql,
                  sqlOperator: 'LIKE',
                  showMenu: false,
                  synapseConfigArray: [
                    {
                      name: 'StandaloneQueryWrapper',
                      title: 'Data',
                      columnName: 'datasetAlias',
                      tableSqlKeys: ['datasets'],
                      props: {
                        sql: filesSql,
                        sqlOperator: '=',
                        rgbIndex: 0,
                        title: 'Dataset Files',
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
        to: 'Files',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: files.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        to: 'Tools',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: tools.explorePageSynapseObject,
            },
          },
        ],
      },
    ],
  },
  {
    to: 'About',
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
