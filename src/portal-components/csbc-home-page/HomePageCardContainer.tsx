import * as React from 'react'
import HomePageCard, { HomePageCardProps } from './HomePageCard'

export type HomePageCardContainerProps = {
  cardProps: HomePageCardProps[]
  token?: string
}

const HomePageCardContainer = (props: HomePageCardContainerProps) => {
  const { cardProps, token } = props
  return (
    <div className="HomePageCardContainer">
      <div className="card-row">
        {cardProps.map((el, index) => (
          <HomePageCard token={token} key={`${el.ownerId} ${index} `} {...el} />
        ))}
      </div>
    </div>
  )
}

export default HomePageCardContainer
