import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import {
  baseDataSqlColumns,
  baseDataSqlFrom,
  baseDataSqlWhere,
  allFacetsToPlot,
} from './uncategorized'

const rgbIndex = 0
export const dataSql = `SELECT scheduledLabDrawOn, ${baseDataSqlColumns}, noShow ${baseDataSqlFrom} ${baseDataSqlWhere} 'Scheduled'`
const sql = dataSql

export const scheduled: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    shouldDeepLink: true,
    sql,
    name: 'Scheduled Participants',
    facetAliases,
    tableConfiguration: {},
    facetsToPlot: allFacetsToPlot,
  },
}

export default scheduled
