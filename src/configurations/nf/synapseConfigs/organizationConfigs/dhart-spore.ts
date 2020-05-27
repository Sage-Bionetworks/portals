import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from 'types/portal-config'
import { buttonColors } from '../commonProps'
import { generateOrgConfigImproved } from './generateConfig'

const org = 'DHART-SPORE'

const orgColumnName = 'NIH-NCI'
export const dhartSpore: BaseRoute = {
  name: org,
  displayName: 'NCI DHART SPORE',
  to: `/Organizations/${org}`,
  isNested: false,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: {
        limit: 1,
        sql: "SELECT * FROM syn16858699 WHERE abbreviation = 'DHART SPORE'",
        type: SynapseConstants.FUNDER,
        entityId: 'syn16858699',
      },
      title: 'THE DEVELOPMENTAL AND HYPERACTIVE RAS TUMOR SPORE',
    },
    {
      name: 'StatefulButtonControlWrapper',
      props: {
        ...buttonColors,
        configs: generateOrgConfigImproved(orgColumnName),
      },
    },
  ],
}
