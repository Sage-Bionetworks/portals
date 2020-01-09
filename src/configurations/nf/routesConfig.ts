import { GenericRoute } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import {
  datasets,
  files,
  studies,
  publications,
  tools,
  funders,
} from './synapseConfigs'
import {
  studiesSql,
  studyHeaderIconOptions,
  studyCardConfiguration,
  studiesEntityId,
} from './synapseConfigs/studies'
import { datasetsSql, datasetsEntityId } from './synapseConfigs/datasets'
import {
  publicationsSql,
  publicationsCardConfiguration,
  publicationsEntityId,
} from './synapseConfigs/publications'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import loadingScreen from './loadingScreen'
import { ntap } from './synapseConfigs/organizationConfigs/ntap'
import { dhartSpore } from './synapseConfigs/organizationConfigs/dhart-spore'
import { ctf } from './synapseConfigs/organizationConfigs/ctf'
import { cdmrp } from './synapseConfigs/organizationConfigs/cdmrp'
import { buttonColors, facetAliases } from './synapseConfigs/commonProps'
import { toolsSql, toolsCardConfiguration } from './synapseConfigs/tools'
import { toolsEntityId } from './synapseConfigs/tools'

const limit = 3

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
          ...buttonColors,
          configs: [
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
              name: 'Publications',
              synapseConfigArray: [publications.homePageSynapseObject],
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
        link: '/Explore/Studies',
        props: {
          limit,
          facetAliases,
          sql: studiesSql,
          entityId: studiesEntityId,
          title: 'NEW STUDIES',
          ...studyCardConfiguration,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'NEW PUBLICATIONS',
        link: '/Explore/Publications',
        props: {
          limit,
          facetAliases,
          entityId: publicationsEntityId,
          sql: publicationsSql,
          ...publicationsCardConfiguration,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'New Datasets',
        link: '/Explore/Datasets',
        props: {
          limit,
          facetAliases,
          loadingScreen,
          entityId: publicationsEntityId,
          sql: datasetsSql,
          type: SynapseConstants.DATASET,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'TOOLS',
        link: '/Explore/Tools',
        props: {
          limit,
          facetAliases,
          entityId: toolsEntityId,
          ...toolsCardConfiguration,
          sql: toolsSql,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'ORGANIZATIONS',
        props: {
          limit,
          loadingScreen,
          facetAliases,
          entityId: funders.entityId,
          sql: funders.sql,
          type: funders.type,
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
        isNested: false,
        to: '/Explore/Studies',
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
              sqlOperator: '=',
              isHeader: true,
              backgroundColor: '#119488',
              entityId: studiesEntityId,
              ...studyCardConfiguration,
              facetAliases,
              iconOptions: studyHeaderIconOptions,
              secondaryLabelLimit: Infinity,
              sql: 'SELECT * FROM syn16787123',
            },
          },
          {
            name: 'CardContainerLogic',
            props: {
              title: 'Publications',
              entityId: publicationsEntityId,
              sqlOperator: '=',
              ...publicationsCardConfiguration,
              sql: 'SELECT * FROM syn16857542',
            },
          },
          {
            name: 'CardContainerLogic',
            props: {
              title: 'Datasets',
              entityId: datasetsEntityId,
              sqlOperator: '=',
              type: SynapseConstants.DATASET,
              sql: datasetsSql,
            },
          },
        ],
      },
      {
        name: 'Datasets',
        isNested: false,
        to: '/Explore/Datasets',
        synapseConfigArray: [
          {
            ...routeButtonControlWrapperProps,
            props: {
              ...routeButtonControlWrapperProps.props,
              synapseConfig: datasets.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        name: 'Files',
        isNested: false,
        to: '/Explore/Files',
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
        isNested: false,
        to: '/Explore/Publications',
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
        name: 'Tools',
        isNested: false,
        to: '/Explore/Tools',
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
    name: 'Organizations',
    isNested: true,
    routes: [ctf, ntap, dhartSpore, cdmrp],
  },
  {
    name: 'About',
    to: '/About',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'About',
        props: {
          ownerId: 'syn5702691',
          wikiId: '583906',
        },
      },
    ],
  },
]

export default routes
