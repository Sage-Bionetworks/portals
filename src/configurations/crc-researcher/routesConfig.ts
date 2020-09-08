import { GenericRoute } from 'types/portal-config'
import {
  uncategorized,
  potential,
  invited,
  scheduled,
  tested,
  hidden,
} from './synapseConfigs'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'

const routes: GenericRoute[] = [
  {
    name: '',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'SurveysCompletedPlots',
        isOutsideContainer: true,
        props: {},
      },
      {
        name: 'ParticipantsBarPlot',
        isOutsideContainer: true,
        props: {},
      },
      {
        name: 'StatusLineChart',
        isOutsideContainer: true,
        props: {
          style: { paddingTop: 10, paddingBottom: 50 },
        },
      },
      {
        name: 'SynapsePlot',
        isOutsideContainer: false,
        props: {
          widgetparamsMapped: {
            query:
              'SELECT "date", CONTACT as "New accounts created", survey_1 as "Completed Survey 1", survey_2 as "Completed Survey 2", survey_3 as "Completed Survey 3", survey_4 as "Completed Survey 4" FROM syn22314856',
            title: 'New Participants Per Survey Per Day',
            xtitle: 'Date',
            ytitle: 'Count',
            type: 'scatter',
            horizontal: 'true',
            // xaxistype:,
            showlegend: 'true',
          },
        },
      },
    ],
  },
  {
    name: 'Explore',
    isNested: true,
    routes: [
      {
        name: '1. Uncategorized',
        to: '/Explore/1. Uncategorized',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: uncategorized,
            },
          },
        ],
      },
      {
        name: '2. Potential',
        to: '/Explore/2. Potential',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: potential,
            },
          },
        ],
      },
      {
        name: '3. Invited',
        to: '/Explore/3. Invited',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: invited,
            },
          },
        ],
      },
      {
        name: '4. Scheduled',
        to: '/Explore/4. Scheduled',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: scheduled,
            },
          },
        ],
      },
      {
        name: '5. Tested',
        to: '/Explore/5. Tested',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: tested,
            },
          },
        ],
      },
      {
        name: 'Hidden',
        to: '/Explore/Hidden',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: hidden,
            },
          },
        ],
      },
    ],
  },
]

export default routes
