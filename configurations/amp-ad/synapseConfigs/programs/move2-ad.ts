import { SynapseConfigArray } from '../../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../../loadingScreen'
import { iconOptions } from './iconOptions'

const move2Ad: SynapseConfigArray = [
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
      sql: `SELECT  * FROM syn17024173 WHERE ( ( "Program" = 'M2OVE-AD' ) )`,
      type: SynapseConstants.GENERIC_CARD,
      backgroundColor: '#5960a5',
      isHeader: true,
    }
  },
  {
    name: 'CardContainerLogic',
    title: 'Explore MOVE2-AD',
    props: {
      loadingScreen,
      secondaryLabelLimit: 4,
      sql: `SELECT * FROM syn17024229 WHERE ( ( "Program" = 'M2OVE-AD' ) )`,
      type: SynapseConstants.GENERIC_CARD,
      genericCardSchema: {
        type: 'Project',
        title: 'Name',
        subTitle: 'Key Investigators',
        description: 'Abstract',
        secondaryLabels: {
          0: { key: 'Grant Number', alias:  'Grant' },
          1: { key: 'Key Data Contributors', alias:  'Key Contributors' },
          2: { key: 'Institutions' },
          3: { key: 'Program' },
        }
      },
      internalLinkConfiguration: {
        baseURL: 'Explore/Projects',
        columnValues: ['Grant Number']
      },
    }
  }
]

export default move2Ad
