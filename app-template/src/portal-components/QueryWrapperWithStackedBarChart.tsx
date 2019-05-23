import * as React from 'react'
import { SynapseComponents } from 'synapse-react-client'
import loadingScreen from '../config/loadingScreen'

const QueryWrapperWithStackedBarChart: React.FunctionComponent<any> = (props: any) => {
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

export default QueryWrapperWithStackedBarChart
