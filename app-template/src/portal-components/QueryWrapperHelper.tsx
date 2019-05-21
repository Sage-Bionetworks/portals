import * as React from 'react'
import { SynapseComponents } from 'synapse-react-client'
import { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'
import loadingScreen from '../config/loadingScreen'

const QueryWrapperHelper: React.FunctionComponent<QueryWrapperProps> = (props: QueryWrapperProps) => {
  return (
    <SynapseComponents.QueryWrapper
      {...props}
    >
      <SynapseComponents.StackedBarChart
        unitDescription={props.unitDescription!}
        loadingScreen={loadingScreen}
        synapseId={''}
      />
    </SynapseComponents.QueryWrapper>
  )
}

export default QueryWrapperHelper
