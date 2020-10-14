import { SynapseConfig } from 'types/portal-config'
import { RouteButtonControlWrapperProps } from 'portal-components/RouteButtonControlWrapper'

const routeButtonControlProps: RouteButtonControlWrapperProps = {
  // this has to get overriden,
  synapseConfig: {} as SynapseConfig,
  colors: ['#D46D1E', '#5BB0B5', '#58A148', '#47337D', '#109488'],
  customRoutes: ['Projects', 'Data', 'Tools', 'People', 'Publications'],
}

export default routeButtonControlProps
