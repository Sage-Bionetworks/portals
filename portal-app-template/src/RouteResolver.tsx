import * as React from 'react'
import './App.css'
import { withRouter } from 'react-router'
import routesConfig from './example-configuration/routesConfig'
import { SynapseObjectSingle } from './types/portal-config'
import { SynapseComponents } from 'synapse-react-client'
import StackedBarChartPreview from './custom-components/StackedBarChartPreview'
import { TokenContext } from './AppInitializer'

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
    const router = routeOrNestedRoute.routes
    return router.find(el => el.name === split[2])!
  }
  return routeOrNestedRoute!
}

const generateSynapseObjectHelper = (synapseObject: SynapseObjectSingle) => {
  if (synapseObject.name === 'StackedBarChartPreview') {
    return <StackedBarChartPreview {...synapseObject.props} />
  }
  const SynapseComponent = (SynapseComponents as any)[synapseObject.name]
  return <SynapseComponent {...synapseObject.props} />
}

export const generateSynapseObject = (synapseObject: SynapseObjectSingle) => {
  // return the synapse object but with token injected into its props from the context created in AppInitializer
  return (
    <TokenContext.Consumer>
      {
        (value: string) => {
          const synapseObjectWithToken = { ...synapseObject, props: { ...synapseObject.props, token: value } }
          return generateSynapseObjectHelper(synapseObjectWithToken)
        }
      }
    </TokenContext.Consumer>
  )
}

const RouteResolver: React.SFC<RouteResolverProps> = ({ location }) => {
  // Map this to route in configuration files
  const pathname = location.pathname
  const route = getRouteFromParams(pathname)
  return (
    <div className="container">
      {route.synapseObject.map(
        (el) => {
          return (
            <React.Fragment key={JSON.stringify(el.props)}>
            {/* re-think how this renders! remove specific styling */}
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

export default withRouter(RouteResolver)
