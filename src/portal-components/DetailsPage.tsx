import { cloneDeep, Dictionary } from 'lodash'
import * as React from 'react'
import { SynapseComponentWithContext } from 'RouteResolver'
import {
  SynapseClient,
  SynapseConstants,
  Typography,
} from 'synapse-react-client'
import {
  insertConditionsFromSearchParams,
  parseEntityIdFromSqlStatement,
} from 'synapse-react-client/dist/utils/functions/sqlFunctions'
import {
  QueryBundleRequest,
  QueryResultBundle,
  ColumnType,
} from 'synapse-react-client/dist/utils/synapseTypes/'
import { SynapseConfig } from 'types/portal-config'
import {
  DetailsPageProps,
  ResolveSynId,
  RowSynapseConfig,
} from 'types/portal-util-types'
import injectPropsIntoConfig from './injectPropsIntoConfig'
import { ExternalFileHandleLink } from 'synapse-react-client/dist/containers/ExternalFileHandleLink'
import { BarLoader } from 'react-spinners'
import { LockedFacet } from 'synapse-react-client/dist/containers/QueryWrapper'
import DetailsPageTabs from './DetailsPageTabs'
import { SynapseContext } from 'synapse-react-client/dist/utils/SynapseContext'
import { useGetEntityHeaders } from 'synapse-react-client/dist/utils/hooks/SynapseAPI/entity/useGetEntityHeaders'
import { SYNAPSE_ENTITY_ID_REGEX } from 'synapse-react-client/dist/utils/functions/RegularExpressions'

type State = {
  queryResultBundle: QueryResultBundle | undefined
  isLoading: boolean
  hasError: boolean
}

const pluralize = require('pluralize')
const COMPONENT_ID_PREFIX = 'details-page-src-component-'
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
  static contextType = SynapseContext

  constructor(props: DetailsPageProps) {
    super(props)
    this.state = {
      queryResultBundle: undefined,
      isLoading: true,
      hasError: false,
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps: DetailsPageProps) {
    if (this.props.searchParams !== prevProps.searchParams) {
      this.getData()
    }
  }

  getData = async () => {
    const { sql, searchParams = {}, sqlOperator } = this.props
    const sqlUsed = insertConditionsFromSearchParams(
      sql,
      searchParams,
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
    try {
      const data = await SynapseClient.getQueryTableResults(
        queryBundleRequest,
        this.context.accessToken,
      )
      this.setState({
        queryResultBundle: data,
        isLoading: false,
        hasError: false,
      })
    } catch (e) {
      console.log('getQueryTableResults: Error getting data', e)
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
          <Typography variant="headline1">Coming Soon! </Typography>
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
          <div className="component-container">
            {
              <DetailsPageTabs
                tabConfigs={tabLayout}
                loading={isLoading}
                queryResultBundle={this.state.queryResultBundle}
                showMenu={showMenu}
              ></DetailsPageTabs>
            }
          </div>
        </div>
      )
    } else {
      return (
        <>
          {isLoading && <BarLoader color="#878787" loading={true} height={5} />}
          {!isLoading && synapseConfigArray && (
            <DetailsPageSynapseConfigArray
              showMenu={showMenu}
              synapseConfigArray={synapseConfigArray}
              queryResultBundle={this.state.queryResultBundle}
            />
          )}
        </>
      )
    }
  } // end render()
}

const handleMenuClick = (
  ref: React.RefObject<HTMLDivElement>,
  index: number,
) => {
  const wrapper = ref.current?.querySelector<HTMLDivElement>(
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

const SideNavMenu: React.FC<{
  clickRef: React.RefObject<HTMLDivElement>
  synapseConfigArray?: RowSynapseConfig[]
  queryResultBundle?: QueryResultBundle
}> = ({ clickRef, synapseConfigArray, queryResultBundle }) => {
  const mapColumnHeaderToRowIndex: Dictionary<number> = {}
  let row: string[] = []
  if (queryResultBundle) {
    queryResultBundle.queryResult.queryResults.headers.forEach((el, index) => {
      mapColumnHeaderToRowIndex[el.name] = index
    })
    row = queryResultBundle.queryResult.queryResults.rows[0].values
  }
  return (
    <>
      {synapseConfigArray &&
        synapseConfigArray.map((el: RowSynapseConfig, index) => {
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
                synId={el.props.synId}
              />
            )
          }
          if (!el.title) {
            return <></>
          }
          return (
            <button
              style={style}
              key={JSON.stringify(el)}
              onClick={
                isDisabled ? undefined : () => handleMenuClick(clickRef, index)
              }
              className={className}
            >
              {el.title}
            </button>
          )
        })}
    </>
  )
}

