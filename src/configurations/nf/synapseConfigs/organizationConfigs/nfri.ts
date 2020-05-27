import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from 'types/portal-config'
import { buttonColors } from '../commonProps'
import loadingScreen from '../../loadingScreen'
import { generateOrgConfig } from './generateConfig'

const org = 'NFRI'

export const nfri: BaseRoute = {
  name: org,
  to: `/Organizations/${org}`,
  isNested: false,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
        limit: 1,
        sql: `SELECT * FROM syn16858699 WHERE abbreviation = '${org}'`,
        type: SynapseConstants.FUNDER,
        entityId: 'syn16858699',
        loadingScreen,
      },
      title: 'Neurofibromatosis Research Initiative',
    },
    {
      name: 'StatefulButtonControlWrapper',
      props: {
        ...buttonColors,
        configs: generateOrgConfig(org),
      },
    },
  ],
}
