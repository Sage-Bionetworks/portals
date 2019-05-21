import { Link } from 'react-router-dom'
import * as React from 'react'
import routesConfig from './config/routesConfig'
import { Route } from './types/portal-config'
import logoHeaderConfig from './config/logoHeaderConfig'
import Modal from '@material-ui/core/Modal'
import { SynapseComponents } from 'synapse-react-client'
import * as LoginUtils from './LoginUtils'

export type NavbarState = {
  [index:string]: any
}
export class Navbar extends React.Component<{}, NavbarState> {

  constructor(props: any) {
    super(props)
    const numNestedRoutes = routesConfig.filter(el => el.isNested).length
    const state: NavbarState = {
      numNestedRoutes,
      showLoginDialog: false,
      token: props.token
    }
    for (let i = 0; i < numNestedRoutes; i += 1) {
      state[`dropdown${i}`] = false
    }
    this.state = state
    this.onTokenChange = this.onTokenChange.bind(this)
  }

  // Toggle the dropdown menu, if index === -1 all the dropdown menus will close
  toggleDropdown = (index: number) => (_event: any) => {
    for (let i = 0; i < this.state.numNestedRoutes; i += 1) {
      const key = `dropdown${i}`
      if (index === -1) {
        this.setState({
          [key]: false,
          hasDropdownOpen: false
        })
      } else if (index === i) {
        this.setState({
          hasDropdownOpen: !this.state[key],
          [key]: !this.state[key]
        })
      }
    }
  }

  onSignIn = (event: any) => {
    console.log('TODO: show login dialog')
    this.setState({
      showLoginDialog: true
    })
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

  render() {
    const goToTop = (_event:any) => { window.scroll({ top: 0 }) }
    const { hasDropdownOpen } = this.state
    const toggleOff = this.toggleDropdown(-1)
    let currentNestedRouteCount = 0
    const { name, icon } = logoHeaderConfig
    const logo = name ? name : <img src={icon} />
    const { token } = this.state
    const { isUserDropdownOpen } = this.state
    return (
      <React.Fragment>
        <nav className="flex-display nav">
          {
            hasDropdownOpen
            &&
            <span onClick={toggleOff} className="menu-wall hand-cursor"/>
          }
          <div className="center-content nav-logo-container">
            {/* TODO - this may be an img tag which will require a change */}
            <Link onClick={goToTop} to="/" id="home-link"> {logo} </Link>
          </div>
          <div className="nav-link-container">
            {
              // sign in is the right-most item and shown when not logged in
              !token
              &&
              <div className="center-content nav-button">
                <button
                  id="signin-button"
                  className="SRC-primary-text-color-background"
                  onClick={this.onSignIn}
                >
                  SIGN&nbsp;IN
                </button>
                <Modal open={this.state.showLoginDialog}>
                  <SynapseComponents.Login
                      token={this.state.token}
                      theme={'light'}
                      icon={true}
                      authProvider={LoginUtils.AUTH_PROVIDER}
                      redirectURL={LoginUtils.getRootURL()}
                  />
                </Modal>
              </div>
            }
            {
              // user dropdown menu is the right-most item and shown when not logged in
              token
              &&
              <div className="center-content nav-button">
                <div className={`dropdown nav-button-container ${isUserDropdownOpen ? 'open' : ''}`}>
                    <Link
                      to="https://www.synapse.org/#!Profile:v/projects"
                      // tslint:disable-next-line:max-line-length
                      className="dropdown-link SRC-primary-background-color-hover SRC-nested-color center-content"
                    >
                      Projects
                    </Link>
                </div>
              </div>
            }
            {
              // we have to loop backwards due to css rendering of flex-direction: row-reverse
              routesConfig.slice().reverse().map(
                (el) => {
                  if (el.isNested) {
                    // handle the case when the menu has sub options
                    const plainRoutes = el.routes as Route []
                    const key = `dropdown${currentNestedRouteCount}`
                    const isCurrentDropdownOpen = this.state[key]
                    const toggleDropdown = this.toggleDropdown(currentNestedRouteCount)
                    currentNestedRouteCount += 1
                    return (
                      <div key={el.name} className={`dropdown nav-button-container ${isCurrentDropdownOpen ? 'open' : ''} ${this.getBorder(el.name)}`}>
                        {/* tslint:disable-next-line:max-line-length */}
                        <div onClick={toggleDropdown} className="center-content nav-button hand-cursor"> {el.name} </div>
                        {
                          isCurrentDropdownOpen &&
                            <div className="dropdown-menu">
                              {
                                plainRoutes.map(
                                  route => (
                                    <Link
                                      key={route.name}
                                      onClick={toggleDropdown}
                                      // tslint:disable-next-line:max-line-length
                                      className="dropdown-link SRC-primary-background-color-hover SRC-nested-color center-content"
                                      to={route.to}
                                    >
                                      {route.name}
                                    </Link>
                                  )
                                )
                              }
                            </div>
                        }
                      </div>
                    )
                  }
                  return (
                    <Link key={el.name} className={`center-content nav-button nav-button-container ${this.getBorder(el.name)}`} to={el.to}> {el.name} </Link>
                  )
                }
              )
            }
          </div>
        </nav>
        <div className="spacer"/>
      </React.Fragment>
    )
  }
}
