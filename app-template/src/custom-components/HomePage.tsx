import * as React from 'react'
import { Link } from 'react-router-dom'
import { generateSynapseObject } from '../RouteResolver'
import { SynapseObjectSingle } from '../types/portal-config'

const HomePage = (synapseObject: SynapseObjectSingle) => {
  return (
    <div className="homeExploreContainer">
      <div id="homePageBarChart">
        {generateSynapseObject(synapseObject)}
      </div>
      <Link to={`/Explore/${name}`} id="exploreData"> Explore {name} </Link>
  </div>
  )
}

export default HomePage
