import * as React from 'react'
import { SynapseComponents } from 'synapse-react-client'
import loadingScreen from '../config/loadingScreen'

<<<<<<< HEAD:app-template/src/portal-components/QueryWrapperWithStackedBarChart.tsx
const QueryWrapperWithStackedBarChart: React.FunctionComponent<QueryWrapperProps> = (props: QueryWrapperProps) => {
=======
const QueryWrapperHelper: React.FunctionComponent<any> = (props: any) => {
>>>>>>> 041c4c9a16093c97543c6df5534b126e9476a8d5:app-template/src/portal-components/QueryWrapperHelper.tsx
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
