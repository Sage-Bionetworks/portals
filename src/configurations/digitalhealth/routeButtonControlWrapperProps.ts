import { SynapseConfig } from 'types/portal-config'
import { RouteButtonControlWrapperProps } from 'portal-components/RouteButtonControlWrapper'
import getColorPallete from 'synapse-react-client/dist/containers/ColorGradient'

const colors = [
  getColorPallete(9, 1).colorPalette[0],
  getColorPallete(2, 1).colorPalette[0],
  getColorPallete(0, 1).colorPalette[0],
  getColorPallete(3, 1).colorPalette[0],
  getColorPallete(7, 1).colorPalette[0],
]

const routeButtonControlProps: RouteButtonControlWrapperProps = {
  // this has to get overriden,
  synapseConfig: {} as SynapseConfig,
  colors,
  customRoutes: ['Studies', 'Projects', 'Data', 'Tools', 'Publications'],
}

const routeButtonControlTemplate: SynapseConfig = {
  name: 'RouteButtonControlWrapper',
  title: 'Explore',
  props: routeButtonControlProps,
}

export default routeButtonControlTemplate
