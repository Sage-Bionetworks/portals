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
  newStudiesSql,
  studyHeaderIconOptions,
  studyCardConfiguration,
  studiesEntityId,
  studiesDetailPage,
} from './synapseConfigs/studies'
import { newDatasetsSql } from './synapseConfigs/datasets'
import {
  publicationsCardConfiguration,
  publicationsEntityId,
  newPublicationsSql,
} from './synapseConfigs/publications'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import loadingScreen from './loadingScreen'
import { ntap } from './synapseConfigs/organizationConfigs/ntap'
import { dhartSpore } from './synapseConfigs/organizationConfigs/dhart-spore'
import { ctf } from './synapseConfigs/organizationConfigs/ctf'
import { cdmrp } from './synapseConfigs/organizationConfigs/cdmrp'
import { buttonColors, facetAliases } from './synapseConfigs/commonProps'
import { toolsCardConfiguration, newToolsSql } from './synapseConfigs/tools'
import { toolsEntityId } from './synapseConfigs/tools'
import { gff } from './synapseConfigs/organizationConfigs/gff'

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
          sql: newStudiesSql,
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
          sql: newPublicationsSql,
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
          sql: newDatasetsSql,
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
          sql: newToolsSql,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'ORGANIZATIONS',
        props: {
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
        isNested: true,
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
        routes: [
          {
            name: 'DetailsPage',
            to: 'Explore/Studies/DetailsPage',
            isNested: false,
            synapseConfigArray: [
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
                name: 'GenerateComponentsFromRow',
                isOutsideContainer: false,
                props: studiesDetailPage,
              },
            ],
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
    routes: [ctf, ntap, gff, dhartSpore, cdmrp],
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
