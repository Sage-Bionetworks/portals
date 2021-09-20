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
    'Experimental Models',
    'Computational Tools',
    'Results',
    'Target Enabling Resources',
  ],
}

export default routeControlWrapper
