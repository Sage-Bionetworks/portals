import * as React from 'react'
import RouteResolver, { generateSynapseObject } from '../RouteResolver'
import { SynapseObjectSingle } from '../types/portal-config'

const ExplorePage = (synapseObject: SynapseObjectSingle) => {
  return (
    <div className={'container explore'}>
        <div className="row">
          {
            generateSynapseObject(synapseObject)
          }
        </div>
    </div>
  )
}

export default ExplorePage
