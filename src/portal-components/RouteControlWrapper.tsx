import * as React from 'react'
import { RouteControl, RouteControlProps } from '../RouteControl'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SynapseConfig } from 'types/portal-config'
import { generateSynapseObject } from '../RouteResolver'
import { useEffect, useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";

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
  const handleChangesFn = (val: string, _index: number) => {
    setSelectedTab(val.toUpperCase())
    history.push(`/Explore/${val}`)
  }
  const routeControlProps: RouteControlProps = {
    customRoutes,
    handleChanges: handleChangesFn,
    isSelected: (name: string) => name === subPath,
  }
  const [selectedTab, setSelectedTab] = useState<string>()
  const [showSubNav, setShowSubNav] = useState<boolean>(false)
  
  useEffect(() => {
    setSelectedTab(subPath.toUpperCase())
  },[subPath])

  return (
    <>
      <div className='explore-nav-container'>
        <div className='container-fluid'>
          <h2 className='title'>Explore</h2>
          <h4 className={"mobile-explore-nav-selected"}>
            {selectedTab}
            { showSubNav ?
              <ArrowDropDown fontSize={"large"} onClick={() => setShowSubNav(false)} /> :
              <ArrowDropUp fontSize={"large"} onClick={() => setShowSubNav(true)} />
              }
          </h4>
          <div className={"route-control"}>
            <RouteControl {...routeControlProps} />
          </div>
          { showSubNav &&  // default visibility for mobile sub menu is hidden
            <div className={"mobile-route-control"}>
              <RouteControl {...routeControlProps} />
            </div>
          }
        </div>
      </div>
      <div>
        {synapseConfig && generateSynapseObject(synapseConfig, searchParams)}
      </div>
    </>
  )
}

export default withRouter(RouteControlWrapper)
