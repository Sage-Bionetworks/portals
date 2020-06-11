import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import handleParticipantWorkflowChange from '../handleParticipantWorkflowChange'

const rgbIndex = 0
export const dataSql = `SELECT symptoms_first_day, symptoms_last_day, kind_of_testing, symptom, fever_highest, other_specify, how_was_it_treated, gender, age, ethnicity, kind_of_testing, zip_code, uploadDate, nasal_swab_date, nasal_swab_result, serum_test_date, serum_test_result, healthCode FROM syn22154087 where WorkflowState = 'Hidden'`
export const dataEntityId = 'syn22154087'
const entityId = dataEntityId
const sql = dataSql

export const hidden: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    entityId,
    shouldDeepLink: true,
    sql,
    name: 'Hidden Participants',
    facetAliases,
    facetsToPlot: [
      'gender',
      'ethnicity',
      'kind_of_testing',
      'zip_code',
      'symptom',
    ],
    tableConfiguration: {
      isRowSelectionVisible: true
    },
    visibleColumnCount: 10,
    customControls: [
      {
        buttonText: 'Unhide',
        classNames: 'exampleClassNameToAddToButton',
        onClick: (async (event) => {
          handleParticipantWorkflowChange(event, 'Uncategorized')
        }),
      },
      {
        buttonText: 'Select for blood draw',
        classNames: 'exampleClassNameToAddToButton',
        onClick: (async (event) => {
          handleParticipantWorkflowChange(event, 'Selected')
        }),
      }]
  },
}



export default hidden
