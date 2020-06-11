import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import handleParticipantWorkflowChange from '../handleParticipantWorkflowChange'

const rgbIndex = 0
export const dataSql = `SELECT * FROM syn22154087 where WorkflowState = 'hidden'`
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
          handleParticipantWorkflowChange(event, 'uncategorized')
        }),
      },
      {
        buttonText: 'Select for blood draw',
        classNames: 'exampleClassNameToAddToButton',
        onClick: (async (event) => {
          handleParticipantWorkflowChange(event, 'selected')
        }),
      }]
  },
}



export default hidden
