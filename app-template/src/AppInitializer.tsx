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
    this.initializePendo = this.initializePendo.bind(this)
    this.updateSynapseCallbackCookie = this.updateSynapseCallbackCookie.bind(this)
  }

  componentDidMount() {
    if (document.title !== docTitleConfig.name) {
      document.title = docTitleConfig.name
    }
    // we return the chained promises so that any caught error is propogated to the last catch statement
    SynapseClient.getSessionTokenFromCookie().then(
      (sessionToken: string) => {
        if (sessionToken) {
          return SynapseClient.putRefreshSessionToken(sessionToken).then(
            // backend doesn't return a response for this call, its empty
            (_response) => {
              this.setState({ token: sessionToken })
              return SynapseClient.getUserProfile(sessionToken).then((userProfile) => {
                this.initializePendo(userProfile.ownerId, `${userProfile.userName}@synapse.org`)
              })
            }
          )
        }
      }).catch((_err) => {
        console.log('no token from cookie could be fetched ', _err)
        this.initializePendo()
      })
    // Technically, the AppInitializer is only mounted once during the portal app lifecycle.
    // But it's best practice to clean up the global listener on component unmount.
    window.addEventListener('click', this.updateSynapseCallbackCookie)
    // on first time, also check for the SSO code
    SynapseClient.detectSSOCode()
  }

  // initialize pendo with the user's email and unique id, if user is anonymous then default values
  // for id and email are 'VISITOR_UNIQUE_ID' and 'n/a'respectively
  initializePendo(id = 'VISITOR_UNIQUE_ID', email = 'n/a') {
    pendo.initialize({
      visitor: {
        id,
        email
      },
      account: {
        id: docTitleConfig.name
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.updateSynapseCallbackCookie)
  }

  componentDidUpdate(prevProps: any) {
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
    if (this.props.location !== prevProps.location) {
      // scroll to the top
      window.scrollTo(0, 0)
      // send page view event to Google Analytics
      // (casting to 'any' type to get compile-time access to gtag())
      const windowAny:any = window
      const gtag = windowAny.gtag
      if (gtag) {
        gtag('config', 'UA-29804340-1', {
          page_location: window.location.href,
          page_path: `/#${this.props.location.pathname}`,
        })
      }
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
  updateSynapseCallbackCookie(
    ev: MouseEvent
  ) {
    if (!this.props || !this.props.cookies) {
      return
    }
    let href: string | null = null
    if (ev.target instanceof HTMLAnchorElement) {
      const anchorElement = ev.target as HTMLAnchorElement
      href = anchorElement.getAttribute('href')
    }
    if (!href || !href.includes('.synapse.org')) {
      return
    }
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
    this.props.cookies.set(
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
