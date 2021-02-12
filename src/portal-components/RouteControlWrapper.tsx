import * as React from 'react'
import { RouteControl, RouteControlProps } from '../RouteControl'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SynapseConfig } from 'types/portal-config'
import { generateSynapseObject } from '../RouteResolver'

export type RouteControlWrapperProps = {
  synapseConfig?: SynapseConfig
  // we have to pass in all the custom routes because unlike the home page the explore buttons configs aren't held in state
  customRoutes: string[]
  searchParams?: any
}

type Props = RouteComponentProps & RouteControlWrapperProps

/**
 * RouteControl is the set of controls used on the /Explore page to navigate the
 * different keys.
 *
 * @param {*} { location, SynapseConfig, colors, history, customRoutes }
 * @returns
 */
const RouteControlWrapper: React.FunctionComponent<Props> = ({
  location,
  synapseConfig,
  history,
  customRoutes = [],
  searchParams,
}) => {
  const pathname = location.pathname
  const subPath = pathname.substring('/Explore/'.length)
  const routeControlProps: RouteControlProps = {
    customRoutes,
    handleChanges: (val: string, _index: number) =>
      history.push(`/Explore/${val}`),
    isSelected: (name: string) => name === subPath,
  }
  return (
    <>
      <div className='explore-nav-container'>
        <div className='container-fluid'>
          <h2 className='title'>Explore</h2>
          <RouteControl {...routeControlProps} />
        </div>        
      </div>
      <div className='container-fluid'>
        {synapseConfig && generateSynapseObject(synapseConfig, searchParams)}
      </div>      
    </>
  )
}

export default withRouter(RouteControlWrapper)
