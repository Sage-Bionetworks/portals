import * as React from 'react'

type HandleChanges = (text: string) => void
type ExploreButtonProps = {
  handleChanges: HandleChanges
  isSelected: (val: string) => boolean
}

export const ExploreButtons: React.SFC<ExploreButtonProps> = ({ handleChanges, isSelected }) => {

  const handleGrants = () => handleChanges('Grants')
  const handlePublications = () => handleChanges('Publications')
  const handleStudies = () => handleChanges('Studies')
  const handleData = () => handleChanges('Data')
  const handleDatasets = () => handleChanges('Datasets')
  const setActiveClass = (isSelected: boolean) => isSelected ? 'active-button' : ''
  return (
    <div className="explore-buttons">
      <button className={`${setActiveClass(isSelected('Grants'))}`} onClick={handleGrants}>
        Grants
      </button>
      <button className={setActiveClass(isSelected('Publications'))} onClick={handlePublications}>
      Publications
      </button>
      <button className={setActiveClass(isSelected('Studies'))} onClick={handleStudies}>
        Studies
      </button>
      <button className={setActiveClass(isSelected('Datasets'))} onClick={handleDatasets}>
        Datasets
      </button>
      <button className={setActiveClass(isSelected('Files'))} onClick={handleData}>
        Data
      </button>
    </div>
  )
}
