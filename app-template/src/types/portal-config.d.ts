/// <reference types="synapse-react-client" />

import { CardContainerLogicProps } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { MarkdownSynapseProps } from 'synapse-react-client/dist/containers/MarkdownSynapse'
import { StackedBarChartProps } from 'synapse-react-client/dist/containers/StackedBarChart'
import { QueryWrapperMenuProps } from 'synapse-react-client/dist/containers/QueryWrapperMenu'
import { QueryBundleRequest } from 'synapse-react-client/dist/utils/jsonResponses/Table/QueryBundleRequest'
import { QueryResultBundle } from 'synapse-react-client/dist/utils/jsonResponses/Table/QueryResultBundle'
import { HomeButtonControlProps } from '../portal-components/HomeButtonControlWrapper'
import { ExploreButtonControlProps } from '../portal-components/ExploreButtonControlWrapper'

// For styling the header on the home page -- the main title and the summary text
export type HomePageHeaderConfig = {
  summary: string
  title: string
}

// Generic SynapseObject Representation -- maps each component to its props
type CardContainerLogic = {
  name: 'CardContainerLogic'
  props: CardContainerLogicProps
}
// TODO: Export QueryWrapper props object in SRC
type QueryWrapper = {
  name: 'QueryWrapper',
  props: any
}
// TODO: Export QueryWrapper props object in SRC
type QueryWrapperHelper = {
  name: 'QueryWrapperHelper',
  props: any
}

// TODO: correct the props of StackedBarChart
// Below we make all the props optional using Partial
export type OptionalStackedBarChartProps = Partial<StackedBarChartProps>

type StackedBarChart = {
  name: 'StackedBarChart',
  props: OptionalStackedBarChartProps
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

type HomeButtonControl = {
  name: 'HomeButtonControlWrapper',
  props: HomeButtonControlProps
}

type ExploreButtonControl = {
  name: 'ExploreButtonControlWrapper',
  props: ExploreButtonControlProps
}

type Metatdata = {
  title?: string
  link?: string
}

export type SynapseObjectSingle = (
    HomeButtonControl
  | ExploreButtonControl
  | CardContainerLogic
  | StackedBarChart
  | QueryWrapper
  | QueryWrapperHelper
  | QueryWrapperMenu
  | UserCard 
  | Markdown 
)
& Metatdata
export type SynapseObject = SynapseObjectSingle []

// utility for inside the explore page
export type HomeExploreConfig = {
  homePageSynapseObject: SynapseObjectSingle
  explorePageSynapseObject: SynapseObjectSingle
}

export interface BaseRoute {
  name: string
  displayName?: string
  isNested: false
  to: string
  link?: string
  synapseObject: SynapseObject
  routes?: Array<Route>
}

export interface NestedRoute extends BaseRoute {
  isNested: true
  routes: Array<BaseRoute | NestedRoute>
  synapseObject?: SynapseObject
  to?: string
}

export type GenericRoute = NestedRoute | BaseRoute
// Route - end

// Footer - start
export type FooterConfig = {
  contactUs: string
  termsOfService: string
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