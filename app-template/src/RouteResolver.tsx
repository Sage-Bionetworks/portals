import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import routesConfig from './config/routesConfig'
import { SynapseConfig } from './types/portal-config'
import { SynapseComponents } from 'synapse-react-client'
import { TokenContext } from './AppInitializer'
import HomeButtonControlWrapper from './portal-components/HomeButtonControlWrapper'
import ExploreButtonControlWrapper from './portal-components/ExploreButtonControlWrapper'
import QueryWrapperWithStackedBarChart from './portal-components/QueryWrapperWithStackedBarChart'
import Layout from './portal-components/Layout'
import ProgrammaticRoute from './portal-components/ProgrammaticRoute'

// https://basarat.gitbooks.io/typescript/docs/types/never.html
function fail(message: string): never { throw new Error(message) }

export const getRouteFromParams = (pathname: string) => {
  // e.g. pathname = /Explore/Programs
  // special case the home page path
  const pathWithName = pathname === '/' ? '/Home' :  pathname
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
  if (synapseConfig.name === 'HomeButtonControlWrapper') {
    return <HomeButtonControlWrapper {...synapseConfig.props} />
  }
  if (synapseConfig.name === 'ExploreButtonControlWrapper') {
    return <ExploreButtonControlWrapper {...synapseConfig.props} />
  }
  if (synapseConfig.name === 'QueryWrapperWithStackedBarChart') {
    return <QueryWrapperWithStackedBarChart {...synapseConfig.props} />
  }
  const SynapseComponent = (SynapseComponents as any)[synapseConfig.name]
  if (!SynapseComponent) {
    throw Error(`No synapse object could be mapped for ${synapseConfig.name}`)
  }
  return <SynapseComponent {...synapseConfig.props} />
}

export const generateSynapseObject = (synapseConfig: SynapseConfig) => {
  // return the synapse object but with token injected into its props from the context created in AppInitializer
  const { props, ...rest } = synapseConfig
  return (
    <TokenContext.Consumer>
      {
        (value: string) => {
          const synapseObjectWithToken = { props: { ...props, token: value }, ...rest }
          return generateSynapseObjectHelper(synapseObjectWithToken)
        }
      }
    </TokenContext.Consumer>
  )
}

const RouteResolver: React.FunctionComponent<RouteComponentProps> = ({ location }) => {
  // Map this to route in configuration files
  const { pathname, search } = location
  const route = getRouteFromParams(pathname)
  const searchParamsProps: any = {}
  if (search) {
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
  return (
    <React.Fragment>
      {route.synapseConfigArray!.map(
        (el) => {
          return (
            <React.Fragment key={JSON.stringify(el.props)}>
              {
                el.isOutsideContainer ?
                  <div>
                    {el.title &&  <h2 className="title"> {el.title} </h2>}
                    {generateSynapseObject(el)}
                  </div>
                  :
                  <Layout>
                    {/* re-think how this renders! remove specific styling */}
                    {el.title &&  <h2 className="title"> {el.title} </h2>}
                    {generateSynapseObject(el)}
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
