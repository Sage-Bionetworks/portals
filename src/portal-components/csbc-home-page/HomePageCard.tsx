import * as React from 'react'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'

export type HomePageCardProps = {
  ownerId: string
  wikiId?: string
  token?: string
}

const HomePageCard = (props: HomePageCardProps) => {
  const { ownerId, wikiId, token } = props
  return (
    <div className="HomePageCard">
      <MarkdownSynapse token={token} ownerId={ownerId} wikiId={wikiId} />
    </div>
  )
}

export default HomePageCard
