import { GenericRoute } from 'types/portal-config'
import {
  publications,
  files,
  projects,
  studies,
  people,
} from './synapseConfigs'
import { SynapseConstants } from 'synapse-react-client'
import {
  studiesSql,
  studyCardConfiguration,
  studiesEntityId,
} from './synapseConfigs/studies'
import { facetAliases } from './synapseConfigs/commonProps'
import { publicationSql } from './synapseConfigs/publications'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import loadingScreen from './loadingScreen'
import { filesSql, filesEntityId } from './synapseConfigs/files'
import {
  publicationsCardConfiguration,
  publicationEntityId,
} from './synapseConfigs/publications'
import { grants, grantsDetailPage } from './synapseConfigs/grants'

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [],
  },
  {
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: 'Projects',
        to: '/Explore/Projects',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: projects.explorePageSynapseObject,
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
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
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
        name: 'Files',
        to: '/Explore/Files',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: files.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        name: 'Grants',
        to: '/Explore/Grants',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: grants,
            },
          },
        ],
        routes: [
          {
            name: 'DetailsPage',
            to: 'Explore/Grants/DetailsPage',
            isNested: false,
            synapseConfigArray: grantsDetailPage,
          },
        ],
      },
      {
        name: 'Publications',
        to: '/Explore/Publications',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
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
        name: 'People',
        to: '/Explore/People',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: people,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'DataAccess',
    displayName: 'Data Access',
    to: '/DataAccess',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn4921369',
          wikiId: '477467',
        },
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
          ownerId: 'syn4921369',
          wikiId: '235539',
        },
      },
    ],
  },
]

export default routes
