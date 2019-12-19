import { SynapseConfigArray } from '../../../types/portal-config'
import { projectCardConfiguration, projectsEntityId } from '../projects'
import programCardConfiguration, { programEntityId } from '../programs'

const resilienceAd: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      ...programCardConfiguration,
      entityId: programEntityId,
      sql: `SELECT  * FROM syn17024173 WHERE ( ( "Program" = 'Resilience-AD' ) )`,
      backgroundColor: '#5960a5',
      isHeader: true,
    },
  },
  {
    name: 'CardContainerLogic',
    title: 'Explore RESILIENCE-AD',
    props: {
      sql: `SELECT * FROM syn17024229 WHERE ( ( "Program" = 'Resilience-AD' ) )`,
      entityId: projectsEntityId,
      ...projectCardConfiguration,
    },
  },
]

export default resilienceAd
