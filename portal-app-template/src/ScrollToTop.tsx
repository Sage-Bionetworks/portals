import * as React from 'react'
import { withRouter } from 'react-router-dom'

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
class ScrollToTop extends React.Component {

  // TODO: GRAB TOKEN, Change name -- AppInitializer

  componentDidUpdate(prevProps: any) {
    // @ts-ignore
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    // if (document.title !== docTitleConfig.name) {
    //   document.title = docTitleConfig.name
    // }
    return this.props.children
  }
}
// @ts-ignorex
export default withRouter(ScrollToTop)
