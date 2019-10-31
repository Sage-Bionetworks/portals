import * as React from 'react'
import { Link } from 'react-router-dom'
import footerConfig from './config/footerConfig'
import logoFooterConfig from './config/logoFooterConfig'

export const Footer: React.SFC<{}> = () => {
  const goToTop = (_event: any) => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }
  const { name, icon } = logoFooterConfig
  const logo = name ? (
    name
  ) : (
    <img alt="footer logo" className="nav-logo" src={icon} />
  )
  return (
    <footer id="footer" className="center-content">
      <div id="portal-title-footer">
        <Link onClick={goToTop} to="/" id="footer-logo-link">
          {' '}
          {logo}{' '}
        </Link>
      </div>
      <div id="portal-contact-footer" className="center-content">
        <a
          rel="noopener noreferrer"
          target={
            footerConfig.termsOfService.charAt(0) === '/' ? '_self' : '_blank'
          }
          href={footerConfig.termsOfService}
          className="footer-item"
        >
          {' '}
          Terms of Service{' '}
        </a>
        {footerConfig.contactUs && (
          <a
            rel="noopener noreferrer"
            href={footerConfig.contactUs}
            className="footer-item"
          >
            {' '}
            Contact Us{' '}
          </a>
        )}
        {footerConfig.forum && (
          <a href={footerConfig.forum} className="footer-item">
            {' '}
            Forum{' '}
          </a>
        )}
        <button className="footer-item" id="pendo-help-us-improve">
          {' '}
          Help Us Improve{' '}
        </button>
      </div>
    </footer>
  )
}
