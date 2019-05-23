import { SynapseConfigArray } from '../../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'

const resilienceAd: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    title: 'Explore RESILIENCE-AD',
    props: {
      sql: `SELECT * FROM syn17024229 WHERE ( ( "Program" = 'Resilience-AD' ) )`,
      type: SynapseConstants.AMP_PROJECT
    }
  }
]

export default resilienceAd
