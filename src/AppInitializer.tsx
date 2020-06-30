import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import docTitleConfig from './config/docTitleConfig'
import { SynapseClient, SynapseConstants } from 'synapse-react-client'
import { withCookies, ReactCookieProps } from 'react-cookie'
import { DOWNLOAD_FILES_MENU_TEXT } from 'synapse-react-client/dist/containers/table/SynapseTableConstants'
import { UserProfile } from 'synapse-react-client/dist/utils/synapseTypes'

export type AppInitializerState = {
  token: string
  showLoginDialog: boolean
  userProfile: UserProfile | undefined
  // delay render until get session is called, o.w. theres an uneccessary refresh right
  // after page load
  hasCalledGetSession: boolean
}

export const TokenContext = React.createContext('')

type Props = RouteComponentProps & ReactCookieProps

export type SignInProps = {
  userProfile: UserProfile | undefined
  resetSession: Function
  getSession: Function
  showLoginDialog: boolean
  onSignIn: Function
  handleCloseLoginDialog: Function
}

const COOKIE_CONFIG_KEY = 'org.sagebionetworks.security.cookies.portal.config'

class AppInitializer extends React.Component<Props, AppInitializerState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      token: '',
      hasCalledGetSession: false,
      userProfile: undefined,
      showLoginDialog: false,
    }
    this.updateSynapseCallbackCookie = this.updateSynapseCallbackCookie.bind(
      this,
    )
  }

  resetSession = () => {
    SynapseClient.signOut(this.getSession)
    this.setState({
      showLoginDialog: false,
    })
  }

  initAnonymousUserState = () => {
    SynapseClient.signOut(() => {
      // reset token and user profile
      this.setState({
        token: '',
        userProfile: undefined,
        hasCalledGetSession: true,
      })
    })
  }

  getSession = async () => {
    try {
      const token = await SynapseClient.getSessionTokenFromCookie()
      if (!token) {
        this.initAnonymousUserState()
        return
      }
      // try to refresh their session for convenience
      await SynapseClient.putRefreshSessionToken(token)
      this.setState({ token, hasCalledGetSession: true })
      // get user profile
      const userProfile = await SynapseClient.getUserProfile(token)
      if (userProfile.profilePicureFileHandleId) {
        userProfile.clientPreSignedURL = `https://www.synapse.org/Portal/filehandleassociation?associatedObjectId=${userProfile.ownerId}&associatedObjectType=UserProfileAttachment&fileHandleId=${userProfile.profilePicureFileHandleId}`
      }
      this.setState({
        userProfile,
      })
    } catch (e) {
      console.error('Error on getSession: ', e)
      // intentionally calling sign out because there token could be stale so we want
      // the stored session to be cleared out.
      this.initAnonymousUserState()
    }
  }

  componentDidMount() {
    if (document.title !== docTitleConfig.name) {
      document.title = docTitleConfig.name
    }
    document
      .querySelector('meta[name="description"]')!
      .setAttribute('content', docTitleConfig.description)

    this.getSession()
    // Technically, the AppInitializer is only mounted once during the portal app lifecycle.
    // But it's best practice to clean up the global listener on component unmount.
    window.addEventListener('click', this.updateSynapseCallbackCookie)
    // on first time, also check for the SSO code
    SynapseClient.detectSSOCode()
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.updateSynapseCallbackCookie)
  }

  onSignIn = () => {
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
          page_path: `/${this.props.location.pathname}`,
        })
      }
    }
  }

  render() {
    if (!this.state.hasCalledGetSession) {
      // prevent componentDidUpdate all over the page by waiting for get session call
      return <></>
    }
    return (
      <TokenContext.Provider value={this.state.token}>
        {React.Children.map(this.props.children, (child: any) => {
          if (!child) {
            return false
          } else {
            const props: SignInProps = {
              showLoginDialog: this.state.showLoginDialog,
              getSession: this.getSession,
              onSignIn: this.onSignIn,
              userProfile: this.state.userProfile,
              resetSession: this.resetSession,
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
        if (!this.state.showLoginDialog) {
          this.setState({ showLoginDialog: true })
        }
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
    this.props.cookies.set(COOKIE_CONFIG_KEY, JSON.stringify(cookieValue), {
      path: '/',
      domain: domainValue,
      maxAge: 10,
    })
  }
}

export default withRouter(withCookies(AppInitializer))
