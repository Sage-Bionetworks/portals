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
const homeLimit = 3

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn21438192',
          wikiId: '600054',
        },
      },
      {
        name: 'StatefulButtonControlWrapper',
        title: 'EXPLORE PORTAL',
        props: {
          colors: ['#F06531', '#48ACDD', '#154C9A', '#96C647', '#F4A632'],
          configs: [
            {
              name: 'Projects',
              synapseConfigArray: [projects.homePageSynapseObject],
            },
            {
              name: 'Studies',
              synapseConfigArray: [studies.homePageSynapseObject],
            },
            {
              name: 'Files',
              synapseConfigArray: [files.homePageSynapseObject],
            },
            {
              name: 'Publications',
              synapseConfigArray: [publications.homePageSynapseObject],
            },
            {
              name: 'People',
              synapseConfigArray: [people.homePageSynapseObject],
            },
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
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: files.explorePageSynapseObject,
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
        name: 'People',
        to: '/Explore/People',
        isNested: false,
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: people.explorePageSynapseObject,
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
