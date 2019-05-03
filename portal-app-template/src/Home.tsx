import * as React from 'react'
import { Header } from './Header'
import homeConfig from './example-configuration/homeConfig'
import { ExploreButtons } from './ExploreButtons'
import { SynapseComponents } from 'synapse-react-client'
import { Link } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
import routesConfig from './example-configuration/routesConfig'
import { ExploreNestedRoute } from './types/portal-config'

type HomeState = {
  activeSynObject: ExploreNestedRoute
  activeSynObjectIndex: number
}

class Home extends React.Component<{}, HomeState> {

  constructor(props: any) {
    super(props)
    this.state = {
      activeSynObjectIndex: 0,
      activeSynObject: (routesConfig.find(el => el.name === 'Explore') as any)!.routes
    }
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
    const { activeSynObject } = this.state
    const { homePageSynapseObject, name } = activeSynObject[this.state.activeSynObjectIndex]
    const {
      initQueryRequest,
      rgbIndex,
      facetName,
      unitDescription,
      facetAliases,
    } = homePageSynapseObject.props
    const isSelected = (val: string) => val === name
    const loadingScreen = <div className="bar-loader"><BarLoader color="#47337D" loading={true} /></div>
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 id="explore-portal" className="uppercase">Explore Portal</h2>
              <ExploreButtons
                handleChanges={this.handleChange}
                isSelected={isSelected}
              />
              <div className="homeExploreContainer">
                <div id="homePageBarChart">
                  <SynapseComponents.QueryWrapper
                    initQueryRequest={initQueryRequest}
                    rgbIndex={rgbIndex}
                    facetName={facetName}
                    facetAliases={facetAliases}
                    unitDescription={unitDescription}
                  >
                    <SynapseComponents.StackedBarChart
                      loadingScreen={loadingScreen}
                      // todo: remove synapseId and unitDescription as props
                      unitDescription={unitDescription}
                      synapseId={''}
                    />
                  </SynapseComponents.QueryWrapper>
                </div>
                <Link to={`/Explore/${name}`} id="exploreData"> Explore {name} </Link>
              </div>
              {
                homeConfig.homeSynapseObjects.map(
                  (el) => {
                    const SynapseComponent = (SynapseComponents as any)[el.name]
                    return (
                      <div key={el.title} className="newContainer">
                        <h2 className="title"> {el.title} </h2>
                        <SynapseComponent
                          {...el.props}
                        />
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

export default Home
