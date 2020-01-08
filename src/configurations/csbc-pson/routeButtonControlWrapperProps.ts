import { SynapseConfig } from 'types/portal-config'
import { RouteButtonControlWrapperProps } from 'portal-components/RouteButtonControlWrapper'
const routeButtonControlProps: RouteButtonControlWrapperProps = {
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
}

const routeButtonControlTemplate: SynapseConfig = {
  name: 'RouteButtonControlWrapper',
  title: 'Explore',
  props: routeButtonControlProps,
}

export default routeButtonControlTemplate
