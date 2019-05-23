import { SynapseConfigArray } from '../../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'

const modelAd: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    title: 'Explore MODEL-AD',
    props: {
      sql:  `SELECT * FROM syn17024229 WHERE ( ( "Program" = 'MODEL-AD' ) )`,
      type: SynapseConstants.AMP_PROJECT
    }
  }
]

export default modelAd
