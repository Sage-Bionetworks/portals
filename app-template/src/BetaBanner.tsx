import * as React from 'react'
import betaBannerConfig from './config/betaBannerConfig'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const BetaBanner:React.FunctionComponent<RouteComponentProps> = ({ location }) => {
  // check beta banner is defined and that they're on the home page
  if (betaBannerConfig.name && location.pathname === '/') {
    const style: React.CSSProperties = {
      background: betaBannerConfig.backgroundColor
    }
    return (
      <div id="banner" style={style}>
        <span id="betaSpan"> BETA </span>
        The updated {betaBannerConfig.name} is currently under development.
        During this time, you can still use the <a href={betaBannerConfig.originalSite}> the original site. </a>
      </div>
    )
  }
  // else they don't want the banner, show nothing
  return <React.Fragment/>
}

export default withRouter(BetaBanner)
