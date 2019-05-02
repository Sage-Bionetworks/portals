import * as React from 'react'
import './App.css'
import { withRouter } from 'react-router'
import routes from './example-configuration/routes'
import { SynapseObject } from './types/portal-config'
import { SynapseComponents, SynapseConstants } from 'synapse-react-client'

export type RouteResolverProps = {
  location: any
}

const getSynapseObjectFromParams = (pathname: string) => {
  const split = pathname.split('/')
  const routeOrNestedRoute =  routes.find(el => split[1] === el.name)
  if (!routeOrNestedRoute) {
    console.log(`Error: url at ${pathname} has no route mapping`)
  } else {
    let route = undefined
    if (routeOrNestedRoute.isNested) {
      route = routeOrNestedRoute.routes.find(el => split[2] === el.name)
      return route
    }
    return routeOrNestedRoute
  }
}

const generateSynapseObject = (synapseObject: SynapseObject) => {
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
  console.log('pathname = ', pathname)
  const route = getSynapseObjectFromParams(pathname)
  if (route) {
    return (
      <div className="container">
        <h2> {route.name} </h2>
        {
          generateSynapseObject(route.synapseObject)
        }
      </div>
    )
  }
  return <div/>
}

export default withRouter(RouteResolver)
