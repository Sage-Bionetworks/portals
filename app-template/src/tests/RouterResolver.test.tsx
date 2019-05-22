import * as React from 'react'
import { getRouteFromParams, generateSynapseObjectHelper } from '../RouteResolver'
import routesConfig,
 { HOME_INDEX, ABOUT_INDEX, ORGANIZATION_INDEX } from '../example-configuration/routesConfig'
import { NestedRoute, SynapseObjectSingle } from '../types/portal-config'
import CardContainerLogic from 'synapse-react-client/dist/containers/CardContainerLogic'
import { mount } from 'enzyme'
import HomeButtonControlWrapper from '../portal-components/HomeButtonControlWrapper'
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

  it('gets a Double Nested Route correctly', () => {
    const orgRoutes = routesConfig[ORGANIZATION_INDEX] as NestedRoute
    expect(getRouteFromParams('/Organizations/Organization-CTF/CTF')).toEqual(orgRoutes.routes[0].routes![0])
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
      name: 'HomeButtonControlWrapper',
      props: {
        configs: [
          {
            name: 'mock',
            synapseObjectSingle: {
              name: 'CardContainerLogic',
              props: {
                sql: '',
                type: ''
              }
            }
          }
        ],
        colors: ['red']
      }
    }
    const synObj = mount(<MemoryRouter>{generateSynapseObjectHelper(mockedSynObject)}</MemoryRouter>)
    expect(synObj.find(HomeButtonControlWrapper)).toHaveLength(1)
  })

})
