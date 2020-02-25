import * as React from 'react'
import HomePageCard, { HomePageCardProps } from './HomePageCard'
import './style/_home-page-card-container.scss'

export type HomePageCardContainerProps = {
  cardProps: HomePageCardProps[]
  token?: string
}

const HomePageCardContainer = (props: HomePageCardContainerProps) => {
  const { cardProps, token } = props
  return (
    <div className="HomePageCardContainer">
      <div className="card-row">
        {cardProps.slice(0, cardProps.length / 2).map((el, index) => (
          <HomePageCard token={token} key={`${el.ownerId} ${index} `} {...el} />
        ))}
      </div>
      <div className="card-row">
        {cardProps
          .slice(cardProps.length / 2, cardProps.length)
          .map((el, index) => (
            <HomePageCard
              token={token}
              key={`${el.ownerId} ${index} `}
              {...el}
            />
          ))}
      </div>
    </div>
  )
}

export default HomePageCardContainer
