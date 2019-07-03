import * as React from 'react'
import { ButtonControl, ButtonControlProps } from '../ButtonControl'
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
 * StatefulButtonControl is the set of buttons used to navigate between
 * the preview of the various SRC components.
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
    const { name, synapseConfigArray } = configs[this.state.index]
    const buttonControlProps: ButtonControlProps = {
      colors,
      customRoutes: configs.map(el => el.name),
      handleChanges: this.handleChange,
      isSelected: (val: string) => val === name,
    }
    return (
      <React.Fragment>
        <ButtonControl
          {...buttonControlProps}
        />
        {
          synapseConfigArray.map(
            (config) => {
              return generateSynapseObject(config)
            }
          )
        }
      </React.Fragment>
    )
  }
}

export default StatefulButtonControl
