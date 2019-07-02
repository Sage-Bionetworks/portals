import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from '../../../types/portal-config'

export const ctf: BaseRoute = {
  name: 'CTF',
  to: '/Organizations/CTF',
  isNested: false,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
        limit: 1,
        sql: "SELECT * FROM syn16858699 WHERE abbreviation = 'CTF'",
        type: SynapseConstants.FUNDER
      },
      title: "Children's Tumor Foundation"
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql: "SELECT * FROM syn16787123 WHERE fundingAgency = 'CTF'",
        type: SynapseConstants.STUDY
      },
      title: 'Funded Studies'
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql: "SELECT * FROM syn16857542 WHERE fundingAgency = 'CTF'",
        type: SynapseConstants.PUBLICATION
      },
      title: 'NEW PUBLICATIONS'
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql: "SELECT * FROM syn16859580 WHERE fundingAgency = 'CTF'",
        type: SynapseConstants.DATASET
      },
      title: 'DATASETS'
    },
  ]
}
