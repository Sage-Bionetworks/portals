import * as React from 'react'
import { BarLoader } from 'react-spinners'

const loadingScreen = (
  <div className="bar-loader">
    <BarLoader color="#47357B" loading={true} />
  </div>
)

export default loadingScreen
