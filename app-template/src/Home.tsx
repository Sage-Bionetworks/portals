import * as React from 'react'
import { Header } from './Header'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import RouteResolver from './RouteResolver'

class Home extends React.Component<RouteComponentProps, {}> {

  constructor(props: RouteComponentProps) {
    super(props)
  }

  render () {
    const { location } = this.props
    return (
      <div>
        <Header />
        <RouteResolver/>
        {/* <div className="container">
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
        </div> */}
      </div>
    )
  }
}

export default withRouter(Home)
