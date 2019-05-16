import * as React from 'react'
import { ExploreButtons } from './ExploreButtons'
import RouteResolver from './RouteResolver'
import { withRouter } from 'react-router'
import routesConfig from './config/routesConfig'
import { NestedRoute } from './types/portal-config'

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
    const explore = routesConfig.find(el => el.name === 'Explore') as NestedRoute
    const colors = explore.addOns.colors
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
              colors={colors}
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
