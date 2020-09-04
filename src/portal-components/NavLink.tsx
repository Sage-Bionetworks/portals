import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

/*
  
  Surprisingly the Link component only supports internal web app links, so its necessary
  to check if the link being passed in is external and use an explicit anchor tag.
  
  Read more here: https://github.com/ReactTraining/react-router/issues/1147

*/

type Props = LinkProps & {
  text: string | JSX.Element
}
export default function NavLink(props: Props) {
  const link = props.to as string

  const isExternal = () => {
    if (link.includes('http')) {
      return true
    } else if (link.includes('mailto')) {
      return true
    }
    return false
  }

  return isExternal() ? (
    <a href={link} {...props}>
      {props.text}
    </a>
  ) : (
    <Link {...props}> {props.text} </Link>
  )
}
