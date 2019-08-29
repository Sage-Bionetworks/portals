import * as React from 'react'
import { SynapseComponents } from 'synapse-react-client'
import loadingScreen from '../config/loadingScreen'
import { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'
import { StackedBarChartProps } from 'synapse-react-client/dist/containers/StackedBarChart'
import { SynapseTableProps } from 'synapse-react-client/dist/containers/SynapseTable'
import { insertConditionsFromSearchParams } from 'synapse-react-client/dist/utils/modules/sqlFunctions'

type SearchParams = {
  searchParams?: {
    facetValue: string
  }
}
export type QueryWrapperFlattenedProps = QueryWrapperProps & Partial<StackedBarChartProps> & Partial<SynapseTableProps> & SearchParams

const QueryWrapperFlattened: React.FunctionComponent<QueryWrapperFlattenedProps> = (props) => {
  const {
    link,
    linkText,
    title,
    synapseId,
    searchParams,
    initQueryRequest,
    facet
  } = props
  if (searchParams) {
    let sqlUsed = initQueryRequest.query.sql
    if (searchParams) {
      sqlUsed = insertConditionsFromSearchParams(searchParams, initQueryRequest.query.sql, '=')
    }
    initQueryRequest.query.sql = sqlUsed
  }
  return (
    <SynapseComponents.QueryWrapper
      {...props}
      initQueryRequest={initQueryRequest}
    >
      {
        link
        &&
        linkText
        ?
        <SynapseComponents.StackedBarChart
          loadingScreen={loadingScreen}
          link={link}
          linkText={linkText}
        />
        :
        <React.Fragment/>
      }
      {
        synapseId && title ?
        <SynapseComponents.SynapseTable
          synapseId={synapseId}
          title={title}
        />
        :
        <React.Fragment/>
      }
    </SynapseComponents.QueryWrapper>
  )
}

export default QueryWrapperFlattened
