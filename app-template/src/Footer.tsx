import * as React from 'react'
import { Link } from 'react-router-dom'
import footerConfig from './config/footerConfig'
import logoHeaderConfig from './config/logoHeaderConfig'

export const Footer:React.SFC<{}> = () => {
  const goToTop = (_event:any) => { window.scroll({ top: 0, behavior: 'smooth' }) }
  const { name, icon } = logoHeaderConfig
  const logo = name ? name : <img className="nav-logo" src={icon} />
  return (
    <footer id="footer" className="center-content">
      <div id="portal-title-footer">
        <Link onClick={goToTop} to="/" id="home-link"> {logo} </Link>
      </div>
      <div id="portal-contact-footer" className="center-content">
        <a target="_blank" href={footerConfig.termsOfService} className="footer-link"> Terms of Service </a>
        <a href={footerConfig.contactUs} className="footer-link"> Contact Us </a>
      </div>
    </footer>
  )
}
