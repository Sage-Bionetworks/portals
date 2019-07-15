import * as React from 'react'
import { SynapseComponents } from 'synapse-react-client'
import loadingScreen from '../config/loadingScreen'
import { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'
import { StackedBarChartProps } from 'synapse-react-client/dist/containers/StackedBarChart'
import { SynapseTableProps } from 'synapse-react-client/dist/containers/SynapseTable'

export type QueryWrapperFlattenedProps = QueryWrapperProps & Partial<StackedBarChartProps> & Partial<SynapseTableProps>

const QueryWrapperFlattened: React.FunctionComponent<QueryWrapperFlattenedProps> = (props) => {
  const {
    link,
    linkText,
    title,
    synapseId
  } = props
  return (
    <SynapseComponents.QueryWrapper
      {...props}
    >
      <SynapseComponents.StackedBarChart
        loadingScreen={loadingScreen}
        link={link}
        linkText={linkText}
      />
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
