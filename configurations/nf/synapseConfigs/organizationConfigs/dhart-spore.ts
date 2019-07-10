import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from '../../../types/portal-config'
import { generateOrgConfig } from './generateConfig'

const org = 'DHART-SPORE'

export const dhartSpore: BaseRoute = {
  name: org,
  to: `/Organizations/${org}`,
  isNested: false,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
        limit: 1,
        sql: "SELECT * FROM syn16858699 WHERE abbreviation = 'DHART SPORE'",
        type: SynapseConstants.FUNDER
      },
      title: 'THE NEUROFIBROMATOSIS THERAPEUTIC ACCELERATION PROGRAM'
    },
    {
      name: 'StatefulButtonControlWrapper',
      props: {
        colors: ['#58A058', '#407BA0'],
        configs: [
          {
            name: 'Files', synapseConfigArray: generateOrgConfig('NIH-NCI', 'Files')
          },
          {
            name: 'Studies', synapseConfigArray: generateOrgConfig('NIH-NCI', 'Studies')
          }
        ]
      }
    },
  ]
}
