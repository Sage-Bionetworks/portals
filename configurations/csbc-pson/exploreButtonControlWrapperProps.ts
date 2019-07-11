import { SynapseConfig } from '../types/portal-config'

const RouteButtonControlTemplate: SynapseConfig = {
  name: 'RouteButtonControlWrapper',
  title: 'Explore',
  props: {
    // this has to get overriden,
    synapseConfig: {} as SynapseConfig,
    colors: [
      '#47337D',
      '#407BA0',
      '#7798AC',
      '#77BBBF',
      '#5E697D',
    ],
    customRoutes: [
      'Grants',
      'Publications',
      'Studies',
      'Datasets',
      'Files',
    ]
  }
}

export default RouteButtonControlTemplate
