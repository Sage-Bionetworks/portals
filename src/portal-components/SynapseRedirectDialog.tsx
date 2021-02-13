import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'

export type SynapseRedirectDialogProps = {
  synapseRedirectUrl?: string  
}

const SynapseRedirectDialog = (props: SynapseRedirectDialogProps) => {
  const [countdownSeconds, setCountdownSeconds] = React.useState(10)
  const {synapseRedirectUrl} = props
  React.useEffect(() => {
    if (synapseRedirectUrl) {
      // You would expect that we should redirect when countdownSeconds reaches 0,
      // but it actually takes about a second to perform the redirect. 
      // So let's start the process when we get to 1.
      if (countdownSeconds <= 1) {
        window.location.assign(synapseRedirectUrl!)
      }
      setTimeout(() => {
        setCountdownSeconds(countdownSeconds => countdownSeconds - 1)
      }, 1000)
    }     
  }, [synapseRedirectUrl, countdownSeconds])
  
  return ( 
    <>
      {synapseRedirectUrl && (<Dialog
            open={synapseRedirectUrl ? true : false}
          >
            <div className="redirect-dialog-body">
              <h4>Hang tight!</h4>
              <p>You are being redirected to Synapse to view this data.<br/>
              You will be redirected in <strong>{countdownSeconds} seconds</strong></p>
            </div>
            <div className="redirect-dialog-footer">
              <img
                className="synapse-logo-image"
                src="https://www.synapse.org/images/logo.svg"
                alt=""
              />
              <h3 className="synapse-logo-text">SYNAPSE</h3>
              <img
                className="synapse-hero-image"
                src="https://s3.amazonaws.com/static.synapse.org/images/homepage-composite.svg"
                alt=""
              />
            </div>            
        </Dialog>)
      }
    </>
  )
}

export default SynapseRedirectDialog
