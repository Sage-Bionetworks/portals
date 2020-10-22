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
  studiesDetailPage,
} from './synapseConfigs/studies'
import { newDatasetsSql } from './synapseConfigs/datasets'
import {
  publicationsCardConfiguration,
  newPublicationsSql,
} from './synapseConfigs/publications'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import { buttonColors, facetAliases } from './synapseConfigs/commonProps'
import { toolsCardConfiguration, newToolsSql } from './synapseConfigs/tools'
import { organizationDetailsPage } from './organizations'

const limit = 3

const routes: GenericRoute[] = [
  {
    to: '',
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
          ...toolsCardConfiguration,
          sql: newToolsSql,
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'ORGANIZATIONS',
        props: {
              facetAliases,
          sql: funders.sql,
          type: funders.type,
        },
      },
      {
        name: 'Ecosystem',
        isOutsideContainer: true,
        props: {
          title: 'NF Grant Opportunities',
          subtitle:
            '',
          config: [
            {
              title: 'Children\'s Tumor Foundation',
              ownerId: 'syn5702691',
              wikiId: '606577',
            },
            {
              title: 'Neurofibromatosis Therapeutic Acceleration Program',
              ownerId: 'syn5702691',
              wikiId: '606578',
            },
            {
              title: 'Gilbert Family Foundation',
              ownerId: 'syn5702691',
              wikiId: '606579',
            },
            {
              title: 'DoD CDMRP Neurofibromatosis Research Program',
              ownerId: 'syn5702691',
              wikiId: '606580',
            },
            {
              title: 'Neurofibromatosis Research Initiative',
              ownerId: 'syn5702691',
              wikiId: '606582',
            },
          ],
        },
      },
    ],    
  },
  {
    to: 'Explore',
    isNested: true,
    routes: [
      {
        isNested: true,
        to: 'Studies',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: studies.explorePageSynapseObject,
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
                  sqlOperator: '=',
                  isHeader: true,
                  backgroundColor: '#119488',
                  ...studyCardConfiguration,
                  facetAliases,
                  iconOptions: studyHeaderIconOptions,
                  secondaryLabelLimit: Infinity,
                  sql: 'SELECT * FROM syn16787123',
                },
              },
              {
                name: 'DetailsPage',
                isOutsideContainer: false,
                props: studiesDetailPage,
              },
            ],
          },
        ],
      },
      {
        isNested: false,
        to: 'Datasets',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: datasets.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        isNested: false,
        to: 'Files',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: files.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        isNested: false,
        to: 'Publications',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: publications.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        isNested: false,
        to: 'Tools',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
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
    to: 'Organizations',
    isNested: true,
    routes: [
      {
        displayName: 'CTF',
        to: 'DetailsPage?abbreviation=CTF',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
      {
        displayName: 'NTAP',
        to: 'DetailsPage?abbreviation=NTAP',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
      {
        displayName: 'GFF',
        to: 'DetailsPage?abbreviation=GFF',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
      {
        displayName: 'NCI DHART SPORE',
        to: 'DetailsPage?fundingAgency=NIH-NCI',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
      {
        displayName: 'CDMRP NFRP',
        to: 'DetailsPage?abbreviation=CDMRP',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
      {
        displayName: 'NFRI',
        to: 'DetailsPage?abbreviation=NFRI',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
    ],
  },
  {
    to: 'About',
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
