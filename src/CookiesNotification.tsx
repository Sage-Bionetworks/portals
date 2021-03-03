import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withCookies, ReactCookieProps } from 'react-cookie'
import Alert from 'react-bootstrap/Alert'

export type CookiesNotificationToken = {
  hasAgreedToCookies: boolean
}

type Props = RouteComponentProps & ReactCookieProps

const hasAgreedToCookiesKey =
  'org.sagebionetworks.security.cookies.portal.notification.okclicked'

class CookiesNotification extends React.Component<
  Props,
  CookiesNotificationToken
> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasAgreedToCookies: true,
    }
    this.setHasAgreedToCookies = this.setHasAgreedToCookies.bind(this)
  }

  componentDidMount() {
    const okClicked = this.props.cookies!.get(hasAgreedToCookiesKey)
    if (!okClicked) {
      this.setState({
        hasAgreedToCookies: false,
      })
    }
  }

  setHasAgreedToCookies() {
    this.setState({
      hasAgreedToCookies: true,
    })
    this.props.cookies!.set(hasAgreedToCookiesKey, true)
  }

  render() {
    // show banner if they haven't clicked okay, otherwise show nothing
    return this.state.hasAgreedToCookies ? (
      false
    ) : (
      <Alert
          variant="info"
          show={true}
          dismissible={false}
          transition={false}
          className="synapseAlert global bootstrap-4-backport"
        >
          <span className="fa-stack iconArea font-size-20"><i className="fa fa-circle iconBackground fa-stack-2x"></i><i className="fa iconForeground fa-stack-1x fa-info"></i></span>
          <span className="messageArea">
            <div><strong>Our site uses cookies.</strong></div>
            This website uses cookies to enhance your experience and to analyze our traffic. Using this website means that you agree with our cookie policy.
          </span>
          <a
            className="secondaryButton"
            target="_blank"
            rel="noopener noreferrer"
            href="https://s3.amazonaws.com/static.synapse.org/governance/SynapsePrivacyPolicy.pdf"
          >
            {' '}
            <u> LEARN MORE </u>
          </a>
          <button className="primaryButton pill btn btn-secondary" onClick={this.setHasAgreedToCookies}>
            ACCEPT AND CONTINUE
          </button>
        </Alert>
    )
  }
}

export default withRouter(withCookies(CookiesNotification))
