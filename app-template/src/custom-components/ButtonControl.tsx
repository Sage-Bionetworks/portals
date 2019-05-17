import * as React from 'react'
import { ExploreButtons, ExploreButtonProps } from '../ExploreButtons'
import { withRouter } from 'react-router-dom'
import { SynapseObject } from '../types/portal-config'
import { getRouteFromParams } from '../RouteResolver'

export type ButtonControlProps = {
  queryWrapperConfigs: SynapseObject
  colors: string []
  location: any
  history: any
  match: any
  renderFromUrl: boolean
  customRenderSynapseObject: any
}

export type ButtonControlState = {
  index: number
}

class ButtonControl extends React.Component<
  ButtonControlProps, ButtonControlState> {

  constructor(props: ButtonControlProps) {
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
      customRenderSynapseObject,
      queryWrapperConfigs,
      colors,
    } = this.props
    let synapseObject
    // typecasting is treating customRoutes oddly, casting to unknown is the workaround
    let exploreProps = { colors, customRoutes: queryWrapperConfigs } as unknown as ExploreButtonProps
    /*
      We special case the rendering based on the use case for button control, whether it should retrieve data
      from props or through the URL.
    */
    if (renderFromUrl) {
      synapseObject = getRouteFromParams(location)
      exploreProps = {
        ...exploreProps,
        handleChanges: this.handleChange,
        isSelected: (val: string) => val === name,
      }
    } else {
      synapseObject = queryWrapperConfigs[this.state.index]
      const pathname = location.pathname
      const subPath = pathname.substring('/Explore/'.length)
      exploreProps = {
        ...exploreProps,
        handleChanges: (val: string, _index: number) => this.props.history.push(`/Explore/${val}`),
        isSelected: (name: string) => name === subPath,
      }
    }
    return (
      <React.Fragment>
        <ExploreButtons
          {...exploreProps}
        />
        {
          customRenderSynapseObject(synapseObject)
        }
      </React.Fragment>
    )
  }
}

export default withRouter(ButtonControl)
