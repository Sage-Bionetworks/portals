import * as React from 'react'
import { BarLoader } from 'react-spinners'

const loadingScreen = (
  <div className="bar-loader">
    <BarLoader color="#47337D" loading={true} />
  </div>
)

export default loadingScreen
