import { SynapseConfigArray } from '../../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'

const move2Ad: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    title: 'Explore MOVE2-AD',
    props: {
      sql: `SELECT * FROM syn17024229 WHERE ( ( "Program" = 'M2OVE-AD' ) )`,
      type: SynapseConstants.AMP_PROJECT
    }
  }
]

export default move2Ad
