import { CardContainerLogicProps } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'
import { StackedBarChartProps } from 'synapse-react-client/dist/containers/StackedBarChart'
import { QueryWrapperMenuProps } from 'synapse-react-client/dist/containers/QueryWrapperMenu'
import { UserCardProps } from 'synapse-react-client/dist/containers/UserCard'
import { ExternalFileHandleLinkProps } from 'synapse-react-client/dist/containers/ExternalFileHandleLink'
import { UpsetPlotProps } from 'synapse-react-client/dist/containers/UpsetPlot'
import { MarkdownSynapseProps } from 'synapse-react-client/dist/containers/MarkdownSynapse'
import { NewsFeedMenuProps } from 'synapse-react-client/dist/containers/NewsFeedMenu'
import { GoalsProps } from 'synapse-react-client/dist/containers/Goals'
import { ResourcesProps } from 'synapse-react-client/dist/containers/Resources'
import { SynapseFormSubmissionGridProps } from 'synapse-react-client/dist/containers/synapse_form_wrapper/SynapseFormSubmissionsGrid'
import { QueryWrapperPlotNavProps } from 'synapse-react-client/dist/containers/query_wrapper_plot_nav/QueryWrapperPlotNav'
import { SynapseFormWrapperProps } from 'synapse-react-client/dist/containers/synapse_form_wrapper/SynapseFormWrapper'
import { ThemesPlotProps } from 'synapse-react-client/dist/containers/widgets/themes-plot/ThemesPlot'
import { RouteButtonControlWrapperProps } from '../portal-components/RouteButtonControlWrapper'
import { HomePageCardContainerProps } from '../portal-components/csbc-home-page/HomePageCardContainer'
import { AboutPortalProps } from '../portal-components/csbc-home-page/AboutPortal'
import { EcosystemProps } from '../portal-components/csbc-home-page/Ecosystem'
import { TableWithSideFacetsProps } from '../portal-components/csbc-home-page/TableWithSideFacets'
import { DetailsPageProps } from './portal-util-types'
import { QueryWrapperFlattenedProps } from '../portal-components/QueryWrapperFlattened'
import { StandaloneQueryWrapperProps } from '../portal-components/StandaloneQueryWrapper'
import { StatefulButtonControlWrapperProps } from 'portal-components/StatefulButtonControlWrapper'
import { ParticipantsBarPlotProps } from '../portal-components/crc-researcher/ParticipantsBarPlot'
import { StatusLineChartProps } from '../portal-components/crc-researcher/StatusLineChart'

// For styling the header on the home page -- the main title and the summary text
export type HomePageHeaderConfig = {
  summary: string | JSX.Element
  title: string
  showBlur?: boolean
  centerText?: boolean
  HeaderSvg?: any
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
  props: QueryWrapperFlattenedProps
}

type StackedBarChart = {
  name: 'StackedBarChart'
  props: StackedBarChartProps
}
type QueryWrapperMenu = {
  name: 'QueryWrapperMenu'
  props: QueryWrapperMenuProps
}

type QueryWrapperPlotNav = {
  name: 'QueryWrapperPlotNav'
  props: QueryWrapperPlotNavProps
}

type UserCard = {
  name: 'UserCard'
  props: UserCardProps
}

type Markdown = {
  name: 'Markdown'
  props: MarkdownSynapseProps
}

type ThemesPlot = {
  name: 'ThemesPlot'
  props: ThemesPlotProps
}

type Goals = {
  name: 'Goals'
  props: GoalsProps
}

type Resources = {
  name: 'Resources'
  props: ResourcesProps
}

type StatefulButtonControl = {
  name: 'StatefulButtonControlWrapper'
  props: StatefulButtonControlWrapperProps
}

type RouteButtonControl = {
  name: 'RouteButtonControlWrapper'
  props: RouteButtonControlWrapperProps
}

type DetailsPage = {
  name: 'DetailsPage'
  props: DetailsPageProps
}

type ConsortiaGoals = {
  name: 'ConsortiaGoals'
  props: undefined
}

type FunderCards = {
  name: 'FunderCards'
  props: undefined
}

type HomePageCardContainer = {
  name: 'HomePageCardContainer'
  props: HomePageCardContainerProps
}

type Ecosystem = {
  name: 'Ecosystem'
  props: EcosystemProps
}

type AboutPortal = {
  name: 'AboutPortal'
  props: AboutPortalProps
}

type TableWithSideFacets = {
  name: 'TableWithSideFacets'
  props: TableWithSideFacetsProps
}

type DevelopedBySage = {
  name: 'DevelopedBySage'
  props: undefined
}

type ExternalFileHandleLink = {
  name: 'ExternalFileHandleLink'
  props: ExternalFileHandleLinkProps
}
type UpsetPlot = {
  name: 'UpsetPlot'
  props: UpsetPlotProps
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

type StandaloneQueryWrapper = {
  name: 'StandaloneQueryWrapper'
  props: StandaloneQueryWrapperProps
}

type ParticipantsBarPlot = {
  name: 'ParticipantsBarPlot'
  props: ParticipantsBarPlotProps
}

type StatusLineChart = {
  name: 'StatusLineChart'
  props: StatusLineChartProps
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
  | DetailsPage
  | NewsFeedMenu
  | SynapseFormWrapper
  | SynapseFormSubmissionsGrid
  | ConsortiaGoals
  | HomePageCardContainer
  | Ecosystem
  | AboutPortal
  | TableWithSideFacets
  | DevelopedBySage
  | ThemesPlot
  | QueryWrapperPlotNav
  | FunderCards
  | StandaloneQueryWrapper
  | ParticipantsBarPlot
  | StatusLineChart
  | ExternalFileHandleLink
  | Goals
  | Resources
  | UpsetPlot
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
  hideLogin?: boolean
}
// LogoConfig end

export type BetaBanner = {
  name?: string
  originalSite?: string
  backgroundColor?: string
}
