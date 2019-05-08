import * as React from 'react'
import { SynapseClient } from 'synapse-react-client'
import { ExploreButtons } from './ExploreButtons'
import RouteResolver, { getRouteFromParams } from './RouteResolver'
import { withRouter } from 'react-router'
import { HomeExploreConfig } from './types/portal-config'

const cloneDeep = require('clone-deep')

type CountQuery = {
  queryCount: number | string
  subPath?: string
}

type ExploreState = {
  headerCountQueries: CountQuery []
  currentCountQuery: CountQuery
}

type ExploreProps = {
  location: any
  history: any
  match: any
}

class Explore extends React.Component<ExploreProps, ExploreState> {

  constructor(props: any) {
    super(props)
    this.state = {
      headerCountQueries: [],
      currentCountQuery: {} as CountQuery
    }
  }

  render () {
    const { location } = this.props
    const pathname = location.pathname
    const subPath = pathname.substring('/Explore/'.length)
    const handleChanges = (val: string, _index: number) => this.props.history.push(`/Explore/${val}`)
    const isSelected = (name: string) => name === subPath
    return (
      <div className={'container explore'}>
        <div className="row">
          <div className="col-xs-12">
            <h1 className="SRC-boldText">
              Explore
            </h1>
            <ExploreButtons
              isSelected={isSelected}
              handleChanges={handleChanges}
            />
            <div className="row">
              {
                <RouteResolver/>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Explore)
