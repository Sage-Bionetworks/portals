import { SynapseConfig } from '../types/portal-config'

const routeButtonControlTemplate: SynapseConfig = {
  name: 'RouteButtonControlWrapper',
  title: 'Explore',
  props: {
    // this has to get overriden,
    synapseConfig: {} as SynapseConfig,
    colors: ['#47337D', '#407BA0', '#7798AC', '#77BBBF', '#58A158', '#3C4A63'],
    customRoutes: [
      'Grants',
      'Publications',
      'Studies',
      'Datasets',
      'Files',
      'Tools',
    ],
  },
}

export default routeButtonControlTemplate
