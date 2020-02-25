import { CardContainerLogicProps } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'
import { StackedBarChartProps } from 'synapse-react-client/dist/containers/StackedBarChart'
import { SynapseTableProps } from 'synapse-react-client/dist/containers/table/SynapseTable'
import { QueryWrapperMenuProps } from 'synapse-react-client/dist/containers/QueryWrapperMenu'
import { UserCardProps } from 'synapse-react-client/dist/containers/UserCard'
import { MarkdownSynapseProps } from 'synapse-react-client/dist/containers/MarkdownSynapse'
import { NewsFeedMenuProps } from 'synapse-react-client/dist/containers/NewsFeedMenu'
import { SynapseFormSubmissionGridProps } from 'synapse-react-client/dist/containers/synapse_form_wrapper/SynapseFormSubmissionsGrid'
import { SynapseFormWrapperProps } from 'synapse-react-client/dist/containers/synapse_form_wrapper/SynapseFormWrapper'
import { RouteButtonControlWrapperProps } from '../portal-components/RouteButtonControlWrapper'
import { HomePageCardContainerProps } from '../portal-components/csbc-home-page/HomePageCardContainer'
import { GenerateComponentsFromRowProps } from './portal-util-types'
import { Operator } from '../portal-components/QueryWrapperFlattened'

// For styling the header on the home page -- the main title and the summary text
export type HomePageHeaderConfig = {
  summary: string | JSX.Element
  title: string
  showBlur?: boolean
  centerText?: boolean
}

// Generic SynapseConfigArray Representation -- maps each component to its props
type CardContainerLogic = {
  props: CardContainerLogicProps
  name: 'CardContainerLogic'
}

type QueryWrapper = {
  name: 'QueryWrapper'
  props: QueryWrapperProps
}

// This should likely be placed in SRC
type QueryWrapperFlattened = {
  name: 'QueryWrapperFlattened'
  props: QueryWrapperProps &
    Partial<StackedBarChartProps> &
    Partial<SynapseTableProps> &
    Operator
}

type StackedBarChart = {
  name: 'StackedBarChart'
  props: StackedBarChartProps
}
type QueryWrapperMenu = {
  name: 'QueryWrapperMenu'
  props: QueryWrapperMenuProps
}

type UserCard = {
  name: 'UserCard'
  props: UserCardProps
}
type Markdown = {
  name: 'Markdown'
  props: MarkdownSynapseProps
}

type StatefulButtonControl = {
  name: 'StatefulButtonControlWrapper'
  props: any
}

type RouteButtonControl = {
  name: 'RouteButtonControlWrapper'
  props: RouteButtonControlWrapperProps
}

type GenerateComponentsFromRow = {
  name: 'GenerateComponentsFromRow'
  props: GenerateComponentsFromRowProps
}

type ConsortiaGoals = {
  name: 'ConsortiaGoals'
  props: undefined
}

type HomePageCardContainer = {
  name: 'HomePageCardContainer'
  props: HomePageCardContainerProps
}

type Metadata = {
  title?: string
  link?: string
  style?: React.CSSProperties
  isOutsideContainer?: boolean
  // applied to the inner most container of the object
  className?: string
  // applied to outer most container of the object
  containerClassName?: string
}

type NewsFeedMenu = {
  name: 'NewsFeedMenu'
  props: NewsFeedMenuProps
}

type SynapseFormWrapper = {
  name: 'SynapseFormWrapper'
  props: SynapseFormWrapperProps
}

type SynapseFormSubmissionsGrid = {
  name: 'SynapseFormSubmissionsGrid'
  props: SynapseFormSubmissionGridProps
}

export type SynapseConfig = (
  | StatefulButtonControl
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
  | SynapseFormWrapper
  | SynapseFormSubmissionsGrid
  | ConsortiaGoals
  | HomePageCardContainer
) &
  Metadata
export type SynapseConfigArray = SynapseConfig[]

// utility for inside the explore page
export type HomeExploreConfig = {
  homePageSynapseObject: SynapseConfig
  explorePageSynapseObject: SynapseConfig
}

interface RouteOptions {
  name: string
  displayName?: string
  isNested: boolean
  programmaticRouteConfig?: SynapseConfigArray
  hideRouteFromNavbar?: boolean
  to?: string
  link?: string
  icon?: string
  synapseConfigArray?: SynapseConfigArray
}

export interface BaseRoute extends RouteOptions {
  isNested: false
}

export interface NestedRoute extends RouteOptions {
  isNested: true
  routes: Array<BaseRoute | NestedRoute>
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
  description: string
}
// DocTitleConfig - end

// LogoConfig
export type LogoConfig = {
  name?: string // plain text
  icon?: string // svg
}
// LogoConfig end

export type BetaBanner = {
  name?: string
  originalSite?: string
  backgroundColor?: string
}
