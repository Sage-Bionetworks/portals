import { SynapseConfig } from '../types/portal-config'

const exploreButtonControlProps: SynapseConfig = {
  name: 'ExploreButtonControlWrapper',
  title: 'Explore',
  props: {
    synapseConfig: {} as SynapseConfig,
    colors: [
      '#119488',
      '#58A058',
      '#407BA0',
      '#5BB0B5',
    ],
    customRoutes: [
      'Datasets',
      'Files',
      'Studies',
      'Publications',
    ]
  }
}

export default exploreButtonControlProps
