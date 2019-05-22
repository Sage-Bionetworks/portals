import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import docTitleConfig from './config/docTitleConfig'
import { SynapseClient } from 'synapse-react-client'

export type AppInitializerToken = {
  token: string
}

export const TokenContext = React.createContext('')

class AppInitializer extends React.Component<RouteComponentProps, AppInitializerToken> {

  constructor(props: any) {
    super(props)
    this.state = {
      token: ''
    }
  }

  componentDidMount() {
    if (document.title !== docTitleConfig.name) {
      document.title = docTitleConfig.name
    }
    SynapseClient.getSessionTokenFromCookie().then(
      (sessionToken) => {
        this.setState({ token: sessionToken })
      }
    ).catch((_err) => {
      console.log('no token from cookie could be fetched ', _err)
    })
  }

  componentDidUpdate(prevProps: any) {
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return (
      <TokenContext.Provider value={this.state.token}>
        {this.props.children}
      </TokenContext.Provider>
    )
  }
}

export default withRouter(AppInitializer)
