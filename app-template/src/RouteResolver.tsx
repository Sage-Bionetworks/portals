import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import routesConfig from './config/routesConfig'
import { SynapseConfig } from './types/portal-config'
import { SynapseComponents } from 'synapse-react-client'
import { TokenContext } from './AppInitializer'
import StatefulButtonControlWrapper from './portal-components/StatefulButtonControlWrapper'
import RouteButtonControlWrapper from './portal-components/RouteButtonControlWrapper'
import QueryWrapperFlattened from './portal-components/QueryWrapperFlattened'
import Layout from './portal-components/Layout'
import GenerateComponentsFromRow from 'portal-components/GenerateComponentsFromRow'

// https://basarat.gitbooks.io/typescript/docs/types/never.html
function fail(message: string): never { throw new Error(message) }

export const getRouteFromParams = (pathname: string) => {
  // e.g. pathname = /Explore/Programs
  // special case the home page path
  const pathWithName = pathname === '/' ? '/Home' :  pathname
  // e.g. split = '', 'Explore', 'Programs
  const split = pathWithName.split('/')
  let route = routesConfig.find(el => split[1] === el.name)!
  // search the route configs for the pathname
  for (let i = 2; i < split.length; i += 1) {
    if (!route) {
      return fail(`Error: url at ${pathWithName} has no route mapping`)
    }
    if (route.isNested) {
      route = route.routes.find(el => split[i] === el.name)!
    } else {
      fail(`Route at ${pathname} has no SynapseConfigArray mapping`)
    }
  }
  return route
}

export const generateSynapseObjectHelper = (synapseConfig: SynapseConfig) => {
  if (synapseConfig.name === 'StatefulButtonControlWrapper') {
    return <StatefulButtonControlWrapper {...synapseConfig.props} />
  }
  if (synapseConfig.name === 'RouteButtonControlWrapper') {
    return <RouteButtonControlWrapper {...synapseConfig.props} />
  }
  if (synapseConfig.name === 'QueryWrapperFlattened') {
    return <QueryWrapperFlattened {...synapseConfig.props} />
  }
  if (synapseConfig.name === 'GenerateComponentsFromRow') {
    return <GenerateComponentsFromRow {...synapseConfig.props} />
  }
  const SynapseComponent = (SynapseComponents as any)[synapseConfig.name]
  if (!SynapseComponent) {
    throw Error(`No synapse object could be mapped for ${synapseConfig.name}`)
  }
  const component = <SynapseComponent {...synapseConfig.props} />
  console.log('synapseConfig = ', synapseConfig)
  return synapseConfig.style ? <div style={synapseConfig.style}> {component} </div>: <> {component} </>
}

export const generateSynapseObject = (synapseConfig: SynapseConfig, searchParams?: any) => {
  // return the synapse object but with token/search params injected into its props from the context created in AppInitializer
  const { props, ...rest } = synapseConfig
  return (
    <TokenContext.Consumer>
      {
        (value: string) => {
          const propsWithSearchAndToken = { ...props, searchParams, token: value }
          const synapseObjectWithTokenAndSearch = { props: propsWithSearchAndToken, ...rest }
          return generateSynapseObjectHelper(synapseObjectWithTokenAndSearch)
        }
      }
    </TokenContext.Consumer>
  )
}

const RouteResolver: React.FunctionComponent<RouteComponentProps> = ({ location }) => {
  // Map this to route in configuration files
  const { pathname, search } = location
  const route = getRouteFromParams(pathname)
  let searchParamsProps: any = undefined
  if (search) {
    searchParamsProps = {}
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
    const searchParams = new URLSearchParams(search)
    const iter = searchParams.entries()
    let result = iter.next()
    while (!result.done) {
      const [key, value] = result.value
      searchParamsProps[key] = value
      result = iter.next()
    }
  }
  let synapseConfigArray: SynapseConfig [] = route.synapseConfigArray!
  const { programmaticRouteConfig } = route
  if (search && programmaticRouteConfig) {
    synapseConfigArray = programmaticRouteConfig
  }
  return (
    <React.Fragment>
      {synapseConfigArray!.map(
        (el) => {
          return (
            <React.Fragment key={JSON.stringify(el.props)}>
              {
                el.isOutsideContainer ?
                  <div>
                    {el.title &&  <h2 className="title"> {el.title} </h2>}
                    {generateSynapseObject(el, searchParamsProps)}
                  </div>
                  :
                  <Layout>
                    {/* re-think how this renders! remove specific styling */}
                    {el.title &&  <h2 className="title"> {el.title} </h2>}
                    {generateSynapseObject(el, searchParamsProps)}
                  </Layout>
              }
            </React.Fragment>
          )
        }
      )}
    </React.Fragment>
  )
}

export default withRouter(RouteResolver)
