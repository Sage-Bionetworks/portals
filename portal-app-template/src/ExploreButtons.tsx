import * as React from 'react'
import { exploreSynapseConfigs } from './example-configuration/explore'

type HandleChanges = (text: string) => void
type ExploreButtonProps = {
  handleChanges: HandleChanges
  isSelected: (val: string) => boolean
}

export const ExploreButtons: React.SFC<ExploreButtonProps> = ({ handleChanges, isSelected }) => {
  const setActiveClass = (isSelected: boolean) => isSelected ? 'active-button' : ''
  return (
    <div className="explore-buttons">
      {
        Object.keys(exploreSynapseConfigs).map(
          (el) => {
            if (el === 'default') {
              // special case this, its not an intentional key
              return false
            }
            const handleClick = () => handleChanges(el)
            return (
              <button key={el} className={`${setActiveClass(isSelected(el))}`} onClick={handleClick}>
                {el}
              </button>
            )
          }
        )
      }
    </div>
  )
}
