import * as React from 'react'
import './style/_ecosystem.scss'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'
import Layout from 'portal-components/Layout'

type Config = {
  ownerId: string
  wikiId?: string
  title: string
  icon?: string
}

export type EcosystemProps = {
  config: Config[]
  token?: string
  title: string
  subtitle: string
}

const Ecosystem = (props: EcosystemProps) => {
  const [index, setIndex] = React.useState(0)
  const { config, token, title, subtitle } = props
  return (
    <div className="Ecosystem">
      <Layout>
        <h2 className="header">{title}</h2>
        <p className="subtitle">{subtitle}</p>
        <div className="ecosystem-headers-container">
          {config.map((el, curIndex) => {
            return (
              <button
                onClick={() => setIndex(curIndex)}
                className={`ecosystem-button ${
                  index === curIndex ? 'selected' : ''
                } `}
                key={el.title}
              >
                {el.title}
              </button>
            )
          })}
        </div>
        <div className="ecosystem-content">
          {config.map((el, curIndex) => {
            return (
              <span
                key={el.title}
                className={`ecosystem-section ${
                  index === curIndex ? '' : 'hide'
                } `}
              >
                <MarkdownSynapse
                  token={token}
                  // ownerId={el.ownerId}
                  // wikiId={el.wikiId}
                  markdown={''}
                />
                {el.icon && (
                  <>
                    <span className="connector" />
                    <img src={el.icon} alt="section-icon" />
                  </>
                )}
              </span>
            )
          })}
        </div>
      </Layout>
    </div>
  )
}

export default Ecosystem
