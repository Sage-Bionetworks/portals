import * as React from 'react'
import { ExploreButtons, ExploreButtonProps } from '../ExploreButtons'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { SynapseObjectSingle } from '../types/portal-config'
import { generateSynapseObject } from '../RouteResolver'

type StatefulConfiguration = {
  synapseObject: SynapseObjectSingle
  name: string
}

export type HomeButtonControlProps = {
  statefulConfigurations?: StatefulConfiguration []
  colors: string []
  renderFromUrl: boolean
}

export type ButtonControlState = {
  index: number
}

type InternalProps = RouteComponentProps & HomeButtonControlProps
class ButtonControl extends React.Component<InternalProps, ButtonControlState> {

  constructor(props: InternalProps) {
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
      statefulConfigurations,
      colors,
    } = this.props
    // typecasting is treating customRoutes oddly, casting to unknown is the workaround
    const exploreButtonProps: ExploreButtonProps = {
      colors,
      customRoutes: statefulConfigurations,
      handleChanges: this.handleChange,
      isSelected: (val: string) => val === statefulConfig.name,
    }
    const statefulConfig = statefulConfigurations![this.state.index]
    const synapseObject = statefulConfig.synapseObject
    return (
      <React.Fragment>
        <ExploreButtons
          {...exploreButtonProps}
        />
        <div className="homeExploreContainer">
          <div id="homePageBarChart">
            {generateSynapseObject(synapseObject)}
          </div>
          <Link to={`/Explore/${synapseObject.name}`} id="exploreData"> Explore {synapseObject.name} </Link>
        </div>
      </React.Fragment>
    )
  }
}

// Use the 'as React..' so that the routing props which are injected don't raise any compiler warnings
export default withRouter(ButtonControl) as React.ComponentClass<HomeButtonControlProps, {}>
