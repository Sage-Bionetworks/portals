/// <reference types="synapse-react-client" />

import { CardContainerLogicProps } from "synapse-react-client/dist/containers/CardContainerLogic";
import { MarkdownSynapseProps } from "synapse-react-client/dist/containers/MarkdownSynapse";
import { StackedBarChartProps } from "synapse-react-client/dist/containers/StackedBarChart";
import { QueryWrapperMenuProps } from "synapse-react-client/dist/containers/QueryWrapperMenu";
import { QueryBundleRequest } from "synapse-react-client/dist/utils/jsonResponses/Table/QueryBundleRequest";
import { QueryResultBundle } from "synapse-react-client/dist/utils/jsonResponses/Table/QueryResultBundle";
import { StackedBarChartControlProps } from "../custom-components/StackedBarChartControl";

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

type StackedBarChartControl = {
  name: 'StackedBarChartControl',
  props: StackedBarChartControlProps
}

type Metatdata = {
  title?: string
  link?: string
}

export type SynapseObjectSingle = (StackedBarChartControl | CardContainerLogic | StackedBarChart | QueryWrapper | QueryWrapperMenu | UserCard | Markdown ) & Metatdata
export type SynapseObject = SynapseObjectSingle [] 

// utility for inside the explore page
export type HomeExploreConfig = {
  homePageSynapseObject: SynapseObjectSingle
  explorePageSynapseObject: SynapseObjectSingle
}

export type Route = {
  to: string
  isNested: false       
  name: string
  link?: string
  synapseObject: SynapseObject
}

export type NestedRoute = {
  name: string
  isNested: true
  routes: Array<Route>
}

export type GenericRoute = (Route | NestedRoute)
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

// LogoHeaderConfig
export type LogoHeaderConfig = {
  name?: string  // plain text
  icon?: string  // svg
}
// LogoHeaderConfig end