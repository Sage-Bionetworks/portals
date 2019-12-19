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
        entityId: 'syn16858699',
        type: SynapseConstants.FUNDER,
      },
      title: 'THE NEUROFIBROMATOSIS THERAPEUTIC ACCELERATION PROGRAM',
    },
    {
      name: 'StatefulButtonControlWrapper',
      props: {
        ...buttonColors,
        configs: [
          {
            name: 'Studies',
            synapseConfigArray: generateOrgConfig(org, 'Studies'),
            sql: generateOrgConfig(org, 'Studies', true),
          },
          {
            name: 'Datasets',
            synapseConfigArray: generateOrgConfig(org, 'Dataset'),
            sql: generateOrgConfig(org, 'Dataset', true),
          },
          {
            name: 'Files',
            synapseConfigArray: generateOrgConfig(org, 'Files'),
            sql: generateOrgConfig(org, 'Files', true),
          },
          {
            name: 'Publications',
            synapseConfigArray: generateOrgConfig(org, 'Publications'),
            sql: generateOrgConfig(org, 'Publications', true),
          },
        ],
      },
    },
  ],
}
