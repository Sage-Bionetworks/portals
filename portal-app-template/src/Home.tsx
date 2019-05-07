import * as React from 'react'
import { Header } from './Header'
import { ExploreButtons } from './ExploreButtons'
import { SynapseComponents } from 'synapse-react-client'
import { Link, withRouter } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
import routesConfig from './example-configuration/routesConfig'
import { NestedRoute, Route } from './types/portal-config'
import { getRouteFromParams, generateSynapseObject } from './RouteResolver'

type HomeState = {
  activeSynRoute: Route []
  activeSynObjectIndex: number
}

type HomeProps = {
  location: any
  history: any
  match: any
}

class Home extends React.Component<HomeProps, HomeState> {

  constructor(props: any) {
    super(props)
  }

  /*
    This sets the synapse config from the corresponding click event
    of the explore buttons
  */
  handleChange = (_val: string, index: number) => {
    this.setState({
      activeSynObjectIndex: index
    })
  }

  render () {
    const { location } = this.props
    const pathname = location.pathname
    const { synapseObject  } = getRouteFromParams(pathname)
    const isSelected = (val: string) => val === name
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 id="explore-portal" className="uppercase">Explore Portal</h2>
              {/*
                  TODO: Factor in its own component
                  <ExploreButtons
                    handleChanges={this.handleChange}
                    isSelected={isSelected}
                  />
                  <div className="homeExploreContainer">
                    <div id="homePageBarChart">
                      TODO: MAKE COMPONENT WITH EXPLORE BUTTONS
                    </div>
                    <Link to={`/Explore/${name}`} id="exploreData"> Explore {name} </Link>
                  </div>
                */}
              {
                synapseObject!.map(
                  (el) => {
                    return (
                      <div key={el.title} className="newContainer">
                        <h2 className="title"> {el.title} </h2>
                        {
                          generateSynapseObject(el)
                        }
                        {el.link && <Link to={el.link} className="viewAll center-content"> View All </Link>}
                      </div>
                    )
                  }
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
