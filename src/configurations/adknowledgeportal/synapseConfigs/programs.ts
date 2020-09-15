import { SynapseConstants } from 'synapse-react-client'
import { iconOptions } from './iconOptions'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'

export const programCardConfiguration: CardConfiguration = {
  iconOptions,
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: 'Program',
    title: 'Full Name',
    subTitle: 'Short Description',
    icon: 'Program',
  },
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Programs/DetailsPage',
    URLColumnName: 'Program',
    matchColumnName: 'Program',
  },
  secondaryLabelLimit: 4,
}

export default programCardConfiguration
