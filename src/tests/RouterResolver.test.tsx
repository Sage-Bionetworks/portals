import * as React from 'react'
import { getRouteFromParams, SynapseComponent } from '../RouteResolver'
import routesConfig, {
  HOME_INDEX,
  ABOUT_INDEX,
  ORGANIZATION_INDEX,
  EXPLORE_INDEX,
} from '../test-configuration/routesConfig'
import { NestedRoute, SynapseConfig } from 'types/portal-config'
import { mount } from 'enzyme'
import StatefulButtonControlWrapper from '../portal-components/StatefulButtonControlWrapper'
import { MemoryRouter } from 'react-router'
import { SynapseContextProvider } from 'synapse-react-client/dist/utils/SynapseContext'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'

describe('getRouteFromParams works', () => {
  // The home page route is a special case that we have to handle
  it('gets the expected route for Home', () => {
    const [route, pathname] = getRouteFromParams('/')
    expect(route).toEqual(routesConfig[HOME_INDEX])
    expect(pathname).toEqual('/')
  })

  it('gets the expected route for About', () => {
    const [route, pathname] = getRouteFromParams('/About')
    expect(route).toEqual(routesConfig[ABOUT_INDEX])
    expect(pathname).toEqual('/About')
  })

  it('gets a Nested Route correctly', () => {
    const [route, pathname] = getRouteFromParams('/Organizations/Content')

    const orgRoutes = routesConfig[ORGANIZATION_INDEX] as NestedRoute
    expect(route).toEqual(orgRoutes.routes[0])
    expect(pathname).toEqual('/Organizations/Content')
  })

  it('gets a Double Nested Route correctly', () => {
    const [route, pathname] = getRouteFromParams(
      '/Organizations/Content/Subcontent',
    )

    const orgRoutes = routesConfig[ORGANIZATION_INDEX] as NestedRoute
    const firstRoute = orgRoutes.routes[0] as NestedRoute
    expect(route).toEqual(firstRoute.routes[0])
    expect(pathname).toEqual('/Organizations/Content/Subcontent')
  })

  it('Falls back to the last successful route if a nested route partially fails', () => {
    // In this case, /Organizations/Content is renderable
    const [route, pathname] = getRouteFromParams(
      '/Organizations/Content/Not-A-Valid-Route',
    )
    const orgRoutes = routesConfig[ORGANIZATION_INDEX] as NestedRoute
    const firstRoute = orgRoutes.routes[0] as NestedRoute
    expect(route).toEqual(firstRoute)
    expect(pathname).toEqual('/Organizations/Content')
  })

  it('Finds a render-able child route if a fallback route has no synpaseConfig', () => {
    // In this case, /Explore is NOT renderable so we need to find a child route that is
    const [route, pathname] = getRouteFromParams('/Explore/Not-A-Valid-Route')
    const exploreRoutes = routesConfig[EXPLORE_INDEX] as NestedRoute
    const firstRoute = exploreRoutes.routes[0] as NestedRoute
    expect(route).toEqual(firstRoute)
    expect(pathname).toEqual('/Explore/Data')
  })
})

describe('RouteResolver works', () => {
  it('renders SRC components correctly', () => {
    const mockedSynObject: SynapseConfig = {
      name: 'Markdown',
      props: {
        markdown: '## This is a markdown component',
      },
    }
    const synObj = mount(
      <SynapseContextProvider
        synapseContext={{
          accessToken: 'abcd',
          utcTime: false,
          isInExperimentalMode: false,
        }}
      >
        <SynapseComponent synapseConfig={mockedSynObject} />
      </SynapseContextProvider>,
    )
    expect(synObj.find(MarkdownSynapse)).toHaveLength(1)
  })

  it('renders portal specific components correctly', () => {
    const mockedSynObject: SynapseConfig = {
      name: 'StatefulButtonControlWrapper',
      props: {
        configs: [
          {
            name: 'mock2',
            synapseConfigArray: [
              {
                name: 'Markdown',
                props: {
                  markdown: '## This is a markdown component',
                },
              },
            ],
          },
        ],
      },
    }
    const synObj = mount(
      <SynapseContextProvider
        synapseContext={{
          accessToken: 'abcd',
          utcTime: false,
          isInExperimentalMode: false,
        }}
      >
        <MemoryRouter>
          <SynapseComponent synapseConfig={mockedSynObject} />
        </MemoryRouter>
      </SynapseContextProvider>,
    )
    expect(synObj.find(StatefulButtonControlWrapper)).toHaveLength(1)
  })
})
