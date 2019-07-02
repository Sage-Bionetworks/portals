import * as React from 'react'
import { ButtonControl, ButtonControlProps } from '../ButtonControl'
import { Link } from 'react-router-dom'
import { SynapseConfigArray } from '../types/portal-config'
import { generateSynapseObject } from '../RouteResolver'

type StatefulButtonControlConfigs = {
  synapseConfigArray: SynapseConfigArray
  name: string
}

export type StatefulButtonControlWrapperProps = {
  configs: StatefulButtonControlConfigs []
  colors: string []
}

export type ButtonControlState = {
  index: number
}

/**
 * StatefulButtonControl is the set of buttons used on the home page to navigate between
 * the preview of the various data.
 *
 * @class StatefulButtonControl
 * @extends {React.Component<Props, ButtonControlState>}
 */
class StatefulButtonControl extends React.Component<StatefulButtonControlWrapperProps, ButtonControlState> {

  constructor(props: StatefulButtonControlWrapperProps) {
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
    const {
      configs,
      colors,
    } = this.props
    const buttonControlProps: ButtonControlProps = {
      colors,
      customRoutes: configs.map(el => el.name),
      handleChanges: this.handleChange,
      isSelected: (val: string) => val === statefulConfig.name,
    }
    const statefulConfig = configs[this.state.index]
    const synapseConfig = statefulConfig.synapseConfigArray[0]
    return (
      <React.Fragment>
        <ButtonControl
          {...buttonControlProps}
        />
        <div className="homeExploreContainer">
          <div id="homePageBarChart">
            {generateSynapseObject(synapseConfig)}
          </div>
          <Link to={`/Explore/${statefulConfig.name}`} id="exploreData"> Explore {statefulConfig.name} </Link>
        </div>
      </React.Fragment>
    )
  }
}

export default StatefulButtonControl
