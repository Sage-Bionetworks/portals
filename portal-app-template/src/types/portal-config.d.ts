/// <reference types="synapse-react-client" />

import { CardContainerLogicProps } from "synapse-react-client/dist/containers/CardContainerLogic";
import { MarkdownSynapseProps } from "synapse-react-client/dist/containers/MarkdownSynapse";
import { StackedBarChartProps } from "synapse-react-client/dist/containers/StackedBarChart";
import { QueryWrapperMenuProps } from "synapse-react-client/dist/containers/QueryWrapperMenu";
import { QueryBundleRequest } from "synapse-react-client/dist/utils/jsonResponses/Table/QueryBundleRequest";
import { QueryResultBundle } from "synapse-react-client/dist/utils/jsonResponses/Table/QueryResultBundle";

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

type Metatdata = {
  title?: string
  link?: string
}

export type SynapseObjectSingle = (CardContainerLogic | StackedBarChart | QueryWrapper | QueryWrapperMenu | UserCard | Markdown ) & Metatdata
export type SynapseObject = SynapseObjectSingle [] 

// TODO: Figure out a way that the route object maintains the synapseObject typing
export type CountQuery = {
  countQuery: QueryBundleRequest
}

// utility for inside the explore page
export type HomeExploreConfig = {
  homePageSynapseObject: QueryWrapper
  explorePageSynapseObject: SynapseObjectSingle & CountQuery
}

// Routing -- we break down routes that used for either the Explore/Home page combination OR any page in general
export type ExploreRoute = {
  type: 'ExploreRoute'
  to: string
  isNested: false
  name: string
} & HomeExploreConfig

export type ExploreNestedRoute = {
  name: 'Explore'
  isNested: true
  [index:number]: ExploreRoute
  routes: ExploreRoute []
}

export type Route = {
  type: 'Route'
  to: string
  isNested: false
  name: string
  synapseObject: SynapseObject
}

export type NestedRoute = {
  name: string
  isNested: true
  routes: Route []
}

export type GenericRoute = (Route | NestedRoute | ExploreNestedRoute)
// Route - end

// Footer - start
export type FooterConfig = {
  contactUs: string
  termsOfService: string
}
// Footer end

// docTitleConfig - start
export type DocTitleConfig = {
  name: string
}
// Footer end

// home
export type HomeConfig = {
  homeSynapseObjects: SynapseObject
}
// home end

// name 
export type Name = string
// name end