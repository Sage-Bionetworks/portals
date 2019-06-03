import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import docTitleConfig from './config/docTitleConfig'
import { SynapseClient } from 'synapse-react-client'
import { withCookies, ReactCookieProps } from 'react-cookie'

export type AppInitializerToken = {
  token: string
}

export const TokenContext = React.createContext('')

class AppInitializer extends React.Component<RouteComponentProps & ReactCookieProps, AppInitializerToken> {

  constructor(props: any) {
    super(props)
    this.state = {
      token: ''
    }
  }

  componentDidMount() {
    if (document.title !== docTitleConfig.name) {
      document.title = docTitleConfig.name
    }
    SynapseClient.getSessionTokenFromCookie().then(
      (sessionToken) => {
        if (sessionToken) {
          SynapseClient.putRefreshSessionToken(sessionToken).then(
            // backend doesn't return a response for this call, its empty
            (_response) => {
              this.setState({ token: sessionToken })
            }
          ).catch(
            (err) => {
              console.log('Session token refresh failed with error ', err)
            }
          )
        }
      }
    ).catch((_err) => {
      console.log('no token from cookie could be fetched ', _err)
    })
    this.updateSynapseCallbackCookie()
    // on first time, also check for the SSO code
    SynapseClient.detectSSOCode()
  }

  componentDidUpdate(prevProps: any) {
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
      this.updateSynapseCallbackCookie()
    }
  }

  render() {
    return (
      <TokenContext.Provider value={this.state.token}>
        {this.props.children}
      </TokenContext.Provider>
    )
  }

  /**
   * PORTALS-490: Set Synapse callback cookie
   * Will attempt to set a .synapse.org domain cookie that has enough information to lead the user
   * back to this portal after visiting www.synapse.org.
   */
  updateSynapseCallbackCookie() {
    let color = 'white'
    let background = '#4db7ad'
    let name = ''
    let icon = ''
    const footerElement = document.querySelector('#footer')
    if (footerElement) {
      color = window.getComputedStyle(footerElement, null).getPropertyValue('color')
      background = window.getComputedStyle(footerElement, null).getPropertyValue('background-color')
    }
    const footerLinkImgElement = document.querySelector('#footer-link img')
    if (footerLinkImgElement) {
      let imageSrc = footerLinkImgElement.getAttribute('src')
      if (imageSrc) {
        if (!imageSrc.toLowerCase().startsWith('http')) {
          imageSrc = SynapseClient.getRootURL() + imageSrc.substring(1)
        }
        icon = imageSrc
      }
    }
    const footerLinkElement = document.querySelector('#footer-link')
    if (footerLinkElement && footerLinkElement.textContent) {
      name = footerLinkElement.textContent
    }
    const cookieValue = {
      foregroundColor: color,
      backgroundColor: background,
      callbackUrl: window.location.href,
      logoUrl: icon,
      portalName: name
    }
    const expireDate = new Date()
    // expire after 20 minutes
    expireDate.setTime(Date.now() + 1000 * 60 * 20)
    const domainValue = window.location.hostname.toLowerCase().includes('.synapse.org') ? '.synapse.org' : undefined
    // Cookies provider exists above AppInitializer so the cookies prop will exist
    this.props.cookies!.set(
      'org.sagebionetworks.security.cookies.portal.config',
      JSON.stringify(cookieValue),
      {
        path: '/',
        domain: domainValue,
        expires: expireDate
      }
    )
  }
}

export default withCookies(withRouter(AppInitializer))
