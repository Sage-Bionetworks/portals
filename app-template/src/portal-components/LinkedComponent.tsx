import * as React from 'react'
import { generateSynapseObject } from '../RouteResolver'
import { Link } from 'react-router-dom'
import { SynapseConfig } from '../types/portal-config'

export type LinkedComponentProps = {
  synapseConfig: SynapseConfig
  link: string
  text: string
}

export const LinkedComponent: React.FunctionComponent<LinkedComponentProps> = ({ synapseConfig, link, text }) => {
  return (
    <div className="linked-container">
      <div className="linked-container-positioner">
        {generateSynapseObject(synapseConfig)}
      </div>
      <Link to={link} className="linked-container-anchor"> {text} </Link>
    </div>
  )
}
