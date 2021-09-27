import * as React from 'react'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'

export type HomePageCardProps = {
  ownerId: string
  wikiId?: string
}

const HomePageCard = (props: HomePageCardProps) => {
  const { ownerId, wikiId } = props
  return (
    <div className="HomePageCard">
      <MarkdownSynapse ownerId={ownerId} wikiId={wikiId} />
    </div>
  )
}

export default HomePageCard
