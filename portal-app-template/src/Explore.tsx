import * as React from 'react'
import { SynapseComponents, SynapseClient } from 'synapse-react-client'
import { ExploreButtons } from './ExploreButtons'
import { BarLoader } from 'react-spinners'
import { getSynapseObjectFromParams } from './RouteResolver'
import { withRouter } from 'react-router'

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

  componentDidMount() {
    this.updateExploreCount()
  }

  componentDidUpdate() {
    this.updateExploreCount()
  }

  updateExploreCount = () => {
    const { location } = this.props
    const pathname = location.pathname
    const subPath = pathname.substring('/Explore/'.length)
    const synapseObject = getSynapseObjectFromParams(pathname)!.synapseObject[0]
    const { headerCountQueries } =  this.state
    if (synapseObject.name === 'QueryWrapperMenuOverload') {
      if (headerCountQueries.findIndex(el => el.subPath === subPath) === -1) {
        // while its loading don't show the prior number
        if (this.state.currentCountQuery.queryCount !== '') {
          this.setState({
            currentCountQuery: {
              queryCount: ''
            }
          })
        }
        const { countQuery } = synapseObject
        SynapseClient.getQueryTableResults(
          countQuery
        ).then(
          (data: any) => {
            const newCountQuery = {
              subPath,
              queryCount: data.queryCount
            } as CountQuery
            // add new query count and create new object
            this.setState(
              {
                headerCountQueries: [...headerCountQueries, newCountQuery],
                currentCountQuery: newCountQuery
              }
            )
          }
        )
      } else if (this.state.currentCountQuery.subPath !== subPath) {
        // check that were not already on the path and use the precomputed value
        const newCountQuery = cloneDeep(headerCountQueries.find(el => el.subPath === subPath))
        this.setState({
          currentCountQuery: newCountQuery
        })
      }
    } else {
      console.error('Error: Explore page did not recieve correct setup')
    }
  }

  render () {
    const { location } = this.props
    const pathname = location.pathname
    const subPath = pathname.substring('/Explore/'.length)
    const synapseObject = getSynapseObjectFromParams(pathname)!.synapseObject[0]
    const handleChanges = (val: string) => this.props.history.push(`/Explore/${val}`)
    const isSelected = (val: string) => pathname === `/Explore/${val}`
    const { queryCount = '' } = this.state.currentCountQuery
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
            <h3 id="exploreCount" className="SRC-boldText">
              {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#Using_toLocaleString */}
              {/* TODO */}
              {subPath} ({queryCount && queryCount.toLocaleString()})
            </h3>
            <div className="break">
              <hr/>
            </div>
            <div className="row">
              <SynapseComponents.QueryWrapperMenu
                loadingScreen={<div className="bar-loader"><BarLoader color="#47337D" loading={true} /></div>}
                {...synapseObject.props}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Explore)
