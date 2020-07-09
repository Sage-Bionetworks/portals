import { SynapseConfig } from 'types/portal-config'
import { RouteButtonControlWrapperProps } from 'portal-components/RouteButtonControlWrapper'
const routeButtonControlProps: RouteButtonControlWrapperProps = {
  // this has to get overriden,
  synapseConfig: {} as SynapseConfig,
  colors: ['#47337D', '#407BA0', '#7798AC', '#77BBBF', '#58A158'],
  customRoutes: ['Grants', 'Publications', 'Datasets', 'Files', 'Tools'],
}

export default routeButtonControlProps
