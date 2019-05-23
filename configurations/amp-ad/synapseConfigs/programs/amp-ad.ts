import { SynapseObject } from '../../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'

const ampAd: SynapseObject = [
  {
    name: 'CardContainerLogic',
    title: 'Explore AMP-AD',
    props: {
      sql: `SELECT * FROM syn17024229 WHERE ( ( "Program" = 'AMP-AD' ) )`,
      type: SynapseConstants.AMP_PROJECT
    }
  }
]

export default ampAd
