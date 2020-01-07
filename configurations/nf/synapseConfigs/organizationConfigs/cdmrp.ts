import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from '../../../types/portal-config'
import { buttonColors } from '../commonProps'
import { generateOrgConfig } from './generateConfig'
import { studiesEntityId } from '../studies'
import { datasetsEntityId } from '../datasets'
import { filesEntityId } from '../files'
import { publicationsEntityId } from '../publications'

const org = 'CDMRP'

export const cdmrp: BaseRoute = {
  name: 'CDMRP',
  to: '/Organizations/CDMRP',
  isNested: false,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
        limit: 1,
        sql: "SELECT * FROM syn16858699 WHERE abbreviation = 'CDMRP'",
        type: SynapseConstants.FUNDER,
        entityId: 'syn16858699',
      },
      title: "CDMRP Neurofibromatosis Research Program",
    }
  ],
}
