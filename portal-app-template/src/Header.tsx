import * as React from 'react'
import { HomePageHeaderConfig } from './types/portal-config'

export const Header: React.SFC<HomePageHeaderConfig> = (props) => {
  const { summary, title } = props
  return (
    <header>
      <div id="header" className="center-content">
        <div className="header-text">
          <h2>
           {summary}
          </h2>
          <p className="normal-weight">
            {title}
          </p>
        </div>
      </div>
  </header>
  )
}
