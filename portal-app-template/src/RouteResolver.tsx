import * as React from 'react'
import './App.css'
import { withRouter } from 'react-router'
import routesConfig from './example-configuration/routesConfig'
import { SynapseObject, SynapseObjectSingle, Route, ExploreRoute } from './types/portal-config'
import { SynapseComponents, SynapseConstants } from 'synapse-react-client'

export type RouteResolverProps = {
  location: any
}

export const getSynapseObjectFromParams = (pathname: string) => {
  const split = pathname.split('/')
  const routeOrNestedRoute =  routesConfig.find(el => split[1] === el.name)
  if (!routeOrNestedRoute) {
    return fail(`Error: url at ${pathname} has no route mapping`)
  }
  if (routeOrNestedRoute.isNested) {
    const router = routeOrNestedRoute.routes as (Route | ExploreRoute) []
    return router.find(el => el.name === split[2])!
  }
  return routeOrNestedRoute!
}

export const generateSynapseObject = (synapseObject: SynapseObjectSingle) => {
  switch (synapseObject.name) {
    case 'CardContainerLogic':
      return <SynapseComponents.CardContainerLogic {...synapseObject.props} />
    case 'Markdown':
      return <SynapseComponents.Markdown {...synapseObject.props} />
  }
}

const RouteResolver: React.SFC<RouteResolverProps> = ({ location }) => {
  // Map this to route in configuration files
  const pathname = location.pathname
  const route = getSynapseObjectFromParams(pathname)
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
