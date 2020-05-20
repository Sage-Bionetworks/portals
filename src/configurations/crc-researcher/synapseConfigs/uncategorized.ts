import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import facetAliases from '../facetAliases'
import handleParticipantWorkflowChange from '../handleParticipantWorkflowChange'

const rgbIndex = 0
export const dataSql = `SELECT * FROM syn22084217 where WorkflowState = 'Uncategorized'`
export const dataEntityId = 'syn22084217'
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
      'COVID19TestType',
      'Age',
      'ZipCode',
      'Sex',
      'Ethnicity',  
    ],
    customControls: [
      {
        buttonText: 'Select for blood draw',
        classNames: 'exampleClassNameToAddToButton',
        onClick: (async (event) => {
          handleParticipantWorkflowChange(event, 'Selected')
        }),
      },
      {
        buttonText: 'Hide from view',
        classNames: 'exampleClassNameToAddToButton',
        onClick: (async (event) => {
          handleParticipantWorkflowChange(event, 'Hidden')
        }),
      }]
  },
}

export default uncategorized
