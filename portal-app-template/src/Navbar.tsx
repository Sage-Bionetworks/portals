import { Link } from 'react-router-dom'
import * as React from 'react'
import routes from './example-configuration/routes'

export type NavbarState = {
  [index:string]: boolean | number
}
export class Navbar extends React.Component<{}, NavbarState> {

  constructor(props: any) {
    super(props)
    const numNestedRoutes = routes.filter(el => el.isNested).length
    const state: NavbarState = {
      numNestedRoutes
    }
    for (let i = 0; i < numNestedRoutes; i += 1) {
      state[`dropdown${i}`] = false
    }
    this.state = state
  }

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

  // given the hash, decide if the link should have a bottom border
  getBorder = (path: string) => {
    if (path === '') {
      // special case the home page
      return window.location.hash === '/#'
    }
    const hash = window.location.hash.substring(2)
    return hash.includes(path) ? 'bottom-border' : ''
  }

  render() {
    const goToTop = (_event:any) => { window.scroll({ top: 0 }) }
    const { hasDropdownOpen } = this.state
    const toggleOff = this.toggleDropdown(-1)
    let currentNestedRouteCount = 0
    return (
      <React.Fragment>
        <nav className="flex-display nav">
          {
            hasDropdownOpen
            &&
            <span onClick={toggleOff} className="menu-wall hand-cursor"/>
          }
          <div className="center-content nav-logo-container">
            <Link onClick={goToTop} to="/" id="home-link"> ICON </Link>
          </div>
          <div className="nav-link-container">
            {
              routes.map(
                (el) => {
                  if (el.isNested) {
                    const key = `dropdown${currentNestedRouteCount}`
                    const isCurrnetDropdownOpen = this.state[key]
                    const toggleDropdown = this.toggleDropdown(currentNestedRouteCount)
                    currentNestedRouteCount += 1
                    return (
                      <div key={el.name} className={`dropdown ${isCurrnetDropdownOpen ? 'open' : ''} ${this.getBorder(el.name)}`}>
                        {/* tslint:disable-next-line:max-line-length */}
                        <div onClick={toggleDropdown} className="center-content nav-button hand-cursor"> {el.name} </div>
                        {
                          isCurrnetDropdownOpen &&
                            <div className="dropdown-menu">
                              {
                                el.routes.map(
                                  route => (
                                    <Link
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
                    <Link key={el.name} className={`center-content nav-button ${this.getBorder('')}`} to={el.to}> {el.name} </Link>
                  )
                }
              )
            }
            <Link className={`center-content nav-button ${this.getBorder('')}`} to="/"> Home </Link>
          </div>
        </nav>
        <div className="spacer"/>
      </React.Fragment>
    )
  }
}
