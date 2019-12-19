import { SynapseConstants } from 'synapse-react-client'
import { iconOptions } from './programs/iconOptions'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import loadingScreen from '../loadingScreen'

export const programCardConfiguration: CardConfiguration = {
  iconOptions,
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: 'Program',
    title: 'Full Name',
    subTitle: 'Short Description',
    icon: 'Program',
  },
  loadingScreen,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Programs',
    URLColumnName: 'Program',
    matchColumnName: 'Program',
  },
}

export default programCardConfiguration
