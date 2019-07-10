import * as React from 'react'
import { SynapseComponents } from 'synapse-react-client'
import loadingScreen from '../config/loadingScreen'
import { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'
import { StackedBarChartProps } from 'synapse-react-client/dist/containers/StackedBarChart'

const QueryWrapperWithStackedBarChart: React.FunctionComponent<QueryWrapperProps & Partial<StackedBarChartProps>> = (props) => {
  const {
    link,
    linkText
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
    </SynapseComponents.QueryWrapper>
  )
}

export default QueryWrapperWithStackedBarChart
