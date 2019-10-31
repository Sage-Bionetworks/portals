import { SynapseConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { iconOptions } from './programs/iconOptions'

const programs: SynapseConfig = {
  name: 'CardContainerLogic',
  title: 'Displaying Programs',
  props: {
    iconOptions,
    sql: 'SELECT * FROM syn17024173',
    type: SynapseConstants.GENERIC_CARD,
    genericCardSchema: {
      type: 'Program',
      title: 'Full Name',
      subTitle: 'Short Description',
      icon: 'Program',
    },
    titleLinkConfig: {
      baseURL: 'Explore/Programs',
      URLColumnNames: ['Program'],
    },
  },
}

export default programs
