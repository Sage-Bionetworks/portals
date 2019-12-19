import { SynapseConfigArray } from '../../../types/portal-config'
import { projectCardConfiguration, projectsEntityId } from '../projects'
import programCardConfiguration, { programEntityId } from '../programs'

const modelAd: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      ...programCardConfiguration,
      entityId: programEntityId,
      sql: `SELECT  * FROM syn17024173 WHERE ( ( "Program" = 'MODEL-AD' ) )`,
      backgroundColor: '#5960a5',
      isHeader: true,
    },
  },
  {
    name: 'CardContainerLogic',
    title: 'Explore MODEL-AD',
    props: {
      sql: `SELECT * FROM syn17024229 WHERE ( ( "Program" = 'MODEL-AD' ) )`,
      ...projectCardConfiguration,
      entityId: projectsEntityId,
    },
  },
]

export default modelAd
