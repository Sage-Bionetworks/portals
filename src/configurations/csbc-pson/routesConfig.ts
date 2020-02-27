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
import SageLogo from './style/SageLogo.svg'
import NCILogo from './style/NCILogo.svg'
import NIHLogo from './style/NIH.svg'
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
        name: 'Ecosystem',
        isOutsideContainer: true,
        props: {
          config: [
            {
              title: 'Public Repositories',
              ownerId: 'syn21641431',
              icon: NCILogo,
            },
            {
              title: 'Data Common Nodes',
              ownerId: 'syn21641431',
              icon: SageLogo,
            },
            {
              title: 'Data Coordination',
              ownerId: 'syn21641431',
              icon: NIHLogo,
            },
            {
              title: 'Data Exploration',
              ownerId: 'syn21641431',
              icon: NCILogo,
            },
            {
              title: 'Cloud Platform',
              ownerId: 'syn21641431',
              icon: SageLogo,
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
          logos: [NIHLogo, NCILogo, SageLogo],
          ownerId: 'syn21641431',
          wikiId: '601410',
          cardProps: [
            { ownerId: 'syn21498902', wikiId: '601367' },
            { ownerId: 'syn21498902', wikiId: '601368' },
            { ownerId: 'syn21498902', wikiId: '601369' },
            { ownerId: 'syn21498902', wikiId: '601370' },
            { ownerId: 'syn21498902', wikiId: '601371' },
          ],
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
