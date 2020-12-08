import { GenericRoute } from 'types/portal-config'
import { publications, studies, data, tools } from './synapseConfigs'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import { studyDetailPage } from './synapseConfigs/studies'
import { toolsDetailsLandingPage } from './synapseConfigs/tools'
import { SynapseConstants } from 'synapse-react-client'

const routes: GenericRoute[] = [
  {
    to: '',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Goals',
        title: '',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer',
        props: {
          entityId: 'syn23518009',
        },
      },
      {
        name: 'FeaturedDataTabs',
        title: 'Collections',
        centerTitle: true,
        outsideContainerClassName: 'home-bg-dark home-spacer',
        props: {
          sql:'SELECT * FROM syn21994974',
          rgbIndex: 3,
          configs:
            [
              {
                title: 'Studies',
                icon: SynapseConstants.FILE,
                explorePagePath:'/Explore/Collections',
                exploreObjectType:'Collections',
                plotsConfig: {
                  sql: 'SELECT * FROM syn21994974 WHERE ( ( "collectionType" = \'Validation Study\' OR "collectionType" = \'Interventional Study\' OR "collectionType" = \'Observational Study\' ) )',
                  configs: [{
                    facetsToPlot:['diagnosis', 'dataCollectionMethod','digitalAssessmentCategory', 'sensorType', 'devicePlatform' ],
                  },]
                },
              },
              {
                title: 'Analysis',
                icon: SynapseConstants.CHART2,
                explorePagePath:'/Explore/Collections',
                exploreObjectType:'Collections',
                plotsConfig: {
                  sql: 'SELECT * FROM syn21994974 WHERE ( ( "collectionType" = \'Analysis\' OR "collectionType" = \'Challenge\' ) )',
                  configs: [{
                    facetsToPlot:['diagnosis', 'dataCollectionMethod','digitalAssessmentCategory', 'sensorType', 'devicePlatform' ],
                  },]
                },
              }
            ]  
          },
      },
      {
        name: 'TableFeedCards',
        title: 'What\'s New',
        centerTitle: true,
        props: {
          tableEntityId: 'syn23520190',
        },
      },
    ],
  },
  {
    to: 'Explore',
    isNested: true,
    routes: [
      {
        to: 'Collections',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            containerClassName: 'container-full-width',
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
            synapseConfigArray: studyDetailPage,
          },
        ],
      },
      {
        to: 'Data',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: data.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        to: 'Tools',
        isNested: true,
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
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: toolsDetailsLandingPage,
          },
        ],
      },
      {
        to: 'Publications',
        isNested: false,
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
        className: 'AboutPage',
        props: {
          ownerId: 'syn22130826',
        },
      },
    ],
  },
]

export default routes
