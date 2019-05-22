import * as React from 'react'
import { ButtonControl, ButtonControlProps, NamedRoute } from '../ButtonControl'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SynapseObjectSingle } from '../types/portal-config'
import { generateSynapseObject } from '../RouteResolver'

export type ExploreButtonControlProps = {
  synapseObjectSingle: SynapseObjectSingle
  colors: string []
  // we have to pass in all the custom routes because unlike the home page the explore buttons configs aren't held in state
  customRoutes: NamedRoute []
}

export type ButtonControlState = {
  index: number
}

type Props = RouteComponentProps & ExploreButtonControlProps

/**
 * ExploreButtonControl is the set of buttons used on the /Explore page to navigate the
 * different keys.
 *
 * @param {*} { location, synapseObjectSingle, colors, history, customRoutes }
 * @returns
 */
const ExploreButtonControl:React.FunctionComponent<Props> = ({ location, synapseObjectSingle, colors, history, customRoutes }) => {
  const pathname = location.pathname
  const subPath = pathname.substring('/Explore/'.length)
  const buttonControlProps: ButtonControlProps = {
    colors,
    customRoutes,
    handleChanges: (val: string, _index: number) => history.push(`/Explore/${val}`),
    isSelected: (name: string) => name === subPath,
  }
  return (
    <React.Fragment>
      <ButtonControl
        {...buttonControlProps}
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

export default withRouter(ExploreButtonControl)
