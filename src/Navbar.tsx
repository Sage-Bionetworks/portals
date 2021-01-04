import * as React from 'react'
import routesConfig from './config/routesConfig'
import logoHeaderConfig from './config/logoHeaderConfig'
import Dialog from '@material-ui/core/Dialog'
import Dropdown from 'react-bootstrap/Dropdown'
import { SynapseComponents } from 'synapse-react-client'
import { TokenContext, SignInProps } from './AppInitializer'
import './Navbar.css'
import NavLink from 'portal-components/NavLink'
import NavUserLink from "./portal-components/NavUserLink";
import { GenericRoute } from 'types/portal-config'

type SynapseSettingLink = {
  text: string
  hasBorder?: boolean
  settingSubPath?: string
}

type State = {
  showMenu: boolean
}

class Navbar extends React.Component<any, State> {
  synapseQuickLinks: SynapseSettingLink[] = [
    {
      text: 'Profile',
    },
    {
      text: 'Projects',
      settingSubPath: 'projects',
    },
    {
      text: 'Teams',
      settingSubPath: 'teams',
    },
    {
      text: 'Challenges',
      settingSubPath: 'challenges',
    },
    {
      text: 'Downloads',
      settingSubPath: 'downloads',
      hasBorder: true,
    },
    {
      text: 'Settings',
      settingSubPath: 'settings',
      hasBorder: true,
    },
  ]

  private openBtnRef = React.createRef<HTMLDivElement>()

  constructor(props: any) {
    super(props)
    this.state = {
      showMenu: false,
    }
  }

  // given the hash, decide if the link should have a bottom border
  getBorder = (name: string = '') => {
    if (name === '') {
      // special case the home page
      return
    }
    const hash = window.location.hash.substring(2)
    return hash.includes(name) ? 'bottom-border' : ''
  }

