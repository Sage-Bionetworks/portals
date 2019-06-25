import * as React from 'react'
import { SynapseComponents } from 'synapse-react-client'
import loadingScreen from '../config/loadingScreen'
import { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'

const QueryWrapperWithStackedBarChart: React.FunctionComponent<QueryWrapperProps> = (props) => {
  return (
    <SynapseComponents.QueryWrapper
      {...props}
    >
      <SynapseComponents.StackedBarChart
        loadingScreen={loadingScreen}
      />
    </SynapseComponents.QueryWrapper>
  )
}

export default QueryWrapperWithStackedBarChart
