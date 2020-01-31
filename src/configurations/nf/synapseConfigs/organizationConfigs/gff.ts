import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from 'types/portal-config'

export const gff: BaseRoute = {
  name: 'GFF',
  to: '/Organizations/GFF',
  isNested: false,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
        limit: 1,
        sql: "SELECT * FROM syn16858699 WHERE abbreviation = 'GFF'",
        type: SynapseConstants.FUNDER,
        entityId: 'syn16858699',
      },
      title: 'Gilbert Family Foundation (GFF)',
    },
  ],
}