const SynapseObject: React.FC<{
  el: RowSynapseConfig
  queryResultBundle: QueryResultBundle
}> = ({ el, queryResultBundle }) => {
  const { columnName = '', resolveSynId, props, overrideSqlSourceTable } = el
  const deepCloneOfProps = cloneDeep(props)
  const row = queryResultBundle!.queryResult.queryResults.rows[0].values
  // map column name to index
  const mapColumnHeaderToRowIndex: Dictionary<{
    index: number
    columnType: ColumnType
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
    columnType === ColumnType.STRING_LIST ||
    columnType === ColumnType.INTEGER_LIST
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
  return (
    <>
      {split.map((splitString) => (
        <SplitStringToComponent
          key={splitString}
          splitString={splitString}
          resolveSynId={resolveSynId}
          columnName={columnName}
          el={el}
          deepCloneOfProps={deepCloneOfProps}
          overrideSqlSourceTable={overrideSqlSourceTable}
        />
      ))}
    </>
  )
}

const SplitStringToComponent: React.FC<{
  splitString: string
  resolveSynId?: ResolveSynId
  columnName: string
  el: RowSynapseConfig
  deepCloneOfProps: any
  overrideSqlSourceTable?: boolean
}> = ({ splitString, resolveSynId, columnName, el, deepCloneOfProps, overrideSqlSourceTable }) => {
  let value = splitString.trim()

  const valueIsSynId = React.useMemo(
    () => !!SYNAPSE_ENTITY_ID_REGEX.exec(value),
    [value],
  )

  let entityTitle = ''

  // For explorer 2.0, construct an object to contain the locked facet name and facet value
  const lockedFacet: LockedFacet = {
    facet: columnName,
  }

  const { data: entityHeaders } = useGetEntityHeaders([{ targetId: value }], {
    enabled: valueIsSynId,
  })

  if (resolveSynId) {
    // use entity name as either title or value according to resolveSynId
    const entity = entityHeaders?.results.find((el) => el.id === value.trim())
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
  if (overrideSqlSourceTable) {
    // use the search param value to override the sql param.
    injectedProps['sql'] = `SELECT  *  FROM  ${value}`
  }

  // For explorer 2.0, cannot assign key `lockedFacet` to deepCloneOfProps due to type errors,
  // assign lockedFacet value directly to injectedProps only if resolveSynId.value is true
  // PORTALS-2060: Also for explorer 2.0, hide the query count if on a details page.
  injectedProps['lockedFacet'] = lockedFacet
  injectedProps['hideQueryCount'] = true
  const synapseConfigWithInjectedProps: SynapseConfig = {
    ...el,
    props: injectedProps,
  }
  if (el.resolveSynId && entityTitle) {
    return (
      <>
        {entityTitle && (
          <>
            <Typography variant="sectionTitle" role="heading">
              {el.title}: {entityTitle}
            </Typography>
            <hr />
          </>
        )}
        <SynapseComponentWithContext
          synapseConfig={synapseConfigWithInjectedProps}
          searchParams={searchParams}
        />
      </>
    )
  }
  return (
    <SynapseComponentWithContext
      synapseConfig={synapseConfigWithInjectedProps}
      searchParams={searchParams}
    />
  )
}

function isReactFragment(variableToInspect: any): boolean {
  if (variableToInspect.type) {
    return variableToInspect.type === React.Fragment
  }
  return variableToInspect === React.Fragment
}

export const DetailsPageSynapseConfigArray: React.FC<{
  showMenu: boolean
  synapseConfigArray: RowSynapseConfig[]
  queryResultBundle?: QueryResultBundle
}> = ({ showMenu, synapseConfigArray, queryResultBundle }) => {
  const ref = React.useRef(null)
  const synapseConfigContent = (
    <>
      {synapseConfigArray.map((el: RowSynapseConfig, index) => {
        const id = COMPONENT_ID_PREFIX + index
        const { standalone, resolveSynId, showTitleSeperator = true } = el
        const key = JSON.stringify(el)
        const hasTitleFromSynId = resolveSynId && resolveSynId.title
        // don't show this title if component is rendering entity names adjacet to the title
        let title: any = ''
        if (!hasTitleFromSynId) {
          title = (
            <>
              {el.title && (
                <Typography variant="sectionTitle" role="heading">
                  {el.title}
                </Typography>
              )}
              {showTitleSeperator && el.title && <hr />}
              {el.subtitle && (
                <div className="bootstrap-4-backport">
                  <Typography variant="subsectionHeader" role="heading">
                    {el.subtitle}
                  </Typography>
                </div>
              )}
            </>
          )
        }
        const component = standalone ? (
          <SynapseComponentWithContext synapseConfig={el} />
        ) : queryResultBundle ? (
          <SynapseObject el={el} queryResultBundle={queryResultBundle} />
        ) : (
          <></>
        )

        if (isReactFragment(component)) {
          return <></>
        }

        return (
          <div id={id} key={key}>
            {title}
            {component}
          </div>
        )
      })}
    </>
  )
  if (showMenu) {
    return (
      <div className="DetailsPage" ref={ref}>
        <div className="button-container">
          <SideNavMenu
            clickRef={ref}
            synapseConfigArray={synapseConfigArray}
            queryResultBundle={queryResultBundle}
          />
        </div>
        <div className="component-container">{synapseConfigContent}</div>
      </div>
    )
  } else return <>{synapseConfigContent}</>
}
