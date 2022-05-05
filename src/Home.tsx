import * as React from 'react'
import { Header } from './Header'
import { withRouter } from 'react-router-dom'
import RouteResolver from './RouteResolver'

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <RouteResolver />
    </div>
  )
}

export default withRouter(Home)
