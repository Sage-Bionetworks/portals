import * as React from 'react'
import { HomePageCardProps } from './HomePageCard'
import HomePageCardContainer from './HomePageCardContainer'

export type AboutPortalProps = {
  token?: string
  cardProps: HomePageCardProps[]
}

const AboutPortal = (props: AboutPortalProps) => {
  const { cardProps, token} = props
  return (
    <div className="AboutPortal">
      <div>
        <HomePageCardContainer cardProps={cardProps} token={token} />
      </div>
    </div>
  )
}

export default AboutPortal
