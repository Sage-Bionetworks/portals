import { SynapseConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'

const programs: SynapseConfig = {
  name: 'CardContainerLogic',
  title: 'Displaying Programs',
  props: {
    sql: 'SELECT * FROM syn17024173',
    type: SynapseConstants.AMP_CONSORTIUM
  },
}

export default programs
