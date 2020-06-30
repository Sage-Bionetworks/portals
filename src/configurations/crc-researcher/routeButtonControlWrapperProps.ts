import { SynapseConfig } from 'types/portal-config'
import { RouteButtonControlWrapperProps } from 'portal-components/RouteButtonControlWrapper'
const routeButtonControlProps: RouteButtonControlWrapperProps = {
  // this has to get overriden,
  synapseConfig: {} as SynapseConfig,
  colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
  customRoutes: ['1. Uncategorized', '2. Potential', '3. Invited', '4. Scheduled', '5. Tested', 'Hidden'],
}

export default routeButtonControlProps
