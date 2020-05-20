import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { SynapseConstants, SynapseClient } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import facetAliases from '../facetAliases'
import { PartialRow, TableUpdateTransactionRequest } from 'synapse-react-client/dist/utils/synapseTypes/Table/TableUpdate'
import { Row } from 'synapse-react-client/dist/utils/synapseTypes'

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
      // @ts-ignore
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
      customControls: [{
        buttonText: 'Update WorkflowState',
        classNames: 'exampleClassNameToAddToButton',
        onClick: (async (event) => {
          // Demo custom control updates all values in a particular column for the selected rows (CRC)
          // test Updating a Synapse Table for the first time from SRC, by updating the WorkflowState column value
          const entityId:string = event.data?.queryResult.queryResults.tableId!
          // find target column
          const targetColumn = event.data?.columnModels!.find(cm => cm.name === 'WorkflowState')
          // collect all selected rows (create PartialRow objects)
          const rowUpdates:PartialRow[] = []
          const rows:Row[] = event.data?.queryResult.queryResults!.rows
          for (let index = 0; index < event.selectedRowIndices!.length; index++) {
            rowUpdates.push({
              rowId: rows[event.selectedRowIndices![index]].rowId,
              values: [{
                key: targetColumn?.id!,
                value: 'Deselect'
              }]
            })
          }
          
          const request: TableUpdateTransactionRequest = {
            concreteType: 'org.sagebionetworks.repo.model.table.TableUpdateTransactionRequest',
            entityId,
            changes: [{
              concreteType: 'org.sagebionetworks.repo.model.table.AppendableRowSetRequest',
              entityId,
              toAppend: {
                concreteType: 'org.sagebionetworks.repo.model.table.PartialRowSet',
                tableId: entityId,
                rows: rowUpdates
              }
            }]
          }
          const token = await SynapseClient.getSessionTokenFromCookie()
          SynapseClient.updateTable(request, token).then(() => {
            console.log('updated!')
            // refresh data after successful update
            event.refresh()
          })
        }),
      }]
    },
}



export default selected
