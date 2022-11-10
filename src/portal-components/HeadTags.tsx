import Helmet from "react-helmet"
import docTitleConfig from '../config/docTitleConfig'
import logoHeaderConfig from '../config/logoHeaderConfig'
import * as React from 'react'

export const HeadTags = () => {
    const title = docTitleConfig.name
    const metaDescription = docTitleConfig.description
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" key="description" content={metaDescription} />
            <meta name="title" key="title" content={title} />
            <meta property="og:title" key="og:title" content={title} />
            <meta property="og:locale" key="og:locale" content="en_US" />
            <meta charSet="utf-8" />
            <meta property="og:type" key="og:type" content="website" />
            <meta
                property="og:description"
                key="og:description"
                content={metaDescription}
            />
            <meta
                property="og:image"
                key="og:image"
                content={logoHeaderConfig.icon}
            />
        </Helmet>
  )}