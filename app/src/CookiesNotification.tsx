import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withCookies, ReactCookieProps } from 'react-cookie'

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

  setHasAgreedToCookies(_event: React.SyntheticEvent<HTMLButtonElement>) {
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
      <div className="cookiesBanner">
        This site uses Cookies to enhance your experience and to analyze our
        traffic. Using this website means that you agree with our cookie policy.
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://s3.amazonaws.com/static.synapse.org/governance/SynapsePrivacyPolicy.pdf"
        >
          {' '}
          <u> LEARN MORE </u>
        </a>
        <button
          className="btn btn-default btn-small"
          onClick={this.setHasAgreedToCookies}
        >
          {' '}
          OK{' '}
        </button>
      </div>
    )
  }
}

export default withRouter(withCookies(CookiesNotification))
