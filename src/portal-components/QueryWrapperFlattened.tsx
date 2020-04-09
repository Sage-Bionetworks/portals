import * as React from 'react'
import { SynapseComponents } from 'synapse-react-client'
import loadingScreen from '../config/loadingScreen'
import { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'
import { StackedBarChartProps } from 'synapse-react-client/dist/containers/StackedBarChart'
import { SynapseTableProps } from 'synapse-react-client/dist/containers/table/SynapseTable'
import { cloneDeep } from 'lodash'
import {
  insertConditionsFromSearchParams,
  SQLOperator,
} from 'synapse-react-client/dist/utils/functions/sqlFunctions'

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

export type QueryWrapperFlattenedProps = QueryWrapperProps &
  Partial<StackedBarChartProps> &
  Partial<SynapseTableProps> &
  SearchParams &
  Operator

const QueryWrapperFlattened: React.FunctionComponent<QueryWrapperFlattenedProps> = (
  props,
) => {
  const {
    link,
    linkText,
    title,
    searchParams,
    initQueryRequest,
    sqlOperator,
    enableLeftFacetFilter,
    enableDownloadConfirmation,
    visibleColumnCount,
    showAccessColumn,
    ...rest
  } = props
  let derivedQueryRequestFromSearchParams = cloneDeep(initQueryRequest)
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
          loadingScreen={loadingScreen}
          link={link}
          linkText={linkText}
        />
      ) : (
        <React.Fragment />
      )}
      {title ? (
        <SynapseComponents.SynapseTable
          visibleColumnCount={visibleColumnCount}
          loadingScreen={loadingScreen}
          enableLeftFacetFilter={enableLeftFacetFilter}
          showAccessColumn={showAccessColumn}
          enableDownloadConfirmation={enableDownloadConfirmation}
          title={title}
        />
      ) : (
        <React.Fragment />
      )}
    </SynapseComponents.QueryWrapper>
  )
}

export default QueryWrapperFlattened
