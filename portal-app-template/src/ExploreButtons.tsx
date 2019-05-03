import * as React from 'react'
import routes from './example-configuration/routes'
import { ExploreRoute } from './types/portal-config'

type HandleChanges = (text: string) => void
type ExploreButtonProps = {
  handleChanges: HandleChanges
  isSelected: (val: string) => boolean
}

export const ExploreButtons: React.SFC<ExploreButtonProps> = ({ handleChanges, isSelected }) => {
  const setActiveClass = (isSelected: boolean) => isSelected ? 'active-button' : ''
  // TODO: Configure routes type to enforce there to be at least one ExploreRoute object
  const exploreRoute: ExploreRoute = routes.find(el => el.name === 'Explore') as ExploreRoute
  return (
    <div className="explore-buttons">
      {
        exploreRoute.routes.map(
          (el) => {
            const handleClick = () => handleChanges(el.name)
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
