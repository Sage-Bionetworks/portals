import * as React from 'react'

export type NamedRoute = {
  name: string
}

export type ButtonControlProps = {
  handleChanges: (text: string, index: number) => void
  isSelected: (name: string) => boolean
  customRoutes: NamedRoute []
  colors: string []
}

export const ButtonControl: React.FunctionComponent<ButtonControlProps> = ({ handleChanges, isSelected, customRoutes, colors }) => {
  const setActiveClass = (isSelected: boolean) => isSelected ? 'active-button' : ''
  return (
    <div className="explore-buttons">
      {
        customRoutes.map(
          (el, index) => {
            const handleClick = () => handleChanges(el.name, index)
            // have to set borderTopColor so that the pseudo element triangle can inherit
            // the color of the button
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
