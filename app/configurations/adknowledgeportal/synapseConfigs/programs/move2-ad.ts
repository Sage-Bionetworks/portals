import { SynapseConfigArray } from '../../src/types/portal-config'
import { projectCardConfiguration, projectsEntityId } from '../projects'
import programCardConfiguration, { programEntityId } from '../programs'

const move2Ad: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      ...programCardConfiguration,
      sql: `SELECT  * FROM syn17024173 WHERE ( ( "Program" = 'M2OVE-AD' ) )`,
      entityId: programEntityId,
      backgroundColor: '#5960a5',
      isHeader: true,
    },
  },
  {
    name: 'CardContainerLogic',
    title: 'Explore MOVE2-AD',
    props: {
      sql: `SELECT * FROM syn17024229 WHERE ( ( "Program" = 'M2OVE-AD' ) )`,
      ...projectCardConfiguration,
      entityId: projectsEntityId,
    },
  },
]

export default move2Ad
