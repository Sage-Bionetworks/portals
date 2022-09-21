import { SynapseConfig } from 'types/portal-config'
import { RouteControlWrapperProps } from 'portal-components/RouteControlWrapper'


const routeButtonControlProps: RouteControlWrapperProps = {
  // this has to get overriden,
  synapseConfig: {} as SynapseConfig,
  customRoutes: ['Programs', 'Studies', 'Datasets', 'All Data'],
}

export default routeButtonControlProps
