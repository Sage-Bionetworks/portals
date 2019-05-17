import { HashRouter, Route, Switch } from 'react-router-dom'
import * as React from 'react'
import './App.css'
import { Footer } from './Footer'
import AppInitializer from './AppInitializer'
import { Navbar } from './Navbar'
// change to React.lazy!
import Home from './Home'
import Explore from './Explore'
import RouteResolver from './RouteResolver'
import { CookiesProvider } from 'react-cookie'

const App: React.SFC<{}> = ({}) => {
  return (
    <CookiesProvider>
      <HashRouter>
        <AppInitializer>
          <Navbar/>
          <main className="main">
            {/* all the content below */}
            <React.Suspense fallback={<div/>}>
              <Switch>
                {/* exact takes precendence over RouteResolver */}
                <Route exact={true} path="/" component={Home}/>
                <Route path="/Explore" component={Explore}/>
                {/* all other routes handled programatically */}
                <Route path="/" component={RouteResolver}/>
              </Switch>
            </React.Suspense>
          </main>
          <Footer/>
        </AppInitializer>
      </HashRouter >
    </CookiesProvider>
  )
}

export default App
