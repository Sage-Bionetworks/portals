/// <reference types="synapse-react-client" />

import { CardContainerLogicProps } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { MarkdownSynapseProps } from 'synapse-react-client/dist/containers/MarkdownSynapse'
import { StackedBarChartProps } from 'synapse-react-client/dist/containers/StackedBarChart'
import { QueryWrapperMenuProps } from 'synapse-react-client/dist/containers/QueryWrapperMenu'
import { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'
import { QueryBundleRequest } from 'synapse-react-client/dist/utils/jsonResponses/Table/QueryBundleRequest'
import { QueryResultBundle } from 'synapse-react-client/dist/utils/jsonResponses/Table/QueryResultBundle'
import { StatefulButtonControlProps } from '../portal-components/StatefulButtonControlWrapper'
import { RouteButtonControlProps } from '../portal-components/RouteButtonControlWrapper'
import { LinkedComponentProps } from '../portal-components/LinkedComponent'

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

type QueryWrapperWithStackedBarChart = {
  name: 'QueryWrapperWithStackedBarChart',
  props: QueryWrapperProps
}

// TODO: correct the props of StackedBarChart
// Below we make all the props optional using Partial
export type OptionalStackedBarChartProps = Partial<StackedBarChartProps>

declare type StackedBarChart = {
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

type StatefulButtonControl = {
  name: 'StatefulButtonControlWrapper',
  props: StatefulButtonControlProps
}

type RouteButtonControl = {
  name: 'RouteButtonControlWrapper',
  props: RouteButtonControlProps
}

type LinkedComponent = {
  name: 'LinkedComponent',
  props: LinkedComponentProps
}

type Metatdata = {
  title?: string
  link?: string
  isOutsideContainer?: booleam
}

export type SynapseConfig = (
    StatefulButtonControl
  | RouteButtonControl
  | CardContainerLogic
  | StackedBarChart
  | QueryWrapper
  | QueryWrapperWithStackedBarChart
  | QueryWrapperMenu
  | UserCard 
  | Markdown 
  | LinkedComponent 
) & Metatdata
export type SynapseConfigArray = SynapseConfig []

// utility for inside the explore page
export type HomeExploreConfig = {
  homePageSynapseObject: SynapseConfigArray
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
  contactUs: string
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
