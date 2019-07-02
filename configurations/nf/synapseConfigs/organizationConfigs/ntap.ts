import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from '../../../types/portal-config'

export const ntap: BaseRoute = {
  name: 'NTAP',
  to: '/Organizations/NTAP',
  isNested: false,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
        limit: 1,
        sql: "SELECT * FROM syn16858699 WHERE abbreviation = 'NTAP'",
        type: SynapseConstants.FUNDER
      },
      title: 'The Neurofibromatosis Therapeutic Acceleration Program'
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql: "SELECT * FROM syn16787123 WHERE fundingAgency = 'NTAP'",
        type: SynapseConstants.STUDY
      },
      title: 'Funded Studies'
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql: "SELECT * FROM syn16857542 WHERE fundingAgency = 'NTAP'",
        type: SynapseConstants.PUBLICATION
      },
      title: 'NEW PUBLICATIONS'
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql: "SELECT * FROM syn16859580 WHERE fundingAgency = 'NTAP'",
        type: SynapseConstants.DATASET
      },
      title: 'DATASETS'
    },
  ]
}
