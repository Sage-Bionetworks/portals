import { cloneDeep, Dictionary } from 'lodash'
import * as React from 'react'
import { generateSynapseObject } from 'RouteResolver'
import { SynapseClient, SynapseConstants } from 'synapse-react-client'
import {
  insertConditionsFromSearchParams,
  parseEntityIdFromSqlStatement,
} from 'synapse-react-client/dist/utils/functions/sqlFunctions'
import {
  EntityHeader,
  PaginatedResults,
  QueryBundleRequest,
  QueryResultBundle,
  ReferenceList,
  EntityColumnType,
} from 'synapse-react-client/dist/utils/synapseTypes/'
import { SynapseConfig } from 'types/portal-config'
import { DetailsPageProps, RowSynapseConfig } from 'types/portal-util-types'
import './DetailsPage.css'
import injectPropsIntoConfig from './injectPropsIntoConfig'
import { ExternalFileHandleLink } from 'synapse-react-client/dist/containers/ExternalFileHandleLink'
import { BarLoader } from 'react-spinners'
import {LockedFacet} from "synapse-react-client/dist/containers/QueryWrapper"
import DetailsPageTabs from "./DetailsPageTabs";

type State = {
  queryResultBundle: QueryResultBundle | undefined
  entityHeaders: PaginatedResults<EntityHeader> | undefined
  isLoading: boolean
  hasError: boolean
  tabIndex: number
}

const pluralize = require('pluralize')
const COMPONENT_ID_PREFIX = 'src-component-'
/**
 * The details pages give a deeper dive into a particular portal section.
 *
 * It operates by pulling in a row of data and then using that row to piece together
 * information for the page.
 *
 * There are three ways the details page pulls in data.
 *
 * 1. Using a column's value and joining it with another table
 * 2. Resolving a column's value and joining it with another table
 * 3. Static data, data which is fixed across detail pages, the props for the component are
 * hardcoded in the config
 *
 *
 * @export
 * @class DetailsPage
 * @extends {React.Component<DetailsPageProps, State>}
 */
export default class DetailsPage extends React.Component<
  DetailsPageProps,
  State
