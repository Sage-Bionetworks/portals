import * as React from 'react'
import headerConfig from './config/headerConfig'

export const Header: React.SFC<{}> = () => {
  const {
    summary,
    title,
    showBlur = true,
    centerText = false,
    HeaderSvg,
  } = headerConfig
  const hasImg = HeaderSvg !== undefined
  return (
    <header id="header">
      {hasImg && <HeaderSvg />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-offset-1 col-md-10">
            <div
              className={`header-text ${showBlur ? 'blur' : ''} ${
                centerText ? 'center-text' : ''
              }`}
            >
              <h2>{title}</h2>
              <p className="normal-weight">{summary}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
