import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import handleParticipantWorkflowChange from '../handleParticipantWorkflowChange'

const rgbIndex = 0
export const dataSql = `SELECT * FROM syn22084217 where WorkflowState = 'Selected'`
export const dataEntityId = 'syn22084217'
const entityId = dataEntityId
const sql = dataSql

export const selected: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    entityId,
    shouldDeepLink: true,
    sql,
    name: 'Selected Participants',
    facetAliases,
    facetsToPlot: [
      'COVID19TestType',
      'Age',
      'ZipCode',
      'Sex',
      'Ethnicity',
    ],
    tableConfiguration: {
      isRowSelectionVisible: true
    },
    visibleColumnCount: 10,
    customControls: [
      {
        buttonText: 'Send blood draw invite',
        classNames: 'exampleClassNameToAddToButton',
        onClick: (async (event) => {
          handleParticipantWorkflowChange(event, 'Invited')
        }),
      },
      {
        buttonText: 'Deselect for blood draw',
        classNames: 'exampleClassNameToAddToButton',
        onClick: (async (event) => {
          handleParticipantWorkflowChange(event, 'Uncategorized')
        }),
      }]
  },
}



export default selected
