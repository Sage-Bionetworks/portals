import * as React from 'react'
import { QueryResultBundle } from 'synapse-react-client/dist/utils/jsonResponses/Table/QueryResultBundle'
import { SynapseClient, SynapseConstants } from 'synapse-react-client'
import { QueryBundleRequest } from 'synapse-react-client/dist/utils/jsonResponses/Table/QueryBundleRequest'
import { SynapseConfig } from 'types/portal-config'
import { insertConditionsFromSearchParams } from 'synapse-react-client/dist/utils/modules/sqlFunctions'
import { Dictionary } from 'lodash'
import './GenerateComponentsFromRow.scss'
import { generateSynapseObject } from 'RouteResolver'
import loadingScreen from 'test-configuration/loadingScreen'
import { ReferenceList } from 'synapse-react-client/dist/utils/jsonResponses/ReferenceList'
import { EntityHeader } from 'synapse-react-client/dist/utils/jsonResponses/EntityHeader'
import { PaginatedResults } from 'synapse-react-client/dist/utils/jsonResponses/PaginatedResults'
import injectPropsIntoConfig from './injectPropsIntoConfig'

type RowToPropTransform = {
  injectProps?: boolean // if true then no need to grab data
  resolveSynId?: boolean
  columnName: string
}

export type RowSynapseConfig = SynapseConfig & RowToPropTransform

export type GenerateComponentsFromRowProps = {
  searchParams?: Dictionary<string>
  sql: string
  token?: string
  synapseConfigArray: RowSynapseConfig []
}

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
            if (el.resolveSynId) {
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
        <div className="col-xs-2">
          {this.renderMenu()}
        </div>
        <div className="col-xs-10" ref={this.ref}>
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
    return synapseConfigArray.map(
      (el, index) => {
        return (
          <div key={el.columnName} onClick={() => this.handleMenuClick(index)} className="menu-row-item">
            {el.title}
          </div>
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
        const { injectProps = true } = el
        const key = JSON.stringify(el.props)
        console.log('el = ', el)
        console.log('injectProps = ', el)
        if (!injectProps) {
          console.log('line 178')
          return (
            <div onClick={() => this.handleMenuClick(index)} className="menu-row-item" id={id} key={key}>
              {generateSynapseObject(el)}
            </div>
          )
        }
        const columnNameRowIndex = mapColumnHeaderToRowIndex[el.columnName]
        let rawValue: string = row[columnNameRowIndex]
        if (!rawValue) {
          return <></>
        }
        const split = rawValue.split(',')
        const props = el.props
        return (
          <div id={id} key={key}>
            {
              split.map(splitString => {
                let value = splitString
                if (el.resolveSynId) {
                  const entity = entityHeaders!.results.find(el => el.id === value)!
                  value = entity.name
                }
                const injectedProps = injectPropsIntoConfig(value, el.name, props)
                return generateSynapseObject({ ...el, props: { ...props, ...injectedProps}})
              })
            }
          </div>
        )
      }
    )
  }
}
