import * as React from 'react'
import { Route } from 'react-router'
import { HashRouter } from 'react-router-dom'

// tslint:disable-next-line:function-name
const TestRouter = (props: any) => {
  return (<HashRouter><Route> {props.children} </Route></HashRouter>)
}

export default TestRouter
