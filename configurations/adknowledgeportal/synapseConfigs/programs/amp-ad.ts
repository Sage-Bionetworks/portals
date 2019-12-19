import { SynapseConfigArray } from '../../../types/portal-config'
import { projectCardConfiguration, projectsEntityId } from '../projects'
import programCardConfiguration from '../programs'

const ampAd: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      ...programCardConfiguration,
      sql: `SELECT  * FROM syn17024173 WHERE ( ( "Program" = 'AMP-AD' ) )`,
      entityId: 'syn17024173',
      backgroundColor: '#5960a5',
      isHeader: true,
    },
  },
  {
    name: 'CardContainerLogic',
    title: 'Explore AMP-AD',
    props: {
      ...projectCardConfiguration,
      entityId: projectsEntityId,
      sql: `SELECT  * FROM syn17024229 WHERE ( ( "Program" = 'AMP-AD' ) )`,
    },
  },
]

export default ampAd
