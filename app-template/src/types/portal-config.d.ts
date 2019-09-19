/// <reference types="synapse-react-client" />

import { StatefulButtonControlProps } from '../portal-components/StatefulButtonControlWrapper'
import { RouteButtonControlProps } from '../portal-components/RouteButtonControlWrapper'

// For styling the header on the home page -- the main title and the summary text
export type HomePageHeaderConfig = {
  summary: string
  title: string
}

// Generic SynapseConfigArray Representation -- maps each component to its props
declare type CardContainerLogic = {
  name: 'CardContainerLogic'
  props: CardContainerLogicProps
}

type QueryWrapper = {
  name: 'QueryWrapper',
  props: QueryWrapperProps
}

// This should likely be placed in SRC
type QueryWrapperFlattened = {
  name: 'QueryWrapperFlattened',
  props: QueryWrapperProps & Partial<StackedBarChartProps> & Partial<SynapseTableProps>
}

declare type StackedBarChart = {
  name: 'StackedBarChart',
  props: StackedBarChartProps
}
type QueryWrapperMenu = {
  name: 'QueryWrapperMenu',
  props: QueryWrapperMenuProps
}

type UserCard = {
  name: 'UserCard',
  props: UserCardProps
}
type Markdown = {
  name: 'Markdown',
  props: MarkdownProps
}

type StatefulButtonControl = {
  name: 'StatefulButtonControlWrapper',
  props: StatefulButtonControlProps
}

type RouteButtonControl = {
  name: 'RouteButtonControlWrapper',
  props: RouteButtonControlProps
}

type GenerateComponentsFromRow = {
  name: 'GenerateComponentsFromRow',
  props: GenerateComponentsFromRowProps
}

type Metatdata = {
  title?: string
  link?: string
  style?: React.CSSProperties
  isOutsideContainer?: booleam
}

type NewsFeedMenu = {
  name: 'NewsFeedMenu',
  props: NewsFeedMenuProps
}

type DrugUploadTool = {
  name: 'DrugUploadTool',
  props: DrugUploadToolProps
}

type UserFileGridForm = {
  name: 'UserFileGrid',
  props: UserGFileGridProps
}

export type SynapseConfig = (
    StatefulButtonControl
  | RouteButtonControl
  | CardContainerLogic
  | StackedBarChart
  | QueryWrapper
  | QueryWrapperFlattened
  | QueryWrapperMenu
  | UserCard 
  | Markdown 
  | GenerateComponentsFromRow
  | NewsFeedMenu 
  | DrugUploadTool 
  | UserFileGridForm 
) & Metatdata
export type SynapseConfigArray = SynapseConfig []

// utility for inside the explore page
export type HomeExploreConfig = {
  homePageSynapseObject: SynapseConfig
  explorePageSynapseObject: SynapseConfig
}

export interface BaseRoute {
  name: string
  displayName?: string
  isNested: false
  programmaticRouteConfig?: SynapseConfigArray
  hideRouteFromNavbar?: boolean
  to: string
  link?: string
  icon?: string
  synapseConfigArray: SynapseConfigArray
}

export interface NestedRoute extends BaseRoute {
  isNested: true
  routes: Array<BaseRoute | NestedRoute>
  synapseConfigArray?: SynapseConfigArray
  to?: string
  icon?: string
}

export type GenericRoute = NestedRoute | BaseRoute
// Route - end

// Footer - start
export type FooterConfig = {
  contactUs?: string
  termsOfService: string
  forum?: string
}
// Footer end

// DocTitleConfig - start
export type DocTitleConfig = {
  name: string
}
// DocTitleConfig - end

// LogoConfig
export type LogoConfig = {
  name?: string  // plain text
  icon?: string  // svg
}
// LogoConfig end

export type BetaBanner = {
  name?: string
  originalSite?: string
  backgroundColor?: string
}
