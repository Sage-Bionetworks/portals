import * as React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useShowDesktop } from 'utils'

export type NamedRoute = {
  name: string
}

export type RouteControlProps = {
  handleChanges: (text: string, index: number) => void
  isSelected: (name: string) => boolean
  customRoutes: string[]
}

const MAX_ROUTES_TO_SHOW = 7

export const RouteControl: React.FunctionComponent<RouteControlProps> = ({
  handleChanges,
  isSelected,
  customRoutes,
}) => {
  const setActiveClass = (isSelected: boolean) =>
    isSelected ? 'isSelected' : ''

  const isMobileView = !useShowDesktop()

  /**
   * In the Desktop (non-mobile) view, we limit the number of routes to show
   */
  let customRoutesToShow: string[]
  if (isMobileView || customRoutes.length <= MAX_ROUTES_TO_SHOW) {
    customRoutesToShow = customRoutes
  } else {
    // We should always show the active route, so we need to get its index
    const indexOfActiveRoute = customRoutes.findIndex((name) =>
      isSelected(name),
    )
    customRoutesToShow = customRoutes.filter((route, index) => {
      if (indexOfActiveRoute < MAX_ROUTES_TO_SHOW - 1) {
        // If the active route is in the first n-1 items, then we should show the first n-1 items
        return index < MAX_ROUTES_TO_SHOW - 1
      } else {
        // If the active route is NOT in the first n-1 items, then we should show the first n-2 items and the active route
        return index < MAX_ROUTES_TO_SHOW - 2 || isSelected(route)
      }
    })
  }
  const customRoutesInDropdown = customRoutes.filter(
    (route) => !customRoutesToShow.includes(route),
  )

  return (
    <nav className="flex-display nav explore-nav">
      {customRoutesToShow.map((name, index) => {
        const handleClick = () => handleChanges(name, index)
        return (
          <button
            onClick={handleClick}
            key={name}
            className={`nav-button nav-button-container center-content ${setActiveClass(
              isSelected(name),
            )}`}
          >
            {name}
          </button>
        )
      })}
      {customRoutesInDropdown.length > 0 && (
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            className="nav-button nav-button-container"
          >
            {' '}
            More
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {customRoutesInDropdown.map((name, index) => {
              const handleClick = () => handleChanges(name, index)
              return (
                <Dropdown.Item
                  onClick={handleClick}
                  key={name}
                  className={`nav-button nav-button-container`}
                >
                  {name}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </nav>
  )
}
