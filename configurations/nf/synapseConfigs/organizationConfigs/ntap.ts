import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from '../../../types/portal-config'
import { buttonColors } from '../commonProps'
import { generateOrgConfig } from './generateConfig'

const org = 'NTAP'

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
      title: "Children's Tumor Foundation"
    },
    {
      name: 'StatefulButtonControlWrapper',
      props: {
        ...buttonColors,
        configs: [
          {
            name: 'Datasets', synapseConfigArray: generateOrgConfig(org, 'Dataset')
          },
          {
            name: 'Files', synapseConfigArray: generateOrgConfig(org, 'Files')
          },
          {
            name: 'Studies', synapseConfigArray: generateOrgConfig(org, 'Studies')
          },
          {
            name: 'Publications', synapseConfigArray: generateOrgConfig(org, 'Publications')
          }
        ]
      }
    },
  ]
}