  goToTop = () => {
    window.scroll({ top: 0 })
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside(e: Event) {
    const node = e.target as HTMLElement
    if (
      this.openBtnRef &&
      !(this.openBtnRef.current === node || node?.closest('.dropdown-toggle'))
    ) {
      this.setState({ showMenu: false })
    }
  }

  getLinkHref = (route: GenericRoute, topLevelTo?: string, includeQueryParams?: boolean) => {
    const { to, link } = route    
    let href = link ?? `/${topLevelTo}/${to}`
    const indexOfQuestionMark = href.indexOf('?')
    if (!includeQueryParams && indexOfQuestionMark > -1) {
      href = href.slice(0, indexOfQuestionMark)
    }
    return href
  }

  render() {
    const {
      onSignIn,
      handleCloseLoginDialog,
      showLoginDialog,
      getSession,
      resetSession,
      userProfile,
    } = this.props as SignInProps
    const { name, icon, hideLogin = false } = logoHeaderConfig
    const token = this.context
    const imageElement = icon ? (
      <img alt="navigation logo" className="nav-logo" src={icon} />
    ) : (
      <></>
    )
    const nameElement = name ? (
      <span style={{ marginLeft: 10 }}>{name}</span>
    ) : (
      <></>
    )
    const hostname = window.location.hostname.toLowerCase()
    // for now, we only support login in the dev environment (localstorage) or from a .synapse.org subdomain (http-only secure cookie)
    const isSynapseSubdomainOrLocal =
      (hostname.includes('.synapse.org') ||
        hostname.includes('127.0.0.1') ||
        hostname.includes('localhost')) &&
      !hideLogin
    const isHomeSelectedCssClassName = window.location.pathname.replace('/', '') === '' ? 'isSelected' : ''
    const homeRouteConfig:GenericRoute = routesConfig.filter(r => { return r.to === '' })[0]
    return (
      <React.Fragment>
        <nav
          className={
            !this.state.showMenu
              ? 'flex-display nav'
              : 'flex-display nav mb-active'
          }
        >
          <div className="nav-logo-container">
            <NavLink
              onClick={this.goToTop}
              style={{ display: 'flex', alignItems: 'center' }}
              to="/"
              id="home-link"
              text={
                <>
                  {imageElement} {nameElement}
                </>
              }
            />
          </div>
          <div
            className="nav-mobile-menu-btn mb-open"
            onClick={() => {
              this.setState({ showMenu: true })
            }}
            ref={this.openBtnRef}
          >
            MENU
          </div>
          <div
            className="nav-mobile-menu-btn mb-close"
            onClick={() => {
              this.setState({ showMenu: false })
            }}
          >
            <span>&#10005;</span>
          </div>
          <div className="nav-link-container">
            {userProfile && isSynapseSubdomainOrLocal && (  // mobile sign out
              <div className="center-content top-nav-button nav-button-signin">
                <button
                  id="signin-button"
                  className="SRC-primary-text-color-background signout-button-mb"
                  // @ts-ignore
                  onClick={() => resetSession()}
                >
                  SIGN OUT
                </button>
              </div>
            )}
            {!userProfile && isSynapseSubdomainOrLocal && (  // desktop sign in
              <div className="center-content top-nav-button nav-button-signin">
                <button
                  id="signin-button"
                  className="SRC-primary-text-color-background"
                  // @ts-ignore
                  onClick={onSignIn}
                >
                  SIGN&nbsp;IN
                </button>
                <Dialog
                  // @ts-ignore
                  onClose={handleCloseLoginDialog}
                  open={showLoginDialog}
                >
                  <SynapseComponents.Login
                    sessionCallback={() => getSession()}
                    theme={'light'}
                    icon={true}
                  />
                </Dialog>
              </div>
            )}

            {userProfile && isSynapseSubdomainOrLocal && (  // desktop version, show dropdown
              <>
                <Dropdown className="user-loggedIn">
                  <Dropdown.Toggle variant="light" id="user-menu-button">
                    <NavUserLink userProfile={ userProfile } />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="nav-user-menu portal-nav-menu">
                    <Dropdown.Item className="SRC-primary-background-color-hover SRC-nested-color border-bottom-1">
                      Signed in as&nbsp;<strong>{userProfile.userName}</strong>
                    </Dropdown.Item>
                    {this.synapseQuickLinks.map((el) => {
                      const borderBottomClass = el.hasBorder
                        ? 'border-bottom-1'
                        : ''
                      return (
                        <Dropdown.Item
                          key={el.text}
                          className={`SRC-primary-background-color-hover SRC-nested-color ${borderBottomClass}`}
                          href={`https://www.synapse.org/#!Profile:${
                            userProfile.ownerId
                          }${el.settingSubPath ? `/${el.settingSubPath}` : ''}`}
                        >
                          {el.text}
                        </Dropdown.Item>
                      )
                    })}
                    <Dropdown.Item  // desktop sign out
                      className="SRC-primary-background-color-hover SRC-nested-color"
                      // @ts-ignore
                      onClick={() => resetSession()}
                    >
                      Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <a className="user-loggedIn-mb"  // mobile version, shows the user icon and name, no dropdown
                  href={`https://www.synapse.org/#!Profile:${userProfile.ownerId}/projects/all`}
                >
                  <NavUserLink userProfile={ userProfile } />
                </a>
              </>
            )}
            <SynapseComponents.ShowDownload token={token} />
            {
              // we have to loop backwards due to css rendering of flex-direction: row-reverse
              routesConfig
                .slice()
                .reverse()
                .filter((el) => el.to !== '')
                .map((el) => {
                  const topLevelTo = el.to
                  let displayName = el.displayName ? el.displayName : topLevelTo
                  const icon = el.icon && (
                    <img style={{ padding: '0px 4px' }} src={el.icon} />
                  )
                  if (el.hideRouteFromNavbar) {
                    return false
                  }
                  // hide children and only show top level element if there is a nested route to hide
                  const hideChildren =
                    el.isNested &&
                    el.routes.some((route) => route.hideRouteFromNavbar)
                  if (el.isNested && !hideChildren) {
                    const isSelected = el.routes.some((route) => this.getLinkHref(route, topLevelTo, false) === decodeURIComponent(window.location.pathname))
                    const isSelectedCssClassName = isSelected ? 'isSelected' : ''
                    return (
                      <>
                        {el.routes.map((route) => {
                          const { to, link } = route
                          // Add anchors to the DOM for a crawler to find.  This is an attempt to fix an issue where all routes are Excluded from the index.
                          if (route.hideRouteFromNavbar) {
                            return false
                          }
                          const routeDisplayName = route.displayName ?? to
                          const linkDisplay = link ?? `/${topLevelTo}/${to}`
                          return (
                            <a
                              key={`${to}-seo-anchor`}
                              className="crawler-link"
                              href={linkDisplay}
                            >
                              {routeDisplayName}
                            </a>
                          )
                        })}
                        <Dropdown className={this.getBorder(topLevelTo)}>
                          <Dropdown.Toggle
                            variant="light"
                            id={`Navbar-dropdown-${displayName}`}
                            className={`nav-button-container top-nav-button ${isSelectedCssClassName}`}
                          >
                            {displayName}
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="portal-nav-menu">
                            {el.routes.map((route) => {
                              const { to } = route
                              if (route.hideRouteFromNavbar) {
                                return false
                              }
                              const routeDisplayName = route.displayName ?? to!
                              const linkDisplay = this.getLinkHref(route, topLevelTo, true)
                              return (
                                <Dropdown.Item key={to} as="li">
                                  <NavLink
                                    className="dropdown-item SRC-primary-background-color-hover SRC-nested-color"
                                    to={linkDisplay}
                                    text={routeDisplayName}
                                  />
                                </Dropdown.Item>
                              )
                            })}
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    )
                  }
                  const linkOrTo = el.link ?? `/${topLevelTo}`
                  const isSelectedCssClassName = decodeURIComponent(window.location.pathname) === linkOrTo ? 'isSelected' : ''
                  return (
                    <NavLink
                      key={topLevelTo}
                      className={`top-nav-button nav-button-container center-content ${isSelectedCssClassName} ${this.getBorder(
                        topLevelTo,
                      )}`}
                      to={linkOrTo}
                      target={el.target}
                      text={
                        <>
                          {icon} {displayName}
                        </>
                      }
                    />
                  )
                })
            }
            {
              // if theres less than 7 navbar items show the home page button
              routesConfig.filter((el) => !el.hideRouteFromNavbar).length <
                7 && (
                <Dropdown className={this.getBorder('')}>
                  <Dropdown.Toggle
                    variant="light"
                    id={'Navbar-dropdown-Home'}
                    className={`nav-button-container top-nav-button ${isHomeSelectedCssClassName}`}
                  >
                    Home
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="portal-nav-menu">
                    {homeRouteConfig.synapseConfigArray!.map((config, index) => {
                      const { title } = config
                      if (!title)
                        return
                      
                      return (
                        <Dropdown.Item key={title} as="li">
                          <NavLink
                          className="dropdown-item SRC-primary-background-color-hover SRC-nested-color"
                          text={title}
                          to={`/#${encodeURI(title)}`} />                          
                        </Dropdown.Item>
                      )
                    })}
                  </Dropdown.Menu>
                </Dropdown>                
              )
            }
          </div>
        </nav>
        <div className="spacer" />
      </React.Fragment>
    )
  }
}
Navbar.contextType = TokenContext
export default Navbar
