import React from 'react'
import { SynapseComponent } from 'RouteResolver'
import {
  SynapseContextConsumer,
  SynapseContextType,
} from 'synapse-react-client/dist/utils/SynapseContext'
import { SynapseConfig } from 'types/portal-config'

type SynapseComponentWithContextProps = {
  synapseConfig: SynapseConfig
  searchParams?: any
}

export const SynapseComponentWithContext: React.FC<
  SynapseComponentWithContextProps
> = ({ synapseConfig, searchParams }) => {
  // return the synapse object but with token/search params injected into its props from the context created in AppInitializer
  const { props, ...rest } = synapseConfig
  const key = JSON.stringify(props)
  return (
    <SynapseContextConsumer key={key}>
      {(ctx?: SynapseContextType) => {
        const propsWithSearchAndToken = {
          ...props,
          searchParams,
          token: ctx?.accessToken,
          accessToken: ctx?.accessToken,
        }
        // TODO: Understand why typescript is throwing an error below
        // @ts-ignore
        const synapseObjectWithTokenAndSearch: SynapseConfig = {
          props: propsWithSearchAndToken,
          ...rest,
        }
        return (
          <SynapseComponent synapseConfig={synapseObjectWithTokenAndSearch} />
        )
      }}
    </SynapseContextConsumer>
  )
}
