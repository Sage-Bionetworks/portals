import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import facetAliases from '../facetAliases'
import handleParticipantWorkflowChange from '../handleParticipantWorkflowChange'

const rgbIndex = 0
export const dataSql = `SELECT symptoms_first_day, symptoms_last_day, kind_of_testing, symptom, fever_highest, other_specify, how_was_it_treated, gender, age, ethnicity, kind_of_testing, zip_code, uploadDate, nasal_swab_date, nasal_swab_result, serum_test_date, serum_test_result, healthCode FROM syn22154087 where WorkflowState = 'uncategorized'`
export const dataEntityId = 'syn22154087'
const entityId = dataEntityId
const sql = dataSql

export const uncategorized: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    entityId,
    shouldDeepLink: true,
    sql,
    name: 'Uncategorized Participants',
    facetAliases,
    tableConfiguration: {
      isRowSelectionVisible: true,
    },
    facetsToPlot: [
      'gender',
      'ethnicity',
      'kind_of_testing',
      'zip_code',
      'symptom',
    ],
    customControls: [
      {
        buttonText: 'Select for blood draw',
        classNames: 'exampleClassNameToAddToButton',
        onClick: (async (event) => {
          handleParticipantWorkflowChange(event, 'selected')
        }),
      },
      {
        buttonText: 'Hide from view',
        classNames: 'exampleClassNameToAddToButton',
        onClick: (async (event) => {
          handleParticipantWorkflowChange(event, 'hidden')
        }),
      }]
  },
}

export default uncategorized
