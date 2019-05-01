import { HashRouter, Route, Switch } from 'react-router-dom'
import * as React from 'react'
import './App.css'
import { Footer } from './Footer'
import ScrollToTop from './ScrollToTop'
import { Navbar } from './Navbar'
import config from './example-configuration/config'
const Home = React.lazy(() => import('./Home'))
const Explore = React.lazy(() => import('./Explore'))
const RouteResolver = React.lazy(() => import('./RouteResolver'))

const App: React.SFC<{}> = ({}) => {
  const { homePageConfig } = config
  const homePageComponent = () => <Home {...homePageConfig}/>
  return (
    <HashRouter>
      <ScrollToTop>
        <Navbar/>
        <main className="main">
          {/* all the content below */}
          <React.Suspense fallback={<div/>}>
            <Switch>
              <Route exact={true} path="/" component={homePageComponent}/>
              <Route path="/Explore" component={Explore}/>
              {/* all other routes generated programatically */}
              <Route path="/" component={RouteResolver}/>
            </Switch>
          </React.Suspense>
        </main>
        <Footer/>
      </ScrollToTop>
    </HashRouter >
  )
}

export default App
