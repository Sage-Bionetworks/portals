import { Link } from 'react-router-dom'
import * as React from 'react'
import routesConfig from './config/routesConfig'
import logoHeaderConfig from './config/logoHeaderConfig'
import Dialog from '@material-ui/core/Dialog'
import Dropdown from 'react-bootstrap/Dropdown'
// import Drawer from "@material-ui/core/Drawer";
import { SynapseComponents, SynapseConstants } from 'synapse-react-client'
import UserCard from 'synapse-react-client/dist/containers/UserCard'
import { TokenContext, SignInProps } from './AppInitializer'
import SvgIcon from '@material-ui/core/SvgIcon'
import './Navbar.scss'

type SynapseSettingLink = {
  text: string
  hasBorder?: boolean
  settingSubPath?: string
}

class Navbar extends React.Component<any, any> {
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
      showMenu: false
    }
  }

  // given the hash, decide if the link should have a bottom border
  getBorder = (name: string) => {
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

  handleClickOutside(e:Event) {
    const node = e.target as HTMLElement
    if (this.openBtnRef &&
        !((this.openBtnRef.current === node) ||
            (node?.closest(".dropdown-toggle")))) {
      this.setState({ showMenu: false })
    }
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

    return (
      <React.Fragment>
        <nav className={ !this.state.showMenu ? "flex-display nav" : "flex-display nav mb-active" }>
          <div className="nav-logo-container">
            <Link
              onClick={this.goToTop}
              style={{ display: 'flex', alignItems: 'center' }}
              to="/"
              id="home-link"
            >
              {imageElement} {nameElement}
            </Link>
          </div>
          <div
            className="nav-mobile-menu-btn mb-open"
            onClick={() => { this.setState({showMenu: true})}}
            ref={this.openBtnRef}
          >
            MENU
          </div>
          <div
            className="nav-mobile-menu-btn mb-close"
            onClick={() => { this.setState({showMenu: false})}}
          >
            <span>&#10005;</span>
          </div>
          <div className="nav-link-container">
            {!userProfile && isSynapseSubdomainOrLocal && (
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
            {userProfile && isSynapseSubdomainOrLocal && (
              <Dropdown className="user-loggedIn">
                <Dropdown.Toggle variant="light" id="user-menu-button">
                  <UserCard
                    userProfile={userProfile}
                    size={SynapseConstants.SMALL_USER_CARD}
                    preSignedURL={userProfile.clientPreSignedURL}
                    hideText={true}
                    link="javascript:void(0)"
                  />
                  <SvgIcon className="arrow-down">
                    {
                      // Material expand more svg https://material.io/tools/icons/?icon=expand_more&style=baseline
                    }
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                  </SvgIcon>
                  <div className="mb-user-extra">
                    <div className="user-fullname">{userProfile.firstName} {userProfile.lastName}</div>
                    <div><u>View Account</u></div>
                  </div>
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
                  <Dropdown.Item
                    className="SRC-primary-background-color-hover SRC-nested-color"
                    // @ts-ignore
                    onClick={() => resetSession()}
                  >
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <SynapseComponents.ShowDownload token={token} />
            {
              // we have to loop backwards due to css rendering of flex-direction: row-reverse
              routesConfig
                .slice()
                .reverse()
                .filter((el) => el.to !== '/')
                .map((el) => {
                  let displayName = el.displayName ? el.displayName : el.name
                  const icon = (
                    <img style={{ padding: '0px 4px' }} src={el.icon} />
                  )
                  if (el.hideRouteFromNavbar) {
                    return false
                  }
                  if (el.isNested) {
                    return (
                      <>
                        {el.routes.map((route) => {
                          // Add anchors to the DOM for a crawler to find.  This is an attempt to fix an issue where all routes are Excluded from the index.
                          if (route.hideRouteFromNavbar) {
                            return false
                          }
                          const routeDisplayName =
                            route.displayName || route.name
                          return (
                            <a
                              key={`${route.name}-seo-anchor`}
                              className="crawler-link"
                              href={`${route.to}`}
                            >
                              {routeDisplayName}
                            </a>
                          )
                        })}
                        <Dropdown className={this.getBorder(el.name)}>
                          <Dropdown.Toggle
                            variant="light"
                            id={displayName}
                            className="nav-button-container top-nav-button"
                          >
                            {displayName}
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="portal-nav-menu">
                            {el.routes.map((route) => {
                              if (route.hideRouteFromNavbar) {
                                return false
                              }
                              const routeDisplayName =
                                route.displayName || route.name
                              return (
                                <Dropdown.Item key={route.name} as="li">
                                  <Link
                                    className="dropdown-item SRC-primary-background-color-hover SRC-nested-color"
                                    to={route.to!}
                                  >
                                    {routeDisplayName}
                                  </Link>
                                </Dropdown.Item>
                              )
                            })}
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    )
                  }
                  // treat it as standard anchor tag
                  if (el.synapseConfigArray!.length === 0) {
                    return (
                      <Link
                        key={el.name}
                        className={`top-nav-button nav-button-container center-content ${this.getBorder(
                          el.name,
                        )}`}
                        to={el.to!}
                      >
                        {icon} {displayName}
                      </Link>
                    )
                  }
                  return (
                    <Link
                      key={el.name}
                      className={`top-nav-button nav-button-container center-content ${this.getBorder(
                        el.name,
                      )}`}
                      to={el.to!}
                    >
                      {displayName}
                    </Link>
                  )
                })
            }
            <Link
              key={'Home'}
              className={`nav-button nav-button-container center-content ${this.getBorder(
                '',
              )}`}
              to={'/'}
            >
              Home
            </Link>
          </div>
        </nav>
        <div className="spacer" />
      </React.Fragment>
    )
  }
}
Navbar.contextType = TokenContext
export default Navbar
