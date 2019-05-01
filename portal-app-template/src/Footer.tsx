import * as React from 'react'
import { Link } from 'react-router-dom'

export const Footer:React.SFC<{}> = () => {
  const goToTop = (_event:any) => { window.scroll({ top: 0, behavior: 'smooth' }) }
  return (
    <footer id="footer" className="center-content">
      <div id="portal-title-footer">
        <Link onClick={goToTop} to="/" id="home-link"> TODO </Link>
      </div>
      <div id="portal-contact-footer" className="center-content">
        <a target="_blank" href="https://s3.amazonaws.com/static.synapse.org/governance/SageBionetworksSynapseTermsandConditionsofUse.pdf?v=5" className="footer-link"> Terms of Service </a>
        <a href="mailto:csbc_pson_dcc@sagebase.org" className="footer-link"> Contact Us </a>
      </div>
    </footer>
  )
}
