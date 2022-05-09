import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import './style/App.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import { Footer } from './Footer'
import AppInitializer from './AppInitializer'
import Navbar from './Navbar'
import CookiesNotification from './CookiesNotification'
import { CookiesProvider } from 'react-cookie'
import '@fortawesome/fontawesome-free/css/all.css'
import { SynapseComponents } from 'synapse-react-client'

const Home = React.lazy(() => import('./Home'))
const RouteResolver = React.lazy(() => import('./RouteResolver'))
const App: React.FC = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <AppInitializer>
          <SynapseComponents.SynapseToastContainer />
          <Navbar />
          <CookiesNotification />
          <main className="main">
            {/* all the content below */}
            <React.Suspense fallback={<div />}>
              <Switch>
                {/* exact takes precendence over RouteResolver */}
                <Route exact={true} path="/" component={Home} />
                {/* all other routes handled programatically */}
                <Route path="/" component={RouteResolver} />
              </Switch>
            </React.Suspense>
          </main>
          <Footer />
        </AppInitializer>
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
