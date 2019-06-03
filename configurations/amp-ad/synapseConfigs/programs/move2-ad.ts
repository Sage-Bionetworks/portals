import { SynapseConfigArray } from '../../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../../loadingScreen'

const move2Ad: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    title: 'Explore MOVE2-AD',
    props: {
      loadingScreen,
      secondaryLabelLimit: 4,
      sql: `SELECT * FROM syn17024229 WHERE ( ( "Program" = 'M2OVE-AD' ) )`,
      type: SynapseConstants.AMP_PROJECT
    }
  }
]

export default move2Ad
