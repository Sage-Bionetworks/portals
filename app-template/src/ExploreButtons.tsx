import * as React from 'react'

export type NamedRoute = {
  name: string
}

export type ExploreButtonProps = {
  handleChanges: (text: string, index: number) => void
  isSelected: (name: string) => boolean
  customRoutes: NamedRoute []
  colors: string []
}

export const ExploreButtons: React.FunctionComponent<ExploreButtonProps> = ({ handleChanges, isSelected, customRoutes, colors }) => {
  const setActiveClass = (isSelected: boolean) => isSelected ? 'active-button' : ''
  if (customRoutes) {
    return (
      <div className="explore-buttons">
        {
          customRoutes.map(
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
