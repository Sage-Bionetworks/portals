import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import routesConfig from './config/routesConfig'
import { SynapseConfig } from 'types/portal-config'
import { SynapseComponents } from 'synapse-react-client'
import { TokenContext } from './AppInitializer'
import PortalComponents from './portal-components/'
import Layout from './portal-components/Layout'
import docTitleConfig from './config/docTitleConfig'
import { scrollToWithOffset } from 'utils'

// https://basarat.gitbooks.io/typescript/docs/types/never.html
function fail(message: string): never {
  throw new Error(message)
}

/*
  Given a pathname find the appropriate route
*/
export const getRouteFromParams = (pathname: string) => {
  // e.g. pathname = /Explore/Programs
  const split: string[] = pathname.split('/').slice(1)
  // e.g. split = 'Explore', 'Programs
  // if the last element is index.html (case insensitive, 'l' optional)
  if (split[split.length - 1].match(/index\.html?/gim)) {
    // remove index.html
    split.pop()
    if (split.length === 0) {
      // need to have at least 1 items
      split.push('')
    }
  }
  let route = routesConfig.find((el) => split[0] === el.to)!
  // search the route configs for the pathname
  for (let i = 1; i < split.length; i += 1) {
    if (!route) {
      return fail(`Error: url at ${pathname} has no route mapping`)
    }
    if (route.isNested) {
      route = route.routes.find((el) => el.to!.includes(split[i]))!
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
  const { props, ...rest } = synapseConfig
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

/*
  Given a location join with the routesConfig to render the appropriate component.
*/
const RouteResolver: React.FunctionComponent<RouteComponentProps> = ({
  location,
}) => {
  // Map this to route in configuration files
  const { pathname, search, hash } = location
  // get the route object
  const route = getRouteFromParams(pathname)
  // If url has search params transform into key-value dictionary that can be passed into
  // the component which is rendered
  let searchParamsProps: any = undefined
  if (search) {
    searchParamsProps = {}
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
    const searchParams = new URLSearchParams(search)
    searchParams.forEach((value, key) => {
      searchParamsProps[key] = value
    })
  }
  const synapseConfigArray: SynapseConfig[] = route.synapseConfigArray!
  const pageName = route.displayName ?? route.to

  // get page title and set document title to it
  const newTitle: string = `${docTitleConfig.name} - ${pageName}`
  if (document.title !== newTitle) {
    document.title = newTitle
  }
  const scrollToRef = React.useRef<HTMLElement>(null)
  // this delay is here to improve the location of the element, since it's position depends on the layout of other components on the page (that also need to load)
  setTimeout(() => {
    if (scrollToRef.current) {
      scrollToWithOffset(scrollToRef.current)
    }
  }, 500);
  return (
    <React.Fragment>
      {synapseConfigArray!.map((el: SynapseConfig) => {
        const {
          containerClassName,
          outsideContainerClassName,
          isOutsideContainer,
          title,
          centerTitle,
          subtitle,
          props,
        } = el
        const scrollToJsx = title && hash && hash === `#${encodeURI(title)}` ? <span ref={scrollToRef} /> : <></>
        return (
          <React.Fragment key={JSON.stringify(el.props)}>
            {isOutsideContainer ? (
              <div className={containerClassName}>
                {title && (
                  <h2 className={`title ${centerTitle ? 'center-title' : ''}`}>
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className={`${centerTitle ? 'center-title' : ''}`}>
                    {subtitle}
                  </p>
                )}
                {generateSynapseObject(el, searchParamsProps)}
              </div>
            ) : (
              <Layout
                key={JSON.stringify(props)}
                containerClassName={containerClassName}
                outsideContainerClassName={outsideContainerClassName}
              >
                {scrollToJsx}
                {/* re-think how this renders! remove specific styling */}
                {title && (
                  <h2 className={`title ${centerTitle ? 'center-title' : ''}`}>
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className={`${centerTitle ? 'center-title' : ''}`}>
                    {subtitle}
                  </p>
                )}
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
