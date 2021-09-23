import * as React from 'react'
import { Tabs, Tab } from '@material-ui/core'
import { useShowDesktop } from 'utils'
export type NamedRoute = {
  name: string
}

export type RouteControlProps = {
  handleChanges: (text: string, index: number) => void
  isSelected: (name: string) => boolean
  customRoutes: string[]
}

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

  if (isMobileView) {
    return (
      <nav className="flex-display nav explore-nav">
        {customRoutes.map((name, index) => {
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
      </nav>
    )
  }
  return (
    <Tabs
      value={customRoutes.find((name) => isSelected(name))}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="Explore Sections"
      className="flex-display nav explore-nav"
    >
      {customRoutes.map((name, index) => {
        return (
          <Tab
            key={name}
            label={<div className={`explore-nav-button-text `}>{name}</div>}
            className={`nav-button nav-button-container center-content ${setActiveClass(
              isSelected(name),
            )}`}
            disableRipple={true}
            disableTouchRipple
            onClick={() => handleChanges(name, index)}
          />
        )
      })}
    </Tabs>
  )
}
