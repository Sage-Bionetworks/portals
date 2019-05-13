import * as React from 'react'
import { ExploreButtons } from '../ExploreButtons'
import QueryWrapper, { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'
import StackedBarChart from 'synapse-react-client/dist/containers/StackedBarChart'
import { Link } from 'react-router-dom'

type Info = {
  name: string
}

export type StackedBarChartControlProps = {
  queryWrapperConfigs: (QueryWrapperProps & Info) []
}

export type StackedBarChartControlState = {
  index: number
}

export default class StackedBarChartControl extends React.Component<
  StackedBarChartControlProps, StackedBarChartControlState> {

  constructor(props: StackedBarChartControlProps) {
    super(props)
    this.state = {
      index: 0
    }
  }

  /*
    This sets the synapse config from the corresponding click event
    of the explore buttons
  */
  public handleChange = (_val: string, index: number) => {
    this.setState({
      index
    })
  }

  render() {
    const props = this.props.queryWrapperConfigs[this.state.index]
    const { unitDescription = '', name, loadingScreen } = props
    const isSelected = (val: string) => val === name
    return (
      <React.Fragment>
        <ExploreButtons
          handleChanges={this.handleChange}
          isSelected={isSelected}
        />
         <div className="homeExploreContainer">
            <div id="homePageBarChart">
              <QueryWrapper
                {
                  ...props
                }
              >
                <StackedBarChart
                  unitDescription={unitDescription}
                  loadingScreen={loadingScreen}
                  synapseId={''}
                />
              </QueryWrapper>
            </div>
            <Link to={`/Explore/${name}`} id="exploreData"> Explore {name} </Link>
          </div>
      </React.Fragment>
    )
  }
}
