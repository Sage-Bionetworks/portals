import { SynapseConfig } from './portal-config'
import { RowSynapseConfig } from '../portal-components/GenerateComponentsFromRow'

/* 
  These are types that come up frequently between portals but are an
  implementation detail, not a core type that should be relied up in 
  the portal.
*/

declare type HomeExploreConfig = {
  homePageSynapseObject: QueryWrapper
  explorePageSynapseObject: SynapseConfig
}

declare module '*.svg' {
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
}

export type RowSynapseConfig = SynapseConfig & RowToPropTransform
export declare type GenerateComponentsFromRowProps = {
  searchParams?: Dictionary<string>
  sql: string
  token?: string
  synapseConfigArray: RowSynapseConfig[]
}
