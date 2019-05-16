import * as React from 'react'
import routesConfig from './config/routesConfig'
import { GenericRoute, NestedRoute } from './types/portal-config'

type Element = {
  name: string
}

type ExploreButtonProps = {
  handleChanges: (text: string, index: number) => void
  isSelected: (name: string) => boolean
  customRoutes?: Element []
  colors: string []
}

export const ExploreButtons: React.FunctionComponent<ExploreButtonProps> = ({ handleChanges, isSelected, customRoutes = undefined, colors }) => {
  const setActiveClass = (isSelected: boolean) => isSelected ? 'active-button' : ''
  const exploreRoute = routesConfig.find(el => el.name === 'Explore') as NestedRoute
  const usedRoutes = customRoutes ? customRoutes : exploreRoute.routes
  if (colors.length !== usedRoutes.length) {
    throw Error('Explore buttons require that colors.length equal the number of buttons rendered to the screen')
  }
  if (usedRoutes) {
    return (
      <div className="explore-buttons">
        {
          usedRoutes.map(
            (el, index) => {
              const handleClick = () => handleChanges(el.name, index)
              const style = { background: colors[index], borderTopColor: colors[index] }
              return (
                <button
                  style={style}
                  key={el.name}
                  className={`${setActiveClass(isSelected(el.name))}`}
                  onClick={handleClick}
                >
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
