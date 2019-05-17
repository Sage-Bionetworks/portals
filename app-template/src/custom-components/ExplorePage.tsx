import * as React from 'react'
import RouteResolver from '../RouteResolver'
import { SynapseObjectSingle } from '../types/portal-config'

const ExplorePage = (_synapseObject: SynapseObjectSingle) => {
  return (
    <div className={'container explore'}>
        <div className="row">
          {
            <RouteResolver />
          }
        </div>
    </div>
  )
}

export default ExplorePage
