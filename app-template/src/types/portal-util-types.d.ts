import { SynapseConfig } from './portal-config'
import { RowSynapseConfig } from '../portal-components/GenerateComponentsFromRow'
import { SQLOperator } from 'synapse-react-client/dist/utils/modules/sqlFunctions'

/* 
  These are types that come up frequently between portals but are an
  implementation detail, not a core type that should be relied up in 
  the portal.
*/

module '*.svg' {
  const content: string
  export default content
}

// The props for GenerateComponentsFromRowProps are kept here so that
// the configuration files can import the type

type ResolveSynId = {
  title?: boolean
  value?: boolean
}

type RowToPropTransform = {
  standalone?: boolean // if true then dont inject props
  resolveSynId?: ResolveSynId
  tableSqlKeys?: string[]
  columnName?: string
  showTitleSeperator?: boolean
}

export type RowSynapseConfig = SynapseConfig & RowToPropTransform
export type GenerateComponentsFromRowProps = {
  showMenu?: boolean // default to true
  searchParams?: Dictionary<string>
  sql: string
  token?: string
  synapseConfigArray: RowSynapseConfig[]
  sqlOperator?: SQLOperator
}
