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
        <div className="control-container">
          <div className="button-container">
            {config.map((el, curIndex) => {
              return (
                <button
                  className={index === curIndex ? 'isSelected' : ''}
                  onClick={() => setIndex(curIndex)}
                  key={el.title}
                >
                  {' '}
                  {el.title}{' '}
                </button>
              )
            })}
          </div>
          <div className="content-container">
            {config.map((el, curIndex) => {
              return (
                <span
                  key={el.title}
                  className={index === curIndex ? '' : 'hide'}
                >
                  <MarkdownSynapse
                    ownerId={el.ownerId}
                    wikiId={el.wikiId}
                    token={token}
                  />
                </span>
              )
            })}
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Ecosystem
