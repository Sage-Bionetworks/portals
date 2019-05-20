import * as React from 'react'
import { ExploreButtons, ExploreButtonProps } from '../ExploreButtons'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SynapseObject, SynapseObjectSingle } from '../types/portal-config'
import homeSynapseObjectRenderer from './homeSynapseObjectRenderer'
import exploreSynapseObjectRenderer from './exploreSynapseObjectRenderer'
import { generateSynapseObject, getRouteFromParams } from '../RouteResolver'

type StatefulConfiguration = {
  synapseObject: SynapseObjectSingle
  name: string
}

export type ButtonControlProps = {
  statefulConfigurations?: StatefulConfiguration []
  colors: string []
  renderFromUrl: boolean
}

export type ButtonControlState = {
  index: number
}

type InternalProps = RouteComponentProps & ButtonControlProps
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
      renderFromUrl,
      location,
      statefulConfigurations,
      colors,
    } = this.props
    let synapseObject: any
    // typecasting is treating customRoutes oddly, casting to unknown is the workaround
    let exploreButtonProps = { colors, customRoutes: statefulConfigurations } as unknown as ExploreButtonProps
    /*
      We special case the rendering based on the use case for button control, whether it should retrieve data
      from props or through the URL.
    */
    const pathname = location.pathname
    let customRenderSynapseObject
    if (renderFromUrl) {
      synapseObject = getRouteFromParams(pathname).synapseObject
      const subPath = pathname.substring('/Explore/'.length)
      exploreButtonProps = {
        ...exploreButtonProps,
        handleChanges: (val: string, _index: number) => this.props.history.push(`/Explore/${val}`),
        isSelected: (name: string) => name === subPath,
      }
      customRenderSynapseObject = exploreSynapseObjectRenderer
    } else {
      const statefulConfig = statefulConfigurations![this.state.index]
      synapseObject = statefulConfig.synapseObject
      exploreButtonProps = {
        ...exploreButtonProps,
        handleChanges: this.handleChange,
        isSelected: (val: string) => val === statefulConfig.name,
      }
      customRenderSynapseObject = homeSynapseObjectRenderer
    }
    return (
      <React.Fragment>
        <ExploreButtons
          {...exploreButtonProps}
        />
        {
          customRenderSynapseObject(synapseObject)
        }
      </React.Fragment>
    )
  }
}

// Use the 'as React..' so that the routing props which are injected don't raise any compiler warnings
export default withRouter(ButtonControl) as React.ComponentClass<ButtonControlProps, {}>
