import { SynapseConfigArray } from '../../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../../loadingScreen'

const ampAd: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    title: 'Explore AMP-AD',
    props: {
      loadingScreen,
      secondaryLabelLimit: 4,
      sql: `SELECT  * FROM syn17024229 WHERE ( ( "Program" = 'AMP-AD' ) )`,
      type: SynapseConstants.AMP_PROJECT,
    }
  }
]

export default ampAd
