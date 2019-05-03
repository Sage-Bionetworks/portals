import * as React from 'react'
import './App.css'
import { withRouter } from 'react-router'
import routesConfig from './example-configuration/routesConfig'
import { SynapseObjectSingle, Route, ExploreRoute } from './types/portal-config'
import { SynapseComponents } from 'synapse-react-client'

export type RouteResolverProps = {
  location: any
}

// https://basarat.gitbooks.io/typescript/docs/types/never.html
function fail(message: string): never { throw new Error(message) }

export const getRouteFromParams = (pathname: string) => {
  // special case the home page path
  const pathWithName = pathname === '/' ? '/Home' : pathname
  const split = pathWithName.split('/')
  const routeOrNestedRoute =  routesConfig.find(el => split[1] === el.name)
  if (!routeOrNestedRoute) {
    return fail(`Error: url at ${pathWithName} has no route mapping`)
  }
  if (routeOrNestedRoute.isNested) {
    const router = routeOrNestedRoute.routes as (Route | ExploreRoute) []
    return router.find(el => el.name === split[2])!
  }
  return routeOrNestedRoute!
}

export const generateSynapseObject = (synapseObject: SynapseObjectSingle) => {
  const SynapseComponent = (SynapseComponents as any)[synapseObject.name]
  return (
    <SynapseComponent
      {...synapseObject.props}
    />
  )
}

const RouteResolver: React.SFC<RouteResolverProps> = ({ location }) => {
  // Map this to route in configuration files
  const pathname = location.pathname
  const route = getRouteFromParams(pathname)
  if (route.type === 'Route') {
    return (
      <div className="container">
        {route.synapseObject.map(
          (el) => {
            return (
              <React.Fragment key={el.title}>
                <h2>
                  {el.title}
                </h2>
                {generateSynapseObject(el)}
              </React.Fragment>
            )
          }
        )}
      </div>
    )
  }
  return <div/>
}

export default withRouter(RouteResolver)
