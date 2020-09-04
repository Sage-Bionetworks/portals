import * as React from 'react'
import footerConfig from './config/footerConfig'
import logoFooterConfig from './config/logoFooterConfig'
import { ReactComponent as PoweredBySvg } from './portal-assets/poweredbysynapse.svg'
import Versions from 'portal-components/Versions'

export const Footer: React.SFC<{}> = () => {
  const goToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }
  const { name, icon } = logoFooterConfig
  const logo = name ? (
    <span className="nav-logo">
      <button onClick={goToTop}>{name}</button>
      <a
        target="_blank"
        rel="noopener noreferrer"
        id="powered-by-anchor"
        href="https://synapse.org"
      >
        <PoweredBySvg />
      </a>
    </span>
  ) : (
    <img alt="footer logo" className="nav-logo" src={icon} />
  )
  return (
    <footer id="footer" className="center-content">
      <div id="portal-title-footer">
        <div id="footer-logo-link">{logo}</div>
      </div>
      <div id="portal-contact-footer" className="center-content">
        <Versions />
        <a
          rel="noopener noreferrer"
          target={
            footerConfig.termsOfService.charAt(0) === '/' ? '_self' : '_blank'
          }
          href={footerConfig.termsOfService}
          className="footer-item"
        >
          Terms of Service
        </a>
        {footerConfig.contactUs && (
          <a
            rel="noopener noreferrer"
            href={footerConfig.contactUs}
            className="footer-item"
          >
            Contact Us
          </a>
        )}
        {footerConfig.forum && (
          <a href={footerConfig.forum} className="footer-item">
            Forum
          </a>
        )}
        {footerConfig.about && (
          <a href={footerConfig.about} className="footer-item">
            About
          </a>
        )}
      </div>
    </footer>
  )
}
