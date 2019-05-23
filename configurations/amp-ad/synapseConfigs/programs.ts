import { SynapseObjectSingle } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'

const programs: SynapseObjectSingle = {
  name: 'CardContainerLogic',
  title: 'Displaying Programs',
  props: {
    sql: 'SELECT * FROM syn17024173',
    type: SynapseConstants.AMP_CONSORTIUM
  }
}

export default programs
