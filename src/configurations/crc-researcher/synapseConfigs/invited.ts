import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import facetAliases from '../facetAliases'

const rgbIndex = 0
export const dataSql = `SELECT symptoms_first_day, symptoms_last_day, kind_of_testing, symptom, fever_highest, other_specify, how_was_it_treated, gender, age, ethnicity, kind_of_testing, zip_code, uploadDate, nasal_swab_date, nasal_swab_result, serum_test_date, serum_test_result, healthCode FROM syn22154087 where WorkflowState = 'Invited'`
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
