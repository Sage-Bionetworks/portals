import * as React from 'react'
import { HomePageCardProps } from './HomePageCard'
import HomePageCardContainer from './HomePageCardContainer'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'

export type AboutPortalProps = {
  title: string
  token?: string
  cardProps: HomePageCardProps[]
  ownerId?: string
  wikiId?: string
}

const AboutPortal = (props: AboutPortalProps) => {
  const { cardProps, title, token, ownerId, wikiId } = props
  return (
    <div className="AboutPortal">
      <h2>{title}</h2>
      <MarkdownSynapse token={token} ownerId={ownerId} wikiId={wikiId} />
      <div>
        <HomePageCardContainer cardProps={cardProps} token={token} />
      </div>
    </div>
  )
}

export default AboutPortal
