import * as React from 'react'
import './App.css'
import { withRouter } from 'react-router'
import routesConfig from './config/routesConfig'
import { SynapseObjectSingle, GenericRoute } from './types/portal-config'
import { SynapseComponents } from 'synapse-react-client'
import { TokenContext } from './AppInitializer'
import HomeButtonControl from './portal-components/HomeButtonControl'
import ExploreButtonControl from './portal-components/ExploreButtonControl'

export type RouteResolverProps = {
  location: any
}

// https://basarat.gitbooks.io/typescript/docs/types/never.html
function fail(message: string): never { throw new Error(message) }

export const getRouteFromParams = (pathname: string) => {
  // special case the home page path
  const pathWithName = pathname === '/' ? '/Home' :  pathname
  const split = pathWithName.split('/')
  let route = routesConfig.find(el => split[1] === el.name)!
  for (let i = 2; i < split.length; i += 1) {
    if (!route) {
      return fail(`Error: url at ${pathWithName} has no route mapping`)
    }
    if (route.isNested) {
      route = route.routes.find(el => split[i] === el.name)!
    } else {
      fail(`Route at ${pathname} has no synapseObject mapping`)
    }
  }
  return route
}

export const generateSynapseObjectHelper = (synapseObject: SynapseObjectSingle) => {
  if (synapseObject.name === 'HomeButtonControl') {
    return <HomeButtonControl {...synapseObject.props} />
  }
  if (synapseObject.name === 'ExploreButtonControl') {
    return <ExploreButtonControl {...synapseObject.props} />
  }
  const SynapseComponent = (SynapseComponents as any)[synapseObject.name]
  if (!SynapseComponent) {
    return <div> no luck ! </div>
  }
  return <SynapseComponent {...synapseObject.props} />
}

export const generateSynapseObject = (synapseObject: SynapseObjectSingle) => {
  // return the synapse object but with token injected into its props from the context created in AppInitializer
  const { props, ...rest } = synapseObject
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

const RouteResolver: React.SFC<RouteResolverProps> = ({ location }) => {
  // Map this to route in configuration files
  const pathname = location.pathname
  const route = getRouteFromParams(pathname) as GenericRoute
  return (
    <div className="container">
      {route.synapseObject!.map(
        (el) => {
          return (
            <React.Fragment key={JSON.stringify(el.props)}>
              {/* re-think how this renders! remove specific styling */}
              {el.title &&  <h2> {el.title} </h2>}
              {generateSynapseObject(el)}
            </React.Fragment>
          )
        }
      )}
    </div>
  )
}

export default withRouter(RouteResolver)
