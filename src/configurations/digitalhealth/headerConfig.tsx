import * as React from 'react'
import { HomePageHeaderConfig } from 'types/portal-config'
import { ReactComponent as HeaderImg } from './style/dna_header.svg'

const homePageHeader: HomePageHeaderConfig = {
  summary: <>Description of Digital Health portal in headerConfig.tsx</>,
  title: 'Welcome to the Digital Health Portal',
  showBlur: true,
  HeaderSvg: HeaderImg, // need's to be direct svg import for proper scaling
}

export default homePageHeader
