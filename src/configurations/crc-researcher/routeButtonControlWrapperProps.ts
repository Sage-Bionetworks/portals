import { SynapseConfig } from 'types/portal-config'
import { RouteButtonControlWrapperProps } from 'portal-components/RouteButtonControlWrapper'
const routeButtonControlProps: RouteButtonControlWrapperProps = {
  // this has to get overriden,
  synapseConfig: {} as SynapseConfig,
  colors: ['#47337D', '#407BA0', '#7798AC', '#77BBBF', '#58A158', '#3C4A63'],
  customRoutes: ['Uncategorized', 'Selected', 'Invited', 'Hidden'],
}

export default routeButtonControlProps
