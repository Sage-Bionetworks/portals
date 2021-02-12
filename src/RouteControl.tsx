import * as React from 'react'

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
  return (
    <nav className="flex-display nav explore-nav">
      {customRoutes.map((name, index) => {
        const handleClick = () => handleChanges(name, index)
        return (
          <button onClick={handleClick} key={name} className={`top-nav-button nav-button-container center-content ${setActiveClass(isSelected(name))}`}>
            {name}
          </button>
        )
      })}
    </nav>
  )
}
