import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import handleParticipantWorkflowChange from '../handleParticipantWorkflowChange'

const rgbIndex = 0
export const dataSql = `SELECT * FROM syn22084217 where WorkflowState = 'Hidden'`
export const dataEntityId = 'syn22084217'
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
