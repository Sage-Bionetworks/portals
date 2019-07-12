import { SynapseConfig } from '../types/portal-config'

const routeButtonControlWrapper: SynapseConfig = {
  name: 'RouteButtonControlWrapper',
  title: 'Explore',
  props: {
    synapseConfig: {} as SynapseConfig,
    colors: [
      '#6c5c97',
      '#E5AE4C',
      '#5BB0B5',
      '#5171C0',
      '#0f9488',
      '#D4689A',
    ],
    customRoutes: [
      'Programs',
      'Projects',
      'Studies',
      'Data',
      'Publications',
      'People'
    ]
  },
}

export default routeButtonControlWrapper
