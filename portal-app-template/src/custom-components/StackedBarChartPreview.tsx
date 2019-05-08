import * as React from 'react'
import { ExploreButtons } from '../ExploreButtons'
import QueryWrapper, { QueryWrapperProps } from 'synapse-react-client/dist/containers/QueryWrapper'
import StackedBarChart from 'synapse-react-client/dist/containers/StackedBarChart'
import { BarLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

type Info = {
  name: string
}

export type StackedBarChartPreviewProps = {
  queryWrapperConfigs: (QueryWrapperProps & Info) []
}

export type StackedBarChartPreviewState = {
  index: number
}

export default class StackedBarChartPreview extends React.Component<
  StackedBarChartPreviewProps, StackedBarChartPreviewState> {

  constructor(props: StackedBarChartPreviewProps) {
    super(props)
    this.state = {
      index: 0
    }
  }

    /*
    This sets the synapse config from the corresponding click event
    of the explore buttons
  */
  handleChange = (_val: string, index: number) => {
    this.setState({
      index
    })
  }

  render() {
    const props = this.props.queryWrapperConfigs[this.state.index]
    const { unitDescription = '', name } = props
    const isSelected = (curName: string) => curName === name
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
                  loadingScreen={<div className="bar-loader"><BarLoader color="#47337D" loading={true} /></div>}
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
