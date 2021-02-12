import { RouteControlWrapperProps } from 'portal-components/RouteControlWrapper'
import { SynapseConfig } from 'types/portal-config'

const routeControlWrapper: RouteControlWrapperProps = {
  synapseConfig: {} as SynapseConfig,
  customRoutes: [
    'Programs',
    'Projects',
    'Studies',
    'Data',
    'Publications',
    'People',
    'Experimental Tools',
    'Computational Tools',
    'Results',
  ],
}

export default routeControlWrapper
