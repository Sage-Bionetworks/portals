/// <reference types="synapse-react-client" />

import { CardContainerLogicProps } from "synapse-react-client/dist/containers/CardContainerLogic";
import { MarkdownSynapseProps } from "synapse-react-client/dist/containers/MarkdownSynapse";
import { StackedBarChartProps } from "synapse-react-client/dist/containers/StackedBarChart";
import { QueryWrapperMenuProps } from "synapse-react-client/dist/containers/QueryWrapperMenu";

// Home - start
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
// type QueryWrapper = {
//   name: 'QueryWrapper',
//   props: QueryWrapperProps
// }

type StackedBarChart = {
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

type Title = {
  title: string
}

export type SynapseObject = (CardContainerLogic | StackedBarChart | QueryWrapperMenu | UserCard | Markdown) & Title

export type HomeConfig = {
  homeSynapseObjects: (SynapseObject) []
}
// Home - end

// Route - begin
// TODO: Figure out a way that the route object maintains the synapseObject typing
export type Route = {
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

export type GenericRoute = (Route | NestedRoute)
// Route - end