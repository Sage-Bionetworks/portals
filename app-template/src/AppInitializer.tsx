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
    const { cookies } = props
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
        this.setState({ token: sessionToken })
        if (sessionToken) {
          SynapseClient.putRefreshSessionToken(sessionToken).then(
            (_response) => {
              // backend doesn't return a response for this call, its empty
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
    const homeLinkImgElement = document.querySelector('#footer-link img')
    if (homeLinkImgElement) {
      const imageSrc = homeLinkImgElement.getAttribute('src')
      if (imageSrc) {
        icon = imageSrc
      }
    }
    const homeLinkElement = document.querySelector('#footer-link')
    if (homeLinkElement && homeLinkElement.textContent) {
      name = homeLinkElement.textContent
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
    // Cookies provider exists about AppInitializer so the cookies prop will exist
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

// @ts-ignore
export default withCookies(withRouter(AppInitializer))
