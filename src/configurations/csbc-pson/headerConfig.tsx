import * as React from 'react'
import { HomePageHeaderConfig } from 'types/portal-config'

const style: React.CSSProperties = {
  color: 'white',
  textDecoration: 'underline',
}
const homePageHeader: HomePageHeaderConfig = {
  summary: (
    <>
      Discover and download data and analysis from the NIH National&nbsp;
      <a style={style} href="https://csbconsortium.org/">
        Cancer Institute-sponsored Cancer Systems Biology Consortium (CSBC)
      </a>
      &nbsp; and &nbsp;
      <a style={style} href="https://physics.cancer.gov/">
        Physical Sciences in Oncology Network (PS-ON).
      </a>
    </>
  ),
  title:
    'Welcome to the Cancer Systems Biology Consortium and Physical Sciences in Oncology Network Portal',
  showBlur: false,
  centerText: true,
}

export default homePageHeader
