import * as React from 'react'
import routesConfig from './configuration/routesConfig'

type ExploreButtonProps = {
  handleChanges: (text: string, index: number) => void
  isSelected: (name: string) => boolean
}

export const ExploreButtons: React.FunctionComponent<ExploreButtonProps> = ({ handleChanges, isSelected }) => {
  const setActiveClass = (isSelected: boolean) => isSelected ? 'active-button' : ''
  const exploreRoute = routesConfig.find(el => el.name === 'Explore')
  if (exploreRoute && exploreRoute.isNested) {
    const routes = exploreRoute.routes
    return (
      <div className="explore-buttons">
        {
          routes.map(
            (el, index) => {
              const handleClick = () => handleChanges(el.name, index)
              return (
                <button key={el.name} className={`${setActiveClass(isSelected(el.name))}`} onClick={handleClick}>
                  {el.name}
                </button>
              )
            }
          )
        }
      </div>
    )
  }
  return (<div />)
}
