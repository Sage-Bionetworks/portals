import { SynapseConfigArray } from '../../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../../loadingScreen'
import { iconOptions } from './iconOptions'
import { projectCardProps } from '../projects'

const ampAd: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      loadingScreen,
      iconOptions,
      genericCardSchema: {
        type: 'Program',
        title: 'Full Name',
        subTitle: 'Short Description',
        description: 'Long Description',
        icon: 'Program',
      },
      secondaryLabelLimit: 4,
      sql: `SELECT  * FROM syn17024173 WHERE ( ( "Program" = 'AMP-AD' ) )`,
      type: SynapseConstants.GENERIC_CARD,
      backgroundColor: '#5960a5',
      isHeader: true,
    },
  },
  {
    name: 'CardContainerLogic',
    title: 'Explore AMP-AD',
    props: {
      loadingScreen,
      ...projectCardProps,
      secondaryLabelLimit: 4,
      sql: `SELECT  * FROM syn17024229 WHERE ( ( "Program" = 'AMP-AD' ) )`,
    },
  },
]

export default ampAd
