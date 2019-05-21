import { HashRouter, Route, Switch } from 'react-router-dom'
import * as React from 'react'
import './App.css'
import { Footer } from './Footer'
import AppInitializer from './AppInitializer'
import { Navbar } from './Navbar'
const Home = React.lazy(() => import('./Home'))
const RouteResolver = React.lazy(() => import('./RouteResolver'))

const App: React.SFC<{}> = ({}) => {
  return (
    <HashRouter>
      <AppInitializer>
        <Navbar/>
        <main className="main">
          {/* all the content below */}
          <React.Suspense fallback={<div/>}>
            <Switch>
              {/* exact takes precendence over RouteResolver */}
              <Route exact={true} path="/" component={Home}/>
              {/* all other routes handled programatically */}
              <Route path="/" component={RouteResolver}/>
            </Switch>
          </React.Suspense>
        </main>
        <Footer/>
      </AppInitializer>
    </HashRouter >
  )
}

export default App
