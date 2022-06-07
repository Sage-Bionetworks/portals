import React from 'react'
import { useLocation } from 'react-router-dom'

export type WithLocationPropType = {
  location: Location
}

export default function withLocation(
  Component: React.ComponentType<WithLocationPropType>,
) {
  return (props) => <Component {...props} location={useLocation()} />
}
