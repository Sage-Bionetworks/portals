import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import { baseDataSqlColumns, baseDataSqlFrom, baseDataSqlWhere, allFacetsToPlot } from './uncategorized'

const rgbIndex = 0
export const dataSql = `SELECT testResult, ${baseDataSqlColumns} ${baseDataSqlFrom} ${baseDataSqlWhere} 'Tested'`
export const dataEntityId = 'syn22154087'
const entityId = dataEntityId
const sql = dataSql

export const tested: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    entityId,
    shouldDeepLink: true,
    sql,
    name: 'Tested Participants',
    facetAliases,
    tableConfiguration: {
    },
    facetsToPlot: allFacetsToPlot,
  },
}

export default tested
