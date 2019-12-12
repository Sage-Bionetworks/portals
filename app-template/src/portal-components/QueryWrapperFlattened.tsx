import * as React from 'react'
import { SynapseComponents } from 'synapse-react-client'
import loadingScreen from '../config/loadingScreen'
import { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'
import { StackedBarChartProps } from 'synapse-react-client/dist/containers/StackedBarChart'
import { SynapseTableProps } from 'synapse-react-client/dist/containers/table/SynapseTable'
import {
  insertConditionsFromSearchParams,
  SQLOperator,
} from 'synapse-react-client/dist/utils/modules/sqlFunctions'

type SearchParams = {
  searchParams?: {
    facetValue: string
  }
}
type Operator = {
  sqlOperator: SQLOperator
}
export type QueryWrapperFlattenedProps = QueryWrapperProps &
  Partial<StackedBarChartProps> &
  Partial<SynapseTableProps> &
  SearchParams &
  Operator

const QueryWrapperFlattened: React.FunctionComponent<QueryWrapperFlattenedProps> = props => {
  const {
    link,
    linkText,
    title,
    synapseId,
    searchParams,
    initQueryRequest,
    sqlOperator,
    ...rest
  } = props
  if (searchParams) {
    let sqlUsed = initQueryRequest.query.sql
    if (searchParams) {
      sqlUsed = insertConditionsFromSearchParams(
        searchParams,
        initQueryRequest.query.sql,
        sqlOperator,
      )
    }
    initQueryRequest.query.sql = sqlUsed
  }
  return (
    <SynapseComponents.QueryWrapper
      {...rest}
      initQueryRequest={initQueryRequest}
    >
      {link && linkText ? (
        <SynapseComponents.StackedBarChart
          loadingScreen={loadingScreen}
          link={link}
          linkText={linkText}
        />
      ) : (
        <React.Fragment />
      )}
      {synapseId && title ? (
        <SynapseComponents.SynapseTable
          loadingScreen={loadingScreen}
          synapseId={synapseId}
          title={title}
        />
      ) : (
        <React.Fragment />
      )}
    </SynapseComponents.QueryWrapper>
  )
}

export default QueryWrapperFlattened
