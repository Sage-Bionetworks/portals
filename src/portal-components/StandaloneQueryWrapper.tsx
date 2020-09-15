import * as React from 'react'
import { SynapseComponents, SynapseConstants } from 'synapse-react-client'
import { StackedBarChartProps } from 'synapse-react-client/dist/containers/StackedBarChart'
import { SynapseTableProps } from 'synapse-react-client/dist/containers/table/SynapseTable'
import { cloneDeep } from 'lodash'
import {
  insertConditionsFromSearchParams,
  SQLOperator,
  parseEntityIdFromSqlStatement,
} from 'synapse-react-client/dist/utils/functions/sqlFunctions'
import { QueryBundleRequest } from 'synapse-react-client/dist/utils/synapseTypes'

type SearchParams = {
  searchParams?: {
    facetValue: string
  }
}
export type Operator = {
  sqlOperator?: SQLOperator
}

export type QueryCount = {
  showQueryCount?: boolean
}

type OwnProps = {
  sql: string
  rgbIndex: number
  unitDescription?: string
  facetAliases?: {}
  facet?: string
}

export type StandaloneQueryWrapperProps = Partial<StackedBarChartProps> &
  Partial<SynapseTableProps> &
  SearchParams &
  Operator &
  OwnProps

const generateInitQueryRequest = (sql: string): QueryBundleRequest => {
  return cloneDeep({
    partMask:
      SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
      SynapseConstants.BUNDLE_MASK_QUERY_COUNT |
      SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS |
      SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
      SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
    entityId: parseEntityIdFromSqlStatement(sql!),
    concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
    query: {
      sql,
      limit: 25,
      offset: 0,
    },
  })
}
const StandaloneQueryWrapper: React.FunctionComponent<StandaloneQueryWrapperProps> = (
  props,
) => {
  const {
    link,
    linkText,
    title,
    searchParams,
    sqlOperator,
    enableLeftFacetFilter,
    showAccessColumn,
    sql,
    ...rest
  } = props

  let derivedQueryRequestFromSearchParams = generateInitQueryRequest(sql)

  if (searchParams) {
    derivedQueryRequestFromSearchParams.query.sql = insertConditionsFromSearchParams(
      searchParams,
      derivedQueryRequestFromSearchParams.query.sql,
      sqlOperator,
    )
  }
  return (
    <SynapseComponents.QueryWrapper
      {...rest}
      initQueryRequest={derivedQueryRequestFromSearchParams}
    >
      {link && linkText ? (
        <SynapseComponents.StackedBarChart
          link={link}
          linkText={linkText}
        />
      ) : (
        <React.Fragment />
      )}
      {title ? (
        <SynapseComponents.SynapseTable
          enableLeftFacetFilter={enableLeftFacetFilter}
          showAccessColumn={showAccessColumn}
          title={title}
        />
      ) : (
        <React.Fragment />
      )}
    </SynapseComponents.QueryWrapper>
  )
}

export default StandaloneQueryWrapper
