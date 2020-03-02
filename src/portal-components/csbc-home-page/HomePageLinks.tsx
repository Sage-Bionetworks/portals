import * as React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AcivityIconSvg } from './assets/activity-icon.svg'
import { ReactComponent as DataIconSvg } from './assets/data-icon.svg'
import { ReactComponent as InsightIconSvg } from './assets/insight-icon.svg'
import { ReactComponent as MethodsIconSvg } from './assets/methods-icon.svg'
import { ReactComponent as PeopleIconSvg } from './assets/people-icon.svg'

type LinkProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  description: string
  title: string
  linkText: string
  to: string
}

const links: LinkProps[] = [
  {
    title: 'Data',
    icon: AcivityIconSvg,
    description:
      'Data with which researchers can develop, validate, or apply their methods',
    linkText: 'Explore Data',
    to: 'Explore/Data',
  },
  {
    title: 'Methods',
    icon: DataIconSvg,
    description:
      'Methods or tools that researchers can use, adapt, and improve',
    linkText: 'Explore Methods',
    to: 'Explore/Methods',
  },
  {
    title: 'Insights',
    icon: InsightIconSvg,
    description:
      'Lessons learned from existing data and methods, either in the form of publications or dynamic, summary visualizations that can quickly answer basic questions',
    linkText: 'Explore Insights',
    to: 'Explore/Insights',
  },
  {
    title: 'Activity',
    icon: MethodsIconSvg,
    description:
      'A record of which researchers have contributed to which products, that can be be used by researchers to augment their CV, and by funders to evaluate the output of researchers.',
    linkText: 'Explore Activity',
    to: 'Explore/Activity',
  },
  {
    title: 'People',
    icon: PeopleIconSvg,
    description:
      'People candidates for collaboration with other researchers, based on their activity and contributions',
    linkText: 'Explore People',
    to: 'Explore/People',
  },
]
const PortalHomePageLinks = () => {
  return (
    <div className="HomePageLinks">
      <h2>Portal Goals</h2>
      <p>
        The CSBC/PS-ON Knowledge Portal is a Community Research resource which
        aims to
        <a href="https://synapse.org">
          &nbsp;<i>synthesize and expose the activities and outputs</i>&nbsp;
        </a>
        of these consortia. In this portal, users can find information about and
        access to the following:
      </p>
      <div className="link-container">
        {links.map(el => {
          const Icon = el.icon
          return (
            <div className="link-child" key={el.linkText}>
              <h4>
                <Icon className="icon" />
                {el.title}
              </h4>
              <p>{el.description}</p>
              <Link style={{ fontWeight: 'bold' }} className="link" to={el.to}>
                {el.linkText}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PortalHomePageLinks
