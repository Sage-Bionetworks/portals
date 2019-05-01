import * as React from 'react'
import './App.css'
import { withRouter } from 'react-router'

export type RouteResolverProps = {
  match: any
  location: any
  history: any
}

const RouteResolver: React.SFC<RouteResolverProps> = ({ match, location, history }) => {
  // Map this to route in configuration files
  const pathname = location.pathname
  console.log('pathname = ', pathname)
  return (<div/>)
}

export default withRouter(RouteResolver)
