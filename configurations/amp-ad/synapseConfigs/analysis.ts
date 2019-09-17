import { SynapseConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'

export const analysis: SynapseConfig = {
  name: 'Markdown',
  // https://www.synapse.org/#!Synapse:syn12666371/wiki/595383
  props: {
    ownerId: 'syn12666371',
    wikiId: '595383',
    loadingScreen,
  },
  style: {
    border: '1px solid #C4C4C4',
    marginTop: 5
  }
}