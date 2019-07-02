import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from '../../../types/portal-config'

export const dhartSpore: BaseRoute = {
  name: 'DHART-SPORE',
  to: '/Organizations/DHART-SPORE',
  isNested: false,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
        limit: 1,
        sql: "SELECT * FROM syn16858699 WHERE abbreviation = 'DHART SPORE'",
        type: SynapseConstants.FUNDER
      },
      title: 'The Developmental And Hyperactive RAS Tumor SPORE'
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql: "SELECT * FROM syn16787123 WHERE fundingAgency = 'NIH-NCI'",
        type: SynapseConstants.STUDY
      },
      title: 'Funded Studies'
    },
  ]
}
