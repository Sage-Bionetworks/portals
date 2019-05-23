import * as React from 'react'
import { Header } from './Header'
import { Link, withRouter } from 'react-router-dom'
import { getRouteFromParams, generateSynapseObject } from './RouteResolver'

type HomeProps = {
  location: any
  history: any
  match: any
}

class Home extends React.Component<HomeProps, {}> {

  constructor(props: any) {
    super(props)
  }

  render () {
    const { location } = this.props
    const pathname = location.pathname
    const { synapseConfigArray  } = getRouteFromParams(pathname)
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {
                synapseConfigArray!.map(
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
