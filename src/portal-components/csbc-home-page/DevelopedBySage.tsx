import * as React from 'react'
import { ReactComponent as SageLogo } from './assets/sage-logo.svg'

const DevelopedBySage = () => {
  return (
    <div className="developed-by-sage" style={{ textAlign: 'center' }}>
      <p>
        This Portal was developed by
        <a
          className="SRC-primary-text-color SRC-boldText"
          href="https://sagebionetworks.org/"
        >
          &nbsp;Sage Bionetworks&nbsp;
        </a>
        and is part of the
        <a
          className="SRC-primary-text-color SRC-boldText"
          href="https://synapse.org"
        >
          &nbsp;Sage Platform.&nbsp;
        </a>
      </p>
      <p>
        Use of this Portal is governed by the
        <a
          className="SRC-primary-text-color SRC-boldText"
          href="https://s3.amazonaws.com/static.synapse.org/governance/SageBionetworksSynapseTermsandConditionsofUse.pdf?v=5"
        >
          &nbsp;Terms and Conditions.
        </a>
        .
      </p>
      <SageLogo id="sage-logo" />
    </div>
  )
}

export default DevelopedBySage
