import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from '../../../types/portal-config'

export const cdmrp: BaseRoute = {
  name: 'CDMRP-NFRP',
  to: '/Organizations/CDMRP-NFRP',
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
      title: 'CDMRP Neurofibromatosis Research Program',
    },
  ],
}
