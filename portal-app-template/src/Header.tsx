import * as React from 'react'
import headerConfig from './configuration/headerConfig'

export const Header: React.SFC<{}> = () => {
  const { summary, title } = headerConfig
  return (
    <header>
      <div id="header" className="center-content">
        <div className="header-text">
          <h2>
            {title}
          </h2>
          <p className="normal-weight">
           {summary}
          </p>
        </div>
      </div>
  </header>
  )
}
