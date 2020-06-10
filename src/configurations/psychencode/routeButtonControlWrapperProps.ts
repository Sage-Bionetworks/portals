import { SynapseConfig } from 'types/portal-config'
import { RouteButtonControlWrapperProps } from 'portal-components/RouteButtonControlWrapper'
const routeButtonControlProps: RouteButtonControlWrapperProps = {
  // this has to get overriden,
  synapseConfig: {} as SynapseConfig,
  colors: ['#F06531', '#48ACDD', '#154C9A', '#96C647', '#F4A632'],
  customRoutes: ['Studies', 'Data', 'Publications', 'People', 'Grants'],
}

export default routeButtonControlProps
