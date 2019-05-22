import * as React from 'react'
import { ButtonControl, ButtonControlProps } from '../ButtonControl'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { SynapseConfig } from '../types/portal-config'
import { generateSynapseObject } from '../RouteResolver'

type HomeButtonControlConfigs = {
  SynapseConfig: SynapseConfig
  name: string
}

export type HomeButtonControlWrapperProps = {
  configs: HomeButtonControlConfigs []
  colors: string []
}

export type ButtonControlState = {
  index: number
}

type Props = RouteComponentProps & HomeButtonControlWrapperProps

/**
 * HomeButtonControl is the set of buttons used on the home page to navigate between
 * the preview of the various data.
 *
 * @class HomeButtonControl
 * @extends {React.Component<Props, ButtonControlState>}
 */
class HomeButtonControl extends React.Component<Props, ButtonControlState> {

  constructor(props: Props) {
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
    const statefulConfig = configs![this.state.index]
    const SynapseConfig = statefulConfig.SynapseConfig
    return (
      <React.Fragment>
        <ButtonControl
          {...buttonControlProps}
        />
        <div className="homeExploreContainer">
          <div id="homePageBarChart">
            {generateSynapseObject(SynapseConfig)}
          </div>
          <Link to={`/Explore/${statefulConfig.name}`} id="exploreData"> Explore {statefulConfig.name} </Link>
        </div>
      </React.Fragment>
    )
  }
}

// Use the 'as React..' so that the routing props which are injected don't raise any compiler warnings
export default withRouter(HomeButtonControl) as React.ComponentClass<HomeButtonControlWrapperProps, {}>
