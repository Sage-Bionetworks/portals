import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import facetAliases from '../facetAliases'
import { baseDataSqlColumns, baseDataSqlFrom, baseDataSqlWhere, allFacetsToPlot } from './uncategorized'

const rgbIndex = 0
export const dataSql = `SELECT scheduledLabDrawOn, ${baseDataSqlColumns} ${baseDataSqlFrom} ${baseDataSqlWhere} 'Scheduled'`
export const dataEntityId = 'syn22154087'
const entityId = dataEntityId
const sql = dataSql

export const scheduled: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    entityId,
    shouldDeepLink: true,
    sql,
    name: 'Scheduled Participants',
    facetAliases,
    tableConfiguration: {
    },
    facetsToPlot: allFacetsToPlot,
  },
}

export default scheduled
