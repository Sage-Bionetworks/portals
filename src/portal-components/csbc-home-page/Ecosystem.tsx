import * as React from 'react'
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
}

const Ecosystem = (props: EcosystemProps) => {
  const [index, setIndex] = React.useState(0)
  const { config, token } = props
  return (
    <div className="Ecosystem">
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
    </div>
  )
}

export default Ecosystem
