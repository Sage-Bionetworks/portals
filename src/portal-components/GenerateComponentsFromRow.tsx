import { Dictionary } from 'lodash'
import * as React from 'react'
import { generateSynapseObject } from 'RouteResolver'
import { SynapseClient, SynapseConstants } from 'synapse-react-client'
import { insertConditionsFromSearchParams } from 'synapse-react-client/dist/utils/functions/sqlFunctions'
import {
  EntityHeader,
  PaginatedResults,
  QueryBundleRequest,
  QueryResultBundle,
  ReferenceList,
} from 'synapse-react-client/dist/utils/synapseTypes/'
import loadingScreen from 'test-configuration/loadingScreen'
import { SynapseConfig } from 'types/portal-config'
import {
  GenerateComponentsFromRowProps,
  RowSynapseConfig,
} from 'types/portal-util-types'
import './GenerateComponentsFromRow.scss'
import injectPropsIntoConfig from './injectPropsIntoConfig'
import { cloneDeep } from 'lodash'

type State = {
  queryResultBundle: QueryResultBundle | undefined
  entityHeaders: PaginatedResults<EntityHeader> | undefined
  isLoading: boolean
}

const COMPONENT_ID_PREFIX = 'src-component-'

export default class GenerateComponentsFromRow extends React.Component<
  GenerateComponentsFromRowProps,
  State
> {
  public ref: React.RefObject<HTMLDivElement>

  constructor(props: GenerateComponentsFromRowProps) {
    super(props)
    this.state = {
      queryResultBundle: undefined,
      entityHeaders: undefined,
      isLoading: true,
    }
    this.ref = React.createRef()
  }

  componentDidMount() {
    const {
      sql,
      token,
      entityId,
      searchParams = {},
      synapseConfigArray,
      sqlOperator,
    } = this.props
    const sqlUsed = insertConditionsFromSearchParams(
      searchParams,
      sql,
      sqlOperator,
    )
    const queryBundleRequest: QueryBundleRequest = {
      entityId,
      concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
      partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
      query: {
        sql: sqlUsed,
      },
    }
    SynapseClient.getQueryTableResults(queryBundleRequest, token).then(data => {
      const rows = data.queryResult.queryResults.rows
      if (rows.length !== 1) {
        console.error(
          'Error on request, expected rows to be length 1 but got ',
          rows.length,
        )
      }
      const row = rows[0].values
      // map column name to index
      const mapColumnHeaderToRowIndex: Dictionary<number> = {}
      data.queryResult.queryResults.headers.forEach((el, index) => {
        mapColumnHeaderToRowIndex[el.name] = index
      })
      const references: ReferenceList = []
      synapseConfigArray.forEach((el: RowSynapseConfig) => {
        if (el.resolveSynId && el.columnName) {
          const index = mapColumnHeaderToRowIndex[el.columnName]
          const value: string = row[index]
          value?.split(',').forEach(val => {
            if (!references.find(el => el.targetId === val)) {
              references.push({
                targetId: val,
              })
            }
          })
        }
      })
      if (references.length === 0) {
        this.setState({
          queryResultBundle: data,
          isLoading: false,
        })
        return
      }
      SynapseClient.getEntityHeader(references, token).then(entityHeaders => {
        this.setState({
          queryResultBundle: data,
          entityHeaders,
          isLoading: false,
        })
      })
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

  render() {
    const { isLoading } = this.state
    const { showMenu = true } = this.props
    const synapseConfigContent = (
      <>
        {isLoading && loadingScreen}
        {!isLoading && this.renderSynapseConfigArray()}
      </>
    )
    if (showMenu) {
      return (
        <div className="GenerateComponentsFromRow">
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

  renderMenu = () => {
    const { synapseConfigArray } = this.props
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

  renderSynapseConfigArray = () => {
    const { synapseConfigArray } = this.props
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
    const mapColumnHeaderToRowIndex: Dictionary<number> = {}
    queryResultBundle!.queryResult.queryResults.headers.forEach((el, index) => {
      mapColumnHeaderToRowIndex[el.name] = index
    })
    const columnNameRowIndex = mapColumnHeaderToRowIndex[columnName]
    let rawValue: string = row[columnNameRowIndex]
    if (!rawValue) {
      console.error('No value mapped for ', columnName)
      return <></>
    }
    const split = rawValue.split(',')
    return split.map(splitString => {
      let value = splitString.trim()
      let entityTitle = ''
      if (resolveSynId) {
        // use entity name as either title or value according to resolveSynId
        const entity = entityHeaders?.results.find(el => el.id === value.trim())
        const name = entity?.name ?? ''
        if (!name) {
          console.error('No value mapped for ', columnName)
          return <></>
        }
        if (resolveSynId.title) {
          entityTitle = name
        }
        if (resolveSynId.value) {
          value = name
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
