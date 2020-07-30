import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import handleParticipantWorkflowChange from '../handleParticipantWorkflowChange'

const rgbIndex = 0

export const baseDataSqlColumns = `symptom, 
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
    testLocation,
    dataGroups`

export const baseDataSqlFrom = ` FROM syn22154087 `
export const baseDataSqlWhere = ` WHERE testLocation IN ('lab', 'home', 'noTest') AND dataGroups NOT HAS ('test_user') AND uploadDate > 1595808000000 AND WorkflowState = `

export const baseDataSql = `SELECT ${baseDataSqlColumns} ${baseDataSqlFrom} ${baseDataSqlWhere}  `

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
        buttonText: 'Select as potential',
        classNames: 'exampleClassNameToAddToButton',
        onClick: (async (event) => {
          handleParticipantWorkflowChange(event, 'Potential')
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
