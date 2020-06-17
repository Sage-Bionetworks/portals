import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import facetAliases from '../facetAliases'
import handleParticipantWorkflowChange from '../handleParticipantWorkflowChange'

const rgbIndex = 0

export const baseDataSql = `SELECT 
    symptom, 
    firstDayOfSymptoms, 
    lastDayOfSymptoms,
    worstDayOfSymptoms,
    dontFeelBetter,
    recoveryDateOfSymptoms,
    stillHaveSymptoms,
    testType,
    feverHighest, 
    otherSpecify, 
    howWasItTreated, 
    gender, 
    age, 
    ethnicity, 
    zipcode, 
    nasalSwabDate, 
    nasalSwabResult, 
    serumTestDate, 
    serumTestResult, 
    uploadDate,
    healthCode,
    recordId,
    testLocation
  FROM syn22154087 where WorkflowState = `
export const allFacetsToPlot = [
  'gender',
  'ethnicity',
  'testType',
  'zipcode',
  'symptom',
  'testLocation',
]
export const dataSql = `${baseDataSql} 'Uncategorized'`
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
    facetsToPlot: allFacetsToPlot,
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
