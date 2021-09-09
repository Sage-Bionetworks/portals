import { isEmpty } from 'lodash-es'
import * as React from 'react'
import {
  RouteComponentProps,
  useHistory,
  useLocation,
  withRouter,
} from 'react-router'
import { SynapseComponents } from 'synapse-react-client'
import {
  SynapseContextConsumer,
  SynapseContextType,
} from 'synapse-react-client/dist/utils/SynapseContext'
import { GenericRoute, SynapseConfig } from 'types/portal-config'
import { scrollToWithOffset } from 'utils'
import docTitleConfig from './config/docTitleConfig'
import routesConfig from './config/routesConfig'
import PortalComponents from './portal-components/'
import Layout from './portal-components/Layout'
import sharedRouteConfig, { homeRoute } from './shared-config/sharedRoutes'

/**
 * Given a pathname, return the matching route object and the route's pathname.
 * @param pathname
 * @returns
 */
export const getRouteFromParams = (
  pathname: string,
): [GenericRoute, string] => {
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
  let route = ([...sharedRouteConfig, ...routesConfig] as GenericRoute[]).find(
    (el) => split[0] === el.to,
  )!

  if (route == null) {
    console.warn(`Error: url at ${pathname} has no route mapping`)
    return [homeRoute, '/']
  }

  let routePathName = '/' + route.to

  // search the route configs for the pathname
  for (let i = 1; i < split.length; i += 1) {
    if (route.isNested) {
      const nextRoute = route.routes.find((el) => el.to!.includes(split[i]))
      if (nextRoute) {
        route = nextRoute
        routePathName += '/' + route.to
      } else {
        // If we can't find a matching nested route, return the last route that was found
        break
      }
    }
  }

  // If there's no SynapseConfigArray, then the route we settled on wasn't meant to be a standalone page, and we have nothing to render.
  // This isn't typical, but just so we can load something, we (recursively) get the first child until we find a route with a SynapseConfigArray
  while (isEmpty(route.synapseConfigArray) && route.isNested) {
    route = route.routes[0]
    routePathName += '/' + route.to
  }

  return [route, routePathName]
}

type SynapseComponentProps = {
  synapseConfig: SynapseConfig
}

export const SynapseComponent: React.FC<SynapseComponentProps> = ({
  synapseConfig,
}) => {
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

type SynapseComponentWithContextProps = {
  synapseConfig: SynapseConfig
  searchParams?: any
}

export const SynapseComponentWithContext: React.FC<SynapseComponentWithContextProps> =
  ({ synapseConfig, searchParams }) => {
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

/*
  Given a location join with the routesConfig to render the appropriate component.
*/
const RouteResolver: React.FunctionComponent<RouteComponentProps> = () => {
  // Map this to route in configuration files
  const { pathname, search, hash } = useLocation()
  // get the route object and the typical path of the route
  const [route, newPathname] = getRouteFromParams(pathname)
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

  const history = useHistory()
  React.useEffect(() => {
    // We push the new pathname to history with one exception:
    // If we landed on a route that redirects, then don't push the new pathname because it won't take into account the redirect
    if (
      (route.synapseConfigArray ?? []).filter(
        (el) => el.name === 'RedirectWithQuery',
      ).length === 0
    ) {
      history.push({ pathname: newPathname, search, hash })
    }
  }, [newPathname])

  // this delay is here to improve the location of the element, since it's position depends on the layout of other components on the page (that also need to load)
  setTimeout(() => {
    if (scrollToRef.current) {
      scrollToWithOffset(scrollToRef.current)
    }
  }, 500)
  return (
    <React.Fragment>
      {synapseConfigArray.map((el: SynapseConfig) => {
        const {
          containerClassName,
          outsideContainerClassName,
          isOutsideContainer,
          title,
          centerTitle,
          subtitle,
          props,
        } = el
        const scrollToJsx =
          title && hash && hash === `#${encodeURI(title)}` ? (
            <span ref={scrollToRef} />
          ) : (
            <></>
          )
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
                <SynapseComponentWithContext
                  synapseConfig={el}
                  searchParams={searchParamsProps}
                />
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
                <SynapseComponentWithContext
                  synapseConfig={el}
                  searchParams={searchParamsProps}
                />
              </Layout>
            )}
          </React.Fragment>
        )
      })}
    </React.Fragment>
  )
}

export default withRouter(RouteResolver)
