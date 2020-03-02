import { SynapseConstants } from 'synapse-react-client'
import { BaseRoute } from 'types/portal-config'
import { generateOrgConfig } from './generateConfig'
import { studiesEntityId } from '../studies'
import { filesEntityId } from '../files'
import { buttonColors } from '../commonProps'
import { publicationsEntityId } from 'config/synapseConfigs/publications'
import { datasetsEntityId } from 'config/synapseConfigs/datasets'

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
        configs: [
          {
            name: 'Studies',
            synapseConfigArray: generateOrgConfig(orgColumnName, 'Studies'),
            sql: generateOrgConfig(orgColumnName, 'Studies', true),
            entityId: studiesEntityId,
          },
          {
            name: 'Datasets',
            sql: generateOrgConfig(orgColumnName, 'Dataset', true),
            entityId: datasetsEntityId,
            synapseConfigArray: generateOrgConfig(org, 'Dataset', false),
          },
          {
            name: 'Files',
            synapseConfigArray: generateOrgConfig(orgColumnName, 'Files'),
            sql: generateOrgConfig(orgColumnName, 'Files', true),
            entityId: filesEntityId,
          },
          {
            name: 'Publications',
            synapseConfigArray: generateOrgConfig(
              orgColumnName,
              'Publications',
            ),
            sql: generateOrgConfig(orgColumnName, 'Publications', true),
            entityId: publicationsEntityId,
          },
        ],
      },
    },
  ],
}
