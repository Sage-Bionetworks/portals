import { SynapseConfig } from './portal-config'
import { SQLOperator } from 'synapse-react-client/dist/utils/functions/sqlFunctions'
import { Icon } from 'synapse-react-client/dist/containers/IconSvg'

/* 
  These are types that come up frequently between portals but are an
  implementation detail, not a core type that should be relied up in 
  the portal.
*/
// The props for DetailsPageProps are kept here so that
// the configuration files can import the type

export type ResolveSynId = {
  title?: boolean
  value?: boolean
}

type ToggleConfigs = {
  icon1: Icon
  config1: RowSynapseConfig
  icon2: Icon
  config2: RowSynapseConfig
}

type RowToPropTransform = {
  standalone?: boolean // if true then dont inject props
  resolveSynId?: ResolveSynId
  tableSqlKeys?: string[]
  columnName?: string
  injectMarkdown?: boolean
  showTitleSeperator?: boolean
  overrideSqlSourceTable?: boolean
  toggleConfigs?: ToggleConfigs // PORTALS-2229: set if we should show a toggle
}

export type RowSynapseConfig = SynapseConfig & RowToPropTransform

export type DetailsPageProps = {
  showMenu?: boolean // default to true
  searchParams?: {
    [index: string]: string
  }
  sql: string
  synapseConfigArray?: RowSynapseConfig[]
  sqlOperator?: SQLOperator
  tabLayout?: DetailsPageTabProps[]
}

export type DetailsPageTabProps = {
  title: string
  iconName?: string
  cssClass?: string
  tabLayout?: DetailsPageTabProps[]
  synapseConfigArray?: RowSynapseConfig[]
}
