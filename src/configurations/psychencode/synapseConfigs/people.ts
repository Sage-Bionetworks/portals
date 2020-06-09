import { SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const name = 'PEOPLE'
const sql = 'SELECT * FROM syn22096112'
const entityId = 'syn13897207'
const rgbIndex = 4

export const people: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    entityId,
    sql,
    cardConfiguration: {
      type: SynapseConstants.MEDIUM_USER_CARD,
    },
    rgbIndex,
    name,
    loadingScreen,
    shouldDeepLink: true,
    hideDownload: true,
  },
}
