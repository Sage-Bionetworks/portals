import * as React from 'react'
import { QueryResultBundle } from 'synapse-react-client/dist/utils/jsonResponses/Table/QueryResultBundle'
import { SynapseClient, SynapseConstants } from 'synapse-react-client'
import { QueryBundleRequest } from 'synapse-react-client/dist/utils/jsonResponses/Table/QueryBundleRequest'
import { SynapseConfig } from '../types/portal-config'
import { GenerateComponentsFromRowProps, RowSynapseConfig } from '../types/portal-util-types'
import { insertConditionsFromSearchParams } from 'synapse-react-client/dist/utils/modules/sqlFunctions'
import { Dictionary } from 'lodash'
import { generateSynapseObject } from 'RouteResolver'
import loadingScreen from 'test-configuration/loadingScreen'
import { ReferenceList } from 'synapse-react-client/dist/utils/jsonResponses/ReferenceList'
import { EntityHeader } from 'synapse-react-client/dist/utils/jsonResponses/EntityHeader'
import { PaginatedResults } from 'synapse-react-client/dist/utils/jsonResponses/PaginatedResults'
import injectPropsIntoConfig from './injectPropsIntoConfig'
import './GenerateComponentsFromRow.scss'

type State = {
  queryResultBundle: QueryResultBundle | undefined
  entityHeaders: PaginatedResults<EntityHeader> | undefined
  isLoading: boolean
}

const COMPONENT_ID_PREFIX =  'src-component-'

export default class GenerateComponentsFromRow extends React.Component<GenerateComponentsFromRowProps, State> {

  public ref: React.RefObject<HTMLDivElement>

  constructor(props: GenerateComponentsFromRowProps) {
    super(props)
    this.state = {
      queryResultBundle: undefined,
      entityHeaders: undefined,
      isLoading: true
    }
    this.ref = React.createRef()
  }

  componentDidMount() {
    const {
      sql,
      token,
      searchParams = {},
      synapseConfigArray
    } = this.props
    const sqlUsed = insertConditionsFromSearchParams(searchParams, sql)
    const queryBundleRequest: QueryBundleRequest = {
      concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
      partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
      query: {
        sql: sqlUsed,
      }
    }
    SynapseClient.getQueryTableResults(queryBundleRequest, token).then(
      data => {
        const rows = data.queryResult.queryResults.rows
        if (rows.length !== 1) {
          console.error('Error on request, expected rows to be length 1 but got ', rows.length)
        }
        const row =  rows[0].values
        // map column name to index
        const mapColumnHeaderToRowIndex: Dictionary<number> = {} 
        data.queryResult.queryResults.headers.forEach(
          (el, index) => { 
            mapColumnHeaderToRowIndex[el.name] = index
          }
        )
        const references: ReferenceList = []
        synapseConfigArray.forEach(
          el => {
            if (el.resolveSynId && el.columnName) {
              const index = mapColumnHeaderToRowIndex[el.columnName]
              const value = row[index]
              references.push(
                {
                  targetId: value
                }
              )
            }
          }
        )
        if (references.length === 0) {
          this.setState({
            queryResultBundle: data,
            isLoading: false
          })
          return
        }
        SynapseClient.getEntityHeader(references, token).then(
          entityHeaders => {
            this.setState({
              queryResultBundle: data,
              entityHeaders,
              isLoading: false
            })
          }
        )
      }
    )
  }

  componentDidUpdate() {
    // TODO: Implement this method
  }


  render () {
    const {
      isLoading
    } = this.state
    return (
      <div className="GenerateComponentsFromRow">
        <div style={{marginTop: 40}} className="button-container">
          {this.renderMenu()}
        </div>
        <div className="component-container" ref={this.ref}>
          {isLoading && loadingScreen}
          {!isLoading && this.renderSynapseConfigArray()}
        </div>
      </div>
    )
  }

  handleMenuClick = (index: number) => {
    const wrapper = this.ref.current!.querySelector<HTMLDivElement>(`#src-component-${index}`)
    wrapper!.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }

  renderMenu = () => {
    const { synapseConfigArray } = this.props
    const { queryResultBundle } = this.state
    const mapColumnHeaderToRowIndex: Dictionary<number> = {}
    let row: string [] = []
    if (queryResultBundle) {
      queryResultBundle.queryResult.queryResults.headers.forEach(
        (el, index) => {
          mapColumnHeaderToRowIndex[el.name] = index
        }
      )
      row = queryResultBundle.queryResult.queryResults.rows[0].values
    }
    return synapseConfigArray.map(
      (el: RowSynapseConfig, index) => {
        const style: React.CSSProperties = {}
        const { columnName = '' } = el
        const isDisabled = queryResultBundle && row[mapColumnHeaderToRowIndex[columnName]] === null && el.injectProps !== false
        if (isDisabled) {
          style.backgroundColor = '#BBBBBC'
          style.cursor = 'not-allowed'
        }
        const className = `menu-row-button ${isDisabled ?  "" : "SRC-primary-background-color-hover"}`
        return (
          <button style={style} key={el.columnName} onClick={isDisabled ? undefined : () => this.handleMenuClick(index)} className={className}>
            {el.title}
          </button>
        )
      }
    )
  }

  renderSynapseConfigArray = () => {
    const { synapseConfigArray } = this.props
    const { queryResultBundle, entityHeaders } = this.state
    const row = queryResultBundle!.queryResult.queryResults.rows[0].values
    // map column name to index
    const mapColumnHeaderToRowIndex: Dictionary<number> = {}
    queryResultBundle!.queryResult.queryResults.headers.forEach(
      (el, index) => {
        mapColumnHeaderToRowIndex[el.name] = index
      }
    )
    return synapseConfigArray.map(
      (el, index) => {
        const id = COMPONENT_ID_PREFIX + index
        const { injectProps = true, columnName = '' } = el
        const key = JSON.stringify(el.props)
        const isFirstClass = index === 0 ? 'first-title': ''
        const title = (
          <>
            <h2 className={isFirstClass}> {el.title}</h2>
            <hr/>
          </>
        )
        if (!injectProps) {
          return (
            <div className="menu-row-item" id={id} key={key}>
              {title}
              {generateSynapseObject(el)}
            </div>
          )
        }
        const columnNameRowIndex = mapColumnHeaderToRowIndex[columnName]
        let rawValue: string = row[columnNameRowIndex]
        if (!rawValue) {
          return <></>
        }
        const split = rawValue.split(',')
        const props = el.props
        return (
          <div id={id} key={key}>
            {title}
            {
              split.map(splitString => {
                let value = splitString
                if (el.resolveSynId) {
                  const entity = entityHeaders!.results.find(el => el.id === value)!
                  value = entity.name
                }
                let searchParams: Dictionary<string> | undefined = undefined
                if (el.tableSqlKeys) {
                  searchParams = {}
                  el.tableSqlKeys.forEach(
                    (key: string) => {
                      searchParams![key] = value
                    }
                  )
                }
                const injectedProps = injectPropsIntoConfig(value, el.name, {...props, ...searchParams})
                const synapseConfigWithInjectedProps: SynapseConfig = { ...el, props: injectedProps }
                return generateSynapseObject(synapseConfigWithInjectedProps, searchParams )
              })
            }
          </div>
        )
      }
    )
  }
}