> {
  public ref: React.RefObject<HTMLDivElement>

  constructor(props: DetailsPageProps) {
    super(props)
    this.state = {
      queryResultBundle: undefined,
      entityHeaders: undefined,
      isLoading: true,
      hasError: false,
      tabIndex: 0
    }
    this.ref = React.createRef()
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps: DetailsPageProps) {
    if (this.props.token !== prevProps.token) {
      this.getData()
    } else if (this.props.searchParams !== prevProps.searchParams) {
      this.getData()
    }
  }

  getData = () => {
    const {
      sql,
      token,
      searchParams = {},
      synapseConfigArray,
      sqlOperator,
    } = this.props
    const sqlUsed = insertConditionsFromSearchParams(
      searchParams,
      sql,
      sqlOperator,
    )
    const entityId = parseEntityIdFromSqlStatement(sql)
    const queryBundleRequest: QueryBundleRequest = {
      entityId,
      concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
      partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
      query: {
        sql: sqlUsed,
      },
    }
    SynapseClient.getQueryTableResults(queryBundleRequest, token).then(
      (data) => {
        const rows = data.queryResult.queryResults.rows
        if (rows.length !== 1) {
          console.error(
            'Error on request, expected rows to be length 1 but got ',
            rows.length,
          )
          this.setState({
            hasError: true,
          })
          return
        }
        const row = rows[0].values
        // map column name to index
        const mapColumnHeaderToRowIndex: Dictionary<{
          index: number
          columnType: EntityColumnType
        }> = {}
        data.queryResult.queryResults.headers.forEach((el, index) => {
          mapColumnHeaderToRowIndex[el.name] = {
            index,
            columnType: el.columnType,
          }
        })
        const references: ReferenceList = []
        synapseConfigArray.forEach((el: RowSynapseConfig) => {
          if (el.resolveSynId && el.columnName) {
            const { index, columnType } =
              mapColumnHeaderToRowIndex[el.columnName] ?? {}
            let value: string = row[index]
            if (
              columnType === EntityColumnType.STRING_LIST ||
              columnType === EntityColumnType.INTEGER_LIST
            ) {
              try {
                value = JSON.parse(value)
              } catch (e) {
                console.error('value could not be parsed as string_list', e)
                return
              }
            }
            if (typeof value === 'object') {
              (value as string[])?.forEach((val) => {
                if (!references.find((el) => el.targetId === val)) {
                  references.push({
                    targetId: val,
                  })
                }
              })
            } else {
              value?.split(',').forEach((val) => {
                if (!references.find((el) => el.targetId === val)) {
                  references.push({
                    targetId: val,
                  })
                }
              })
            }
          }
        })
        if (references.length === 0) {
          this.setState({
            queryResultBundle: data,
            isLoading: false,
            hasError: false,
          })
          return
        }
        SynapseClient.getEntityHeader(references, token).then(
          (entityHeaders) => {
            this.setState({
              queryResultBundle: data,
              entityHeaders,
              isLoading: false,
              hasError: false,
            })
          },
        )
      },
    ).catch((e) => {
      console.log("getQueryTableResults: Error getting data", e)
    })
  }

  handleMenuClick = (index: number) => {
    const wrapper = this.ref.current?.querySelector<HTMLDivElement>(
      `#${COMPONENT_ID_PREFIX}${index}`,
    )
    if (wrapper) {
      // https://stackoverflow.com/a/49924496
      const offset = 85
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = wrapper.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    } else {
      console.error('Could not scroll to element with index ', index)
    }
  }

  goToExplorePage = () => {
    /*
      Below assumes that going from the details page url up one level will work,
      for the current set of portals this assumption will hold true.
    */
    const lastLocation = window.location.href.split('/')
    const lastPlace = lastLocation.slice(0, lastLocation.length - 1).join('/')
    window.location.assign(lastPlace)
  }

  render() {
    const { isLoading, hasError } = this.state
    const { showMenu = true, tabLayout, synapseConfigArray } = this.props
    if (hasError) {
      const currentLocation = window.location.href.split('/')
      const name = currentLocation[currentLocation.length - 2]
      return (
        <div className="DetailsPage__ComingSoon">
          <h2> Coming Soon! </h2>
          <p>
            {/*
                pluralize is used to convert the detail of interest e.g. studies/publications/etc
                to a singular form like study/publication/etc
            */}
            This {pluralize.singular(name).toLowerCase()} is not yet available,
            please check back soon.
          </p>
          <button
            onClick={this.goToExplorePage}
            className="SRC-standard-button-shape SRC-primary-background-color SRC-whiteText"
          >
            CONTINUE EXPLORING
          </button>
        </div>
      )
    }

    if (tabLayout?.length) {
      return (
        <div className="DetailsPage tab-layout">
          <div className="component-container" ref={this.ref}>
            {<DetailsPageTabs
              tabConfigs={tabLayout}
              loading={isLoading}
              tabContents={!isLoading && this.buildTabContent()}>
            </DetailsPageTabs>}
          </div>
        </div>
      )
    } else {
      const synapseConfigContent = (
        <>
          {isLoading && <BarLoader color="#878787" loading={true} height={5}/>}
          {!isLoading && this.renderSynapseConfigArray(synapseConfigArray)}
        </>
      )
      if (showMenu) {
        return (
          <div className="DetailsPage">
            <div className="button-container">{this.renderMenu()}</div>
            <div className="component-container" ref={this.ref}>
              {synapseConfigContent}
            </div>
          </div>
        )
      } else {
        return synapseConfigContent
      }
    }

  }  // end render()

  renderMenu = () => {
    const { synapseConfigArray, token } = this.props
    const { queryResultBundle } = this.state
    const mapColumnHeaderToRowIndex: Dictionary<number> = {}
    let row: string[] = []
    if (queryResultBundle) {
      queryResultBundle.queryResult.queryResults.headers.forEach(
        (el, index) => {
          mapColumnHeaderToRowIndex[el.name] = index
        },
      )
      row = queryResultBundle.queryResult.queryResults.rows[0].values
    }
    return synapseConfigArray.map((el: RowSynapseConfig, index) => {
      const style: React.CSSProperties = {}
      const { columnName = '' } = el
      const isDisabled =
        queryResultBundle &&
        !row[mapColumnHeaderToRowIndex[columnName]] &&
        !el.standalone
      if (isDisabled) {
        style.color = '#BBBBBC'
        style.cursor = 'not-allowed'
      }
      const className = `menu-row-button ${
        isDisabled ? '' : 'SRC-primary-background-color-hover'
      }`
      if (el.name === 'ExternalFileHandleLink') {
        return (
          <ExternalFileHandleLink
            className={className}
            token={token}
            synId={el.props.synId}
          />
        )
      }
      return (
        <button
          style={style}
          key={JSON.stringify(el)}
          onClick={isDisabled ? undefined : () => this.handleMenuClick(index)}
          className={className}
        >
          {el.title}
        </button>
      )
    })
  }

  /**
   * Build a list of tab contents based on the synapseConfig's tabIndex setting.
   * 1st tab content has index 0
   * @return {JSX.Element[]} An array of tab contents
   */
  buildTabContent() {
    const { synapseConfigArray } = this.props
    // Get sorted unique tab index from synapseConfigArray
    const tabIndexes = Array.from(new Set(synapseConfigArray.map(el => el.tabIndex))).sort()
    // For each tab, build its content
    return tabIndexes.map(i => {
      const tabContentConfig:RowSynapseConfig[] = synapseConfigArray.filter(
        (el: RowSynapseConfig, index) => el.tabIndex === i
      )
      const tabContent = this.renderSynapseConfigArray(tabContentConfig)
      return (<div key={`detailPage-tabItem-${i}`}>{tabContent}</div>)
    })
  }

  renderSynapseConfigArray = (synapseConfigArray:RowSynapseConfig[]) => {
    return synapseConfigArray.map((el: RowSynapseConfig, index) => {
      const id = COMPONENT_ID_PREFIX + index
      const { standalone, resolveSynId, showTitleSeperator = true } = el
      const key = JSON.stringify(el)
      const headerClassName =
        index === 0 && showTitleSeperator ? 'first-title' : 'title'
      const hasTitleFromSynId = resolveSynId && resolveSynId.title
      // don't show this title if component is rendering entity names adjacet to the title
      let title: any = ''
      if (!hasTitleFromSynId) {
        title = (
          <>
            <h2 className={headerClassName}> {el.title}</h2>
            {showTitleSeperator && <hr />}
          </>
        )
      }
      const component = standalone
        ? generateSynapseObject(el)
        : this.renderSynapseObjectFromData(el)
      return (
        <div id={id} key={key}>
          {title}
          {component}
        </div>
      )
    })
  }

  private renderSynapseObjectFromData(el: RowSynapseConfig): React.ReactNode {
    const { queryResultBundle, entityHeaders } = this.state
    const { columnName = '', resolveSynId, props } = el
    const deepCloneOfProps = cloneDeep(props)
    const row = queryResultBundle!.queryResult.queryResults.rows[0].values
    // map column name to index
    const mapColumnHeaderToRowIndex: Dictionary<{
      index: number
      columnType: EntityColumnType
    }> = {}
    queryResultBundle!.queryResult.queryResults.headers.forEach((el, index) => {
      mapColumnHeaderToRowIndex[el.name] = { index, columnType: el.columnType }
    })
    const { index, columnType } = mapColumnHeaderToRowIndex[columnName] ?? {}
    let rawValue: string = row[index]
    if (!rawValue) {
      console.error('No value mapped for ', columnName)
      return <></>
    } else if (
      columnType === EntityColumnType.STRING_LIST ||
      columnType === EntityColumnType.INTEGER_LIST
    ) {
      try {
        rawValue = JSON.parse(rawValue)
      } catch (e) {
        console.error('Error on parsing value ', e)
        return <></>
      }
    }

    let split: string[] = ['']
    if (el.injectMarkdown) {
      split = [rawValue]
    } else if (typeof rawValue === 'object') {
      split = rawValue
    } else {
      split = rawValue.split(',')
    }
    /*
      There's a known ineffeciency here, we have components like CardContainer where it makes sense
      to construct a sql statement with a chain of OR statements rather than having N different queries.

      But this doesn't work for a component like MarkdownSynapse where there is a desire to have
      N different markdown components.

      For simplicity's sake this will be left as is, but this could be revisited if performance is an issue.
    */
    return split.map((splitString) => {
      let value = splitString.trim()
      let entityTitle = ''

      // For explorer 2.0, construct an object to contain the locked facet name and facet value
      const lockedFacet: LockedFacet = {
        facet: columnName
      }

      if (resolveSynId) {
        // use entity name as either title or value according to resolveSynId
        const entity = entityHeaders?.results.find(
          (el) => el.id === value.trim(),
        )
        const name = entity?.name ?? ''
        if (!name) {
          console.error('No value mapped for ', columnName)
          return <></>
        }
        if (resolveSynId.title) {
          entityTitle = name
        }

        // use entity name according to resolveSynId
        if (resolveSynId.value) {
          value = name
          lockedFacet.value = name
        }
      }

      let searchParams: Dictionary<string> | undefined = undefined
      if (el.tableSqlKeys) {
        // create component's query according to keys and value
        searchParams = {}
        el.tableSqlKeys.forEach((key: string) => {
          searchParams![key] = value
        })
      }
      const injectedProps = injectPropsIntoConfig(value, el, {
        ...deepCloneOfProps,
      })

      // For explorer 2.0, cannot assign key `lockedFacet` to deepCloneOfProps due to type errors,
      // assign lockedFacet value directly to injectedProps only if resolveSynId.value is true
      injectedProps['lockedFacet'] = lockedFacet

      const synapseConfigWithInjectedProps: SynapseConfig = {
        ...el,
        props: injectedProps,
      }
      if (el.resolveSynId && entityTitle) {
        return (
          <React.Fragment key={splitString}>
            {entityTitle && (
              <>
                <h2>
                  {el.title}: {entityTitle}
                </h2>
                <hr />
              </>
            )}
            {generateSynapseObject(
              synapseConfigWithInjectedProps,
              searchParams,
            )}
          </React.Fragment>
        )
      }
      return generateSynapseObject(synapseConfigWithInjectedProps, searchParams)
    })
  }
}
