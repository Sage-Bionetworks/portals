import { GenericRoute } from 'types/portal-config'
import { studies, studyDetailPage } from './synapseConfigs/studies'
import { facetAliases } from './synapseConfigs/commonProps'
import { publicationSql, publications } from './synapseConfigs/publications'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import {
  publicationsCardConfiguration,
  publicationEntityId,
} from './synapseConfigs/publications'
import { grants, grantsDetailPage } from './synapseConfigs/grants'
import { people } from './synapseConfigs/people'
import { data } from './synapseConfigs/data'
import loadingScreen from 'config/loadingScreen'

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'UpsetPlot',
        title: 'Featured Data',
        className: 'whatThePlot',
        props: {
          sql: 'SELECT distinct individualID, assay FROM syn20821313 where individualID is not null',
          rgbIndex: 0,
          maxBarCount: 20,
          setName: 'Individuals (#) per Assay',
          combinationName:'Individuals (#)',
          loadingScreen: loadingScreen
        },
      },
    ],
  },
  {
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: 'Studies',
        to: '/Explore/Studies',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: studies,
            },
          },
        ],
        routes: [
          {
            name: 'DetailsPage',
            to: 'Explore/Studies/DetailsPage',
            isNested: false,
            synapseConfigArray: studyDetailPage,
          },
        ],
      },
      {
        name: 'Data',
        to: '/Explore/Data',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: data,
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
              synapseConfig: publications,
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
