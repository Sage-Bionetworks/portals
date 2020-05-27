import * as React from 'react'
import { ButtonControl, ButtonControlProps } from '../ButtonControl'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SynapseConfig } from 'types/portal-config'
import { generateSynapseObject } from '../RouteResolver'

export type RouteButtonControlWrapperProps = {
  synapseConfig?: SynapseConfig
  colors: string[]
  // we have to pass in all the custom routes because unlike the home page the explore buttons configs aren't held in state
  customRoutes: string[]
  searchParams?: any
}

export type ButtonControlState = {
  index: number
}

type Props = RouteComponentProps & RouteButtonControlWrapperProps

/**
 * RouteButtonControl is the set of buttons used on the /Explore page to navigate the
 * different keys.
 *
 * @param {*} { location, SynapseConfig, colors, history, customRoutes }
 * @returns
 */
const RouteButtonControl: React.FunctionComponent<Props> = ({
  location,
  synapseConfig,
  colors = [],
  history,
  customRoutes = [],
  searchParams,
}) => {
  const pathname = location.pathname
  const subPath = pathname.substring('/Explore/'.length)
  const buttonControlProps: ButtonControlProps = {
    colors,
    customRoutes,
    handleChanges: (val: string, _index: number) =>
      history.push(`/Explore/${val}`),
    isSelected: (name: string) => name === subPath,
  }
  return (
    <React.Fragment>
      <ButtonControl {...buttonControlProps} />
      {synapseConfig && generateSynapseObject(synapseConfig, searchParams)}
    </React.Fragment>
  )
}

export default withRouter(RouteButtonControl)
