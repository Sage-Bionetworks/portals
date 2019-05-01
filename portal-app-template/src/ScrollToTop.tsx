import * as React from 'react'
import { withRouter } from 'react-router-dom'

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
class ScrollToTop extends React.Component {

  componentDidUpdate(prevProps: any) {
    // @ts-ignore
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}
// @ts-ignorex
export default withRouter(ScrollToTop)
