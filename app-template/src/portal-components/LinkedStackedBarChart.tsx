import * as React from 'react'
import { generateSynapseObject } from '../RouteResolver'
import { Link } from 'react-router-dom'
import { SynapseConfig } from '../types/portal-config'

type LinkedStackedBarChartProps = {
  synapseConfig: SynapseConfig
  link: string
  name: string
}

export const LinkedStackedBarChart: React.FunctionComponent<LinkedStackedBarChartProps> = ({ synapseConfig, link, name }) => {
  return (
    <div className="homeExploreContainer">
      <div id="homePageBarChart">
        {generateSynapseObject(synapseConfig)}
      </div>
      <Link to={link} id="exploreData"> Explore {name} </Link>
    </div>
  )
}
