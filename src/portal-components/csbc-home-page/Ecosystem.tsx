import * as React from 'react'
import Layout from 'portal-components/Layout'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'

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
  const { config, title, subtitle, token } = props
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
            const { ownerId } = el
            return (
              <span
                key={el.title}
                className={`ecosystem-section ${
                  index === curIndex ? '' : 'hide'
                } `}
              >
                {ownerId && <MarkdownSynapse token={token} ownerId={ownerId} />}
                {el.icon && (
                  <>
                    <span className="connector" />
                    <span className="section-icon">
                      <img src={el.icon} alt="section-icon" />
                    </span>
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
