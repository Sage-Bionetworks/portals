import * as React from 'react'
import { withRouter } from 'react-router-dom'
import docTitleConfig from './config/docTitleConfig'
import { SynapseClient } from 'synapse-react-client'
import { withCookies, Cookies } from 'react-cookie'

export type AppInitializerProps = {
  location: any,
  cookies: Cookies
}

export type AppInitializerToken = {
  token: string
}

export const TokenContext = React.createContext('')

class AppInitializer extends React.Component<AppInitializerProps, AppInitializerToken> {

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
      }
    ).catch((_err) => {
      console.log('no token from cookie could be fetched ', _err)
    })
    // PORTALS-490: Set Synapse callback cookie
    // TODO: get the computed style color (and background-color) property values (from the footer?)!
    // TODO: set the icon url (), or name
    let background = '#4db7ad'
    let color = 'white'
    let name = ''
    const footerElement = document.querySelector('#footer')
    if (footerElement) {
      color = window.getComputedStyle(footerElement, null).getPropertyValue('color')
      background = window.getComputedStyle(footerElement, null).getPropertyValue('background-color')
    }
    const homeLinkElement = document.querySelector('#home-link')
    if (homeLinkElement && homeLinkElement.textContent) {
      name = homeLinkElement.textContent
    }
    const icon = 'https://nf.synapse.org/static/media/nf-logo-white.b126d37b.svg'
    const cookieValue = {
      foregroundColor: color,
      backgroundColor: background,
      callbackUrl: window.location.href,
      logoUrl: icon,
      portalName: name
    }
    this.props.cookies.set(
      'org.sagebionetworks.security.cookies.portal.config',
      JSON.stringify(cookieValue), { path: '/' }) // , domain: '.synapse.org' })
  }

  componentDidUpdate(prevProps: any) {
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return (
      <TokenContext.Provider value={this.state.token}>
        {this.props.children}
      </TokenContext.Provider>
    )
  }
}

// @ts-ignore
export default withCookies(withRouter(AppInitializer))
