import * as React from 'react'
import { Header } from './Header'
import homeConfig from './example-configuration/homeConfig'
import { ExploreButtons } from './ExploreButtons'
import { SynapseComponents } from 'synapse-react-client'
import { Link } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
import { exploreSynapseConfigs } from './example-configuration/explore'

type HomeState = {
  activeSynObject: any
}

class Home extends React.Component<{}, HomeState> {

  constructor(props: any) {
    super(props)
    this.state = {
      activeSynObject: exploreSynapseConfigs.default
    }
  }

  /*
    This sets the synapse config from the corresponding click event
    of the explore buttons
  */
  handleChange = (name: string) => {
    const activeSynObject = (exploreSynapseConfigs as any)[name]
    this.setState({
      activeSynObject
    })
  }

  render () {
    const { activeSynObject } = this.state
    const {
      initQueryRequest,
      rgbIndex,
      facetName,
      unitDescription,
      facetAliases,
      name
    } = activeSynObject
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
                  >
                    <SynapseComponents.StackedBarChart
                      loadingScreen={loadingScreen}
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
                        <Link to={'/Explore/Studies'} className="viewAll center-content"> View All </Link>
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
