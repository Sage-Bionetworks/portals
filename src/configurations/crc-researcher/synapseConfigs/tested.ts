import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import {
  baseDataSqlColumns,
  baseDataSqlFrom,
  baseDataSqlWhere,
  allFacetsToPlot,
} from './uncategorized'

const rgbIndex = 0
export const dataSql = `SELECT testResult, ${baseDataSqlColumns} ${baseDataSqlFrom} ${baseDataSqlWhere} 'Tested'`
const sql = dataSql

export const tested: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    shouldDeepLink: true,
    sql,
    name: 'Tested Participants',
    facetAliases,
    tableConfiguration: {},
    facetsToPlot: allFacetsToPlot,
  },
}

export default tested
