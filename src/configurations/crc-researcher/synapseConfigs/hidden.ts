import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import handleParticipantWorkflowChange from '../handleParticipantWorkflowChange'
import { baseDataSql, allFacetsToPlot } from './uncategorized'

const rgbIndex = 0
export const dataSql = `${baseDataSql} 'Hidden'`
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
    facetsToPlot: allFacetsToPlot,
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
