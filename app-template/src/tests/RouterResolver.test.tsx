import * as React from 'react'
import { getRouteFromParams, generateSynapseObjectHelper } from '../RouteResolver'
import routesConfig,
 { HOME_INDEX, ABOUT_INDEX, ORGANIZATION_INDEX } from '../example-configuration/routesConfig'
import { NestedRoute, SynapseObjectSingle } from '../types/portal-config'
import CardContainerLogic from 'synapse-react-client/dist/containers/CardContainerLogic'
import { mount } from 'enzyme'
import StackedBarChartControl from '../custom-components/StackedBarChartControl'
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
    expect(getRouteFromParams('/Organizations/Organization-CTF')).toEqual(orgRoutes.routes[0])
  })

})

describe('RouteResolver works', () => {

  it('renders SRC components correctly', () => {
    const mockedSynObject: SynapseObjectSingle = {
      name: 'CardContainerLogic',
      props: {
        sql: '',
        type: ''
      }
    }
    const synObj = mount(generateSynapseObjectHelper(mockedSynObject))
    expect(synObj.find(CardContainerLogic)).toHaveLength(1)
  })

  it('renders portal specific components correctly', () => {
    const mockedSynObject: SynapseObjectSingle = {
      name: 'StackedBarChartControl',
      props: {
        queryWrapperConfigs: [
          {
            facetName: '',
            name: '',
            initQueryRequest: { query: { sql: '' },  concreteType: '', partMask: 123 },
          }
        ]
      }
    }
    // have to mock the routing because stackedbarchart preview uses a Link object
    const synObj = mount(<MemoryRouter>{generateSynapseObjectHelper(mockedSynObject)}</MemoryRouter>)
    expect(synObj.find(StackedBarChartControl)).toHaveLength(1)
  })

})
