import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import facetAliases from '../facetAliases'

const rgbIndex = 0
export const dataSql = `SELECT * FROM syn22154087 where WorkflowState = 'invited'`
export const dataEntityId = 'syn22154087'
const entityId = dataEntityId
const sql = dataSql

export const invited: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    entityId,
    shouldDeepLink: true,
    sql,
    name: 'Invited Participants',
    facetAliases,
    tableConfiguration: {
    },
    facetsToPlot: [
      'gender',
      'ethnicity',
      'kind_of_testing',
      'zip_code',
      'symptom',
    ],
  },
}

export default invited
