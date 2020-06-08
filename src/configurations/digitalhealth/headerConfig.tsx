import * as React from 'react'
import { HomePageHeaderConfig } from 'types/portal-config'
import { ReactComponent as HeaderImg } from './style/dna_header.svg'

const homePageHeader: HomePageHeaderConfig = {
  title: 'Welcome to the dHealth Digital Health Data Portal',
  summary: (
    <>
      Discover and download digital and mobile health data, tools, and
      benchmarked outcomes and digital biomarkers.
      <br />
      <br />
      Supported by SAGE BIONETWORKS
    </>
  ),
  showBlur: true,
  HeaderSvg: HeaderImg, // need's to be direct svg import for proper scaling
}

export default homePageHeader
