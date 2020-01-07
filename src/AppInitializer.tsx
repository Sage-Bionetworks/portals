import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import docTitleConfig from './config/docTitleConfig'
import { SynapseClient, SynapseConstants } from 'synapse-react-client'
import { withCookies, ReactCookieProps } from 'react-cookie'
import { DOWNLOAD_FILES_MENU_TEXT } from 'synapse-react-client/dist/containers/table/SynapseTableConstants'
export type AppInitializerState = {
  token: string
  showLoginDialog: boolean
}
// pendo's declaration should be picked up by node_modules/@types/pendo-io-browser but is not
declare var pendo: any
export const TokenContext = React.createContext('')

type Props = RouteComponentProps & ReactCookieProps

export type SignInProps = {
  showLoginDialog: boolean
  onSignIn: Function
  handleCloseLoginDialog: Function
}

class AppInitializer extends React.Component<Props, AppInitializerState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      token: '',
      showLoginDialog: false,
    }
    this.initializePendo = this.initializePendo.bind(this)
    this.updateSynapseCallbackCookie = this.updateSynapseCallbackCookie.bind(
      this,
    )
  }

  componentDidMount() {
    if (document.title !== docTitleConfig.name) {
      document.title = docTitleConfig.name
    }
    document
      .querySelector('meta[name="description"]')!
      .setAttribute('content', docTitleConfig.description)

    // we return the chained promises so that any caught error is propogated to the last catch statement
    SynapseClient.getSessionTokenFromCookie()
      .then(sessionToken => {
        if (sessionToken) {
          return SynapseClient.putRefreshSessionToken(sessionToken)
            .then(
              // backend doesn't return a response for this call, its empty
              _response => {
                this.setState({ token: sessionToken })
                return SynapseClient.getUserProfile(sessionToken).then(
                  userProfile => {
                    this.initializePendo(
                      userProfile.ownerId,
                      `${userProfile.userName}@synapse.org`,
                    )
                  },
                )
              },
            )
            .catch(err => {
              console.log('err on putRefreshSessionToken = ', err)
              SynapseClient.signOut()
            })
        }
      })
      .catch(_err => {
        console.log('no token from cookie could be fetched ', _err)
        this.initializePendo()
        // Clear their session token since its stale, components below can then safely check if the user is signed
        // by checking if token is defined or not
      })
    // Technically, the AppInitializer is only mounted once during the portal app lifecycle.
    // But it's best practice to clean up the global listener on component unmount.
    window.addEventListener('click', this.updateSynapseCallbackCookie)
    // on first time, also check for the SSO code
    SynapseClient.detectSSOCode()
  }

  // initialize pendo with the user's email and unique id, if user is anonymous then default values
  // for id and email are 'VISITOR_UNIQUE_ID' and 'n/a'respectively
  initializePendo(id = '', email = 'n/a') {
    pendo.initialize({
      sanitizeUrl: function(url: string) {
        // NOTE: use pendo.normalizedUrl in the js console to see what url we send to Pendo for the page that you're on!
        if (url.endsWith('#/')) {
          url += 'Home' // special case, ability to target home page (empty route)
        }
        return url.replace('#/', '')
      },

      visitor: {
        id,
        email,
      },
      account: {
        id: docTitleConfig.name,
      },
      excludeAllText: true, // Do not send DOM element text to Pendo
    })
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.updateSynapseCallbackCookie)
  }

  onSignIn = (_event: any) => {
    this.setState({
      showLoginDialog: true,
    })
  }

  handleCloseLoginDialog = () => {
    this.setState({
      showLoginDialog: false,
    })
  }

  componentDidUpdate(prevProps: Props) {
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
    if (this.props.location !== prevProps.location) {
      // scroll to the top
      window.scrollTo(0, 0)
      // send page view event to Google Analytics
      // (casting to 'any' type to get compile-time access to gtag())
      const windowAny: any = window
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
        {React.Children.map(this.props.children, (child: any) => {
          if (!child) {
            return false
          } else {
            const props: SignInProps = {
              showLoginDialog: this.state.showLoginDialog,
              onSignIn: this.onSignIn,
              handleCloseLoginDialog: this.handleCloseLoginDialog,
            }
            return React.cloneElement(child, props)
          }
        })}
      </TokenContext.Provider>
    )
  }

  /**
   * PORTALS-490: Set Synapse callback cookie
   * Will attempt to set a .synapse.org domain cookie that has enough information to lead the user
   * back to this portal after visiting www.synapse.org.
   */
  updateSynapseCallbackCookie(ev: MouseEvent) {
    if (!this.props || !this.props.cookies) {
      return
    }
    let isInvokingDownloadTable: boolean = false
    if (ev.target instanceof HTMLAnchorElement) {
      const anchorElement = ev.target as HTMLAnchorElement
      isInvokingDownloadTable = anchorElement.text === DOWNLOAD_FILES_MENU_TEXT
    }
    if (ev.target instanceof HTMLButtonElement) {
      const buttonElement = ev.target as HTMLButtonElement
      if (
        buttonElement.classList.contains(SynapseConstants.SRC_SIGN_IN_CLASS)
      ) {
        this.setState({ showLoginDialog: true })
      }
    }
    let color = 'white'
    let background = '#4db7ad'
    let name = ''
    let icon = ''
    const footerElement = document.querySelector('#footer')
    if (footerElement) {
      color = window
        .getComputedStyle(footerElement, null)
        .getPropertyValue('color')
      background = window
        .getComputedStyle(footerElement, null)
        .getPropertyValue('background-color')
    }
    const footerLinkImgElement = document.querySelector('#footer-logo-link img')
    if (footerLinkImgElement) {
      let imageSrc = footerLinkImgElement.getAttribute('src')
      if (imageSrc) {
        if (!imageSrc.toLowerCase().startsWith('http')) {
          imageSrc = SynapseClient.getRootURL() + imageSrc.substring(1)
        }
        icon = imageSrc
      }
    }
    const footerLinkElement = document.querySelector('#footer-logo-link')
    if (footerLinkElement && footerLinkElement.textContent) {
      name = footerLinkElement.textContent
    }
    const cookieValue = {
      isInvokingDownloadTable,
      foregroundColor: color,
      backgroundColor: background,
      callbackUrl: window.location.href,
      logoUrl: icon,
      portalName: name,
    }
    const expireDate = new Date()
    // expire after 10 seconds
    expireDate.setTime(Date.now() + 1000 * 10)
    const domainValue = window.location.hostname
      .toLowerCase()
      .includes('.synapse.org')
      ? '.synapse.org'
      : undefined
    // Cookies provider exists above AppInitializer so the cookies prop will exist
    this.props.cookies.set(
      'org.sagebionetworks.security.cookies.portal.config',
      JSON.stringify(cookieValue),
      {
        path: '/',
        domain: domainValue,
        expires: expireDate,
      },
    )
  }
}

export default withRouter(withCookies(AppInitializer))
