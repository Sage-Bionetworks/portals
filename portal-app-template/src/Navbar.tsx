import { Link } from 'react-router-dom'
import * as React from 'react'
import routes from './example-configuration/routes'

// tslint:disable-next-line:function-name
export function Navbar() {

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  function toggleDropdown(_event: any) {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // given the hash, decide if the link should have a bottom border
  const getBorder = (path: string) => {
    if (path === '') {
      // special case the home page
      return window.location.hash === '/#'
    }
    const hash = window.location.hash.substring(2)
    return hash.includes(path) ? 'bottom-border' : ''
  }

  const goToTop = (_event:any) => { window.scroll({ top: 0 }) }
  return (
    <React.Fragment>
      <nav className="flex-display nav">
        {
          isDropdownOpen
          &&
          <span onClick={toggleDropdown} className="menu-wall hand-cursor"/>
        }
        <div className="center-content nav-logo-container">
          <Link onClick={goToTop} to="/" id="home-link"> ICON </Link>
        </div>
        <div className="nav-link-container">
          {
            routes.map(
              (el) => {
                if (el.isNested) {
                  return (
                    <div className={`dropdown ${isDropdownOpen ? 'open' : ''} ${getBorder(el.name)}`}>
                      <div onClick={toggleDropdown} className="center-content nav-button hand-cursor"> {el.name} </div>
                      {
                        isDropdownOpen &&
                          <div className="dropdown-menu">
                            {
                              el.routes.map(
                                route => (
                                  <Link
                                    onClick={toggleDropdown}
                                    // tslint:disable-next-line:max-line-length
                                    className="dropdown-link SRC-primary-background-color-hover SRC-nested-color center-content"
                                    to="/Explore/Grants"
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
                  <Link key={el.name} className={`center-content nav-button ${getBorder('')}`} to={el.to}> {el.name} </Link>
                )
              }
            )
          }
          <Link className={`center-content nav-button ${getBorder('')}`} to="/"> Home </Link>
        </div>
      </nav>
      <div className="spacer"/>
    </React.Fragment>
  )
}
