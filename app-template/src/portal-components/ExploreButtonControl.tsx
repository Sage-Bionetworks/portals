import * as React from 'react'
import { ExploreButtons, ExploreButtonProps } from '../ExploreButtons'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SynapseObjectSingle } from '../types/portal-config'
import { generateSynapseObject, getRouteFromParams } from '../RouteResolver'

export type ExploreButtonControlProps = {
  synapseObjectSingle: SynapseObjectSingle
  colors: string []
  renderFromUrl: boolean
}

export type ButtonControlState = {
  index: number
}

type InternalProps = RouteComponentProps & ExploreButtonControlProps
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
      location,
      synapseObjectSingle,
      colors,
    } = this.props
    const pathname = location.pathname
    const subPath = pathname.substring('/Explore/'.length)
    const exploreButtonProps: ExploreButtonProps = {
      colors,
      handleChanges: (val: string, _index: number) => this.props.history.push(`/Explore/${val}`),
      isSelected: (name: string) => name === subPath,
    }
    /*
      We special case the rendering based on the use case for button control, whether it should retrieve data
      from props or through the URL.
    */
    return (
      <React.Fragment>
        <ExploreButtons
          {...exploreButtonProps}
        />
        <div className={'container explore'}>
          <div className="row">
            {
              generateSynapseObject(synapseObjectSingle)
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

// Use the 'as React..' so that the routing props which are injected don't raise any compiler warnings
export default withRouter(ButtonControl) as React.ComponentClass<ExploreButtonControlProps, {}>
