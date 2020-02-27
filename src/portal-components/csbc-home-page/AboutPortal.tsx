import * as React from 'react'
import { HomePageCardProps } from './HomePageCard'
import HomePageCardContainer from './HomePageCardContainer'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'

export type AboutPortalProps = {
  title: string
  token?: string
  cardProps: HomePageCardProps[]
  logos: string[]
  ownerId?: string
  wikiId?: string
}

const AboutPortal = (props: AboutPortalProps) => {
  const { cardProps, title, token, logos, ownerId, wikiId } = props
  const [hideContent, setHideContent] = React.useState(true)
  return (
    <div className="AboutPortal">
      <h2>{title}</h2>
      <div className="logo-container">
        {logos.map((el, index) => (
          <img key={index} alt="funder-icon" src={el} />
        ))}
      </div>
      <MarkdownSynapse token={token} ownerId={ownerId} wikiId={wikiId} />
      <div className={`box-shadow  ${hideContent ? 'hide' : ''}`}>
        <HomePageCardContainer cardProps={cardProps} token={token} />
      </div>
      <button
        className="show-button"
        onClick={() => setHideContent(!hideContent)}
      >
        Show {hideContent ? 'More' : 'Less'}
      </button>
    </div>
  )
}

export default AboutPortal
