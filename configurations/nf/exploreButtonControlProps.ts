import { ExploreButtonControlProps } from '../portal-components/ExploreButtonControl'
import { SynapseObjectSingle } from '../types/portal-config'

const exploreButtonControlProps: ExploreButtonControlProps = {
  synapseObjectSingle: {} as SynapseObjectSingle,
  colors: [
    '#119488',
    '#58A058',
    '#407BA0',
    '#5BB0B5',
  ],
  customRoutes: [
    {
      name: 'Datasets'
    },
    {
      name: 'Files'
    },
    {
      name: 'Studies'
    },
    {
      name: 'Publications'
    },
  ]
}

export default exploreButtonControlProps
