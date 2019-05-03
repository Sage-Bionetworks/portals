import * as React from 'react'
import routesConfig from './example-configuration/routesConfig'
import { ExploreNestedRoute } from './types/portal-config'

type ExploreButtonProps = {
  handleChanges: (text: string, index: number) => void
  isSelected: (val: string) => boolean
}

export const ExploreButtons: React.SFC<ExploreButtonProps> = ({ handleChanges, isSelected }) => {
  const setActiveClass = (isSelected: boolean) => isSelected ? 'active-button' : ''
  // TODO: Configure routes type to enforce there to be at least one ExploreRoute object
  const exploreRoute: ExploreNestedRoute = routesConfig.find(el => el.name === 'Explore') as ExploreNestedRoute
  return (
    <div className="explore-buttons">
      {
        exploreRoute.routes.map(
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
