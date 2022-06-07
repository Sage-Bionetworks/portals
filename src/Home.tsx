import * as React from 'react'
import { Header } from './Header'
import RouteResolver from './RouteResolver'

const Home = () => {
  return (
    <div>
      <Header />
      <RouteResolver />
    </div>
  )
}

export default Home
