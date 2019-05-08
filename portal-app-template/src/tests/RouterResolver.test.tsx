import * as React from 'react'
import { getRouteFromParams } from '../RouteResolver'
import { SynapseComponents } from 'synapse-react-client'
import routesConfig from '../example-configuration/routesConfig'

describe('getRouteFromParams works', () => {

  // The home page route is a special case that we have to handle
  it('gets the expected route for home', () => {
    const route = getRouteFromParams('/')
    expect(route).toBeDefined()
  })

  // it('gets the expected route for a non nested route', () => {
  //   const route = getRouteFromParams('/About')
  // })

  // it('gets the expected route for a nested route', () => {
  //   const route = getRouteFromParams('/Explore/Data')
  // })

})
