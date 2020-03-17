import * as React from 'react'
import {
  getRouteFromParams,
  generateSynapseObjectHelper,
} from '../RouteResolver'
import routesConfig, {
  HOME_INDEX,
  ABOUT_INDEX,
  ORGANIZATION_INDEX,
} from '../test-configuration/routesConfig'
import { NestedRoute, SynapseConfig } from 'types/portal-config'
import CardContainerLogic from 'synapse-react-client/dist/containers/CardContainerLogic'
import { mount } from 'enzyme'
import StatefulButtonControlWrapper from '../portal-components/StatefulButtonControlWrapper'
import { MemoryRouter } from 'react-router'

describe('getRouteFromParams works', () => {
  // The home page route is a special case that we have to handle
  it('gets the expected route for Home', () => {
    expect(getRouteFromParams('/')).toEqual(routesConfig[HOME_INDEX])
  })

  it('gets the expected route for About', () => {
    expect(getRouteFromParams('/About')).toEqual(routesConfig[ABOUT_INDEX])
  })

  it('gets a Nested Route correctly', () => {
    const orgRoutes = routesConfig[ORGANIZATION_INDEX] as NestedRoute
    expect(getRouteFromParams('/Organizations/Content')).toEqual(
      orgRoutes.routes[0],
    )
  })

  it('gets a Double Nested Route correctly', () => {
    const orgRoutes = routesConfig[ORGANIZATION_INDEX] as NestedRoute
    const firstRoute = orgRoutes.routes[0] as NestedRoute
    expect(getRouteFromParams('/Organizations/Content/Subcontent')).toEqual(
      firstRoute.routes[0],
    )
  })
})

describe('RouteResolver works', () => {
  it('renders SRC components correctly', () => {
    const mockedSynObject: SynapseConfig = {
      name: 'CardContainerLogic',
      props: {
        sql: '',
        type: '',
        entityId: '',
      },
    }
    const synObj = mount(generateSynapseObjectHelper(mockedSynObject))
    expect(synObj.find(CardContainerLogic)).toHaveLength(1)
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
                name: 'CardContainerLogic',
                props: {
                  sql: '',
                  type: '',
                },
              },
            ],
          },
        ],
        colors: ['red'],
      },
    }
    const synObj = mount(
      <MemoryRouter>
        {generateSynapseObjectHelper(mockedSynObject)}
      </MemoryRouter>,
    )
    expect(synObj.find(StatefulButtonControlWrapper)).toHaveLength(1)
  })
})
