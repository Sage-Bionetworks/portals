import * as React from 'react'
import { Link } from 'react-router-dom'
import { generateSynapseObject } from '../RouteResolver'
import { SynapseObjectSingle } from '../types/portal-config'

const homeSynapseObjectRenderer = (synapseObject: SynapseObjectSingle) => {
  return (
    <div className="homeExploreContainer">
      <div id="homePageBarChart">
        {generateSynapseObject(synapseObject)}
      </div>
      <Link to={`/Explore/${synapseObject.name}`} id="exploreData"> Explore {synapseObject.name} </Link>
    </div>
  )
}

export default homeSynapseObjectRenderer
