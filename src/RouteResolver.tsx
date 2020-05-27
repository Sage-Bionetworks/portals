import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import routesConfig from './config/routesConfig'
import { SynapseConfig } from 'types/portal-config'
import { SynapseComponents } from 'synapse-react-client'
import { TokenContext } from './AppInitializer'
import PortalComponents from './portal-components/'
import Layout from './portal-components/Layout'
import docTitleConfig from './config/docTitleConfig'

// https://basarat.gitbooks.io/typescript/docs/types/never.html
function fail(message: string): never {
  throw new Error(message)
}

export const getRouteFromParams = (pathname: string) => {
  // e.g. pathname = /Explore/Programs
  // special case the home page path
  const pathWithName = pathname === '/' ? '/Home' : pathname
  // e.g. split = '', 'Explore', 'Programs
  const split = pathWithName.split('/')
  let route = routesConfig.find((el) => split[1] === el.name)!
  // search the route configs for the pathname
  for (let i = 2; i < split.length; i += 1) {
    if (!route) {
      return fail(`Error: url at ${pathWithName} has no route mapping`)
    }
    if (route.isNested) {
      route = route.routes.find((el) => split[i] === el.name)!
    } else {
      fail(`Route at ${pathname} has no SynapseConfigArray mapping`)
    }
  }
  return route
}

export const generateSynapseObjectHelper = (synapseConfig: SynapseConfig) => {
  const Component =
    (PortalComponents as any)[synapseConfig.name] ??
    (SynapseComponents as any)[synapseConfig.name]
  if (!Component) {
    throw Error(`No synapse object could be mapped for ${synapseConfig.name}`)
  }
  const component = <Component {...synapseConfig.props} />
  const { style, className } = synapseConfig
  if (style || className) {
    return (
      <div className={className} style={style}>
        {component}
      </div>
    )
  } else {
    return component
  }
}

export const generateSynapseObject = (
  synapseConfig: SynapseConfig,
  searchParams?: any,
) => {
  // return the synapse object but with token/search params injected into its props from the context created in AppInitializer
  const { props, name, ...rest } = synapseConfig
  const key = JSON.stringify(props)
  return (
    <TokenContext.Consumer key={key}>
      {(value: string) => {
        const propsWithSearchAndToken = { ...props, searchParams, token: value }
        // TODO: Understand why typescript is throwing an error below
        // @ts-ignore
        const synapseObjectWithTokenAndSearch: SynapseConfig = {
          props: propsWithSearchAndToken,
          ...rest,
        }
        return generateSynapseObjectHelper(synapseObjectWithTokenAndSearch)
      }}
    </TokenContext.Consumer>
  )
}

const RouteResolver: React.FunctionComponent<RouteComponentProps> = ({
  location,
}) => {
  // Map this to route in configuration files
  const { pathname, search } = location
  const route = getRouteFromParams(pathname)
  let searchParamsProps: any = undefined
  if (search) {
    searchParamsProps = {}
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
    const searchParams = new URLSearchParams(search)
    searchParams.forEach((value, key) => {
      searchParamsProps[key] = value
    })
  }
  let synapseConfigArray: SynapseConfig[] = route.synapseConfigArray!
  const { programmaticRouteConfig } = route
  if (search && programmaticRouteConfig) {
    synapseConfigArray = programmaticRouteConfig
  }
  const pageName: string = route.displayName ? route.displayName : route.name
  const newTitle: string = `${docTitleConfig.name} - ${pageName}`
  if (document.title !== newTitle) {
    document.title = newTitle
  }

  return (
    <React.Fragment>
      {synapseConfigArray!.map((el: SynapseConfig) => {
        const { containerClassName } = el
        return (
          <React.Fragment key={JSON.stringify(el.props)}>
            {el.isOutsideContainer ? (
              <div className={containerClassName}>
                {el.title && <h2 className="title"> {el.title} </h2>}
                {generateSynapseObject(el, searchParamsProps)}
              </div>
            ) : (
              <Layout
                key={JSON.stringify(el.props)}
                containerClassName={containerClassName}
              >
                {/* re-think how this renders! remove specific styling */}
                {el.title && <h2 className="title"> {el.title} </h2>}
                {generateSynapseObject(el, searchParamsProps)}
              </Layout>
            )}
          </React.Fragment>
        )
      })}
    </React.Fragment>
  )
}

export default withRouter(RouteResolver)
