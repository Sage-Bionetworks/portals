import * as React from 'react'
import { withRouter } from 'react-router-dom'
import docTitleConfig from './example-configuration/docTitleConfig'
import { SynapseClient } from 'synapse-react-client'

export type AppInitializerProps = {
  location: any
}

class AppInitializer extends React.Component<AppInitializerProps, {}> {

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    if (document.title !== docTitleConfig.name) {
      document.title = docTitleConfig.name
    }
    SynapseClient.getSessionTokenFromCookie().then(
      (sessionToken) => {
        // TODO: Pass up token throughout application
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
    return this.props.children
  }
}

// @ts-ignore
export default withRouter(AppInitializer)
