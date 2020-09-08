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
    to: '',
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
    isNested: true,
    to: 'Explore',
    routes: [
      {
        to: '1. Uncategorized',
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
        to: '2. Potential',
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
        to: '3. Invited',
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
        to: '4. Scheduled',
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
        to: '5. Tested',
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
        to: 'Hidden',
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
