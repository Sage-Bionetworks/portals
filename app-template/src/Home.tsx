import * as React from 'react'
import { Header } from './Header'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import RouteResolver from './RouteResolver'

class Home extends React.Component<RouteComponentProps, {}> {

  constructor(props: RouteComponentProps) {
    super(props)
  }

  render () {
    return (
      <div>
        <Header />
        <RouteResolver/>
      </div>
    )
  }
}

export default withRouter(Home)
