import React from 'react'
import { Redirect, RedirectProps, useLocation } from 'react-router'

/**
 * Allows us to use react-router's Redirect as a portal component without losing the query params.
 * @param props 
 * @returns 
 */
export default function RedirectWithQuery(props: RedirectProps) {
  const { search } = useLocation()

  return (
    <Redirect
      {...props}
      to={{
        pathname: props.to as string,
        search,
      }}
    />
  )
}
