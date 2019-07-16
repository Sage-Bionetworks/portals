import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from '../../../types/portal-config'
import { buttonColors } from '../commonProps'
import { generateOrgConfig } from './generateConfig'

const org = 'CTF'

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
      name: 'StatefulButtonControlWrapper',
      props: {
        ...buttonColors,
        configs: [
          {
            name: 'Studies',
            sql: generateOrgConfig(org, 'Studies', true),
            synapseConfigArray: generateOrgConfig(org, 'Studies', false)
          },
          {
            name: 'Datasets',
            sql: generateOrgConfig(org, 'Dataset', true),
            synapseConfigArray: generateOrgConfig(org, 'Dataset', false),
          },
          {
            name: 'Files',
            sql: generateOrgConfig(org, 'Files', true),
            synapseConfigArray: generateOrgConfig(org, 'Files', false)
          },
          {
            name: 'Publications',
            sql: generateOrgConfig(org, 'Publications', true),
            synapseConfigArray: generateOrgConfig(org, 'Publications', false)
          }
        ]
      }
    },
  ]
}
