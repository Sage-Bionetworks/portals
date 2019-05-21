import { ExploreButtonControlProps } from '../portal-components/ExploreButtonControl'
import { SynapseObjectSingle } from '../types/portal-config'

const exploreButtonControlTemplate: ExploreButtonControlProps = {
   // this has to get overriden,
  synapseObjectSingle: {} as SynapseObjectSingle,
  colors: [
    '#47337D',
    '#407BA0',
    '#7798AC',
    '#77BBBF',
    '#5E697D',
  ],
  customRoutes: [
    {
      name: 'Grants'
    },
    {
      name: 'Publications'
    },
    {
      name: 'Studies'
    },
    {
      name: 'Datasets'
    },
    {
      name: 'Files'
    },
  ]
}

export default exploreButtonControlTemplate
