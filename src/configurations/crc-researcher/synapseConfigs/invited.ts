import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import {
  baseDataSqlColumns,
  baseDataSqlFrom,
  baseDataSqlWhere,
  allFacetsToPlot,
} from './uncategorized'

const rgbIndex = 0
export const dataSql = `SELECT inviteSentOn, ${baseDataSqlColumns} ${baseDataSqlFrom} ${baseDataSqlWhere} 'Invited'`
const sql = dataSql

export const invited: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    shouldDeepLink: true,
    sql,
    name: 'Invited Participants',
    facetAliases,
    tableConfiguration: {},
    facetsToPlot: allFacetsToPlot,
  },
}

export default invited
