import * as React from 'react'
import { Link } from 'react-router-dom'
import './style/_home-page-links.scss'

type LinkProps = {
  text: string
  to: string
}

const links: LinkProps[] = [
  {
    text: 'Data',
    to: 'Explore/Data',
  },
  {
    text: 'Methods',
    to: 'Explore/Methods',
  },
  {
    text: 'Insights',
    to: 'Explore/Insights',
  },
  {
    text: 'Activity',
    to: 'Explore/Activity',
  },
  {
    text: 'People',
    to: 'Explore/People',
  },
]
const PortalHomePageLinks = () => {
  return (
    <div className="HomePageLinks">
      {links.map(el => {
        return (
          <Link className="link" key={el.text} to={el.to}>
            {el.text}
          </Link>
        )
      })}
    </div>
  )
}

export default PortalHomePageLinks
