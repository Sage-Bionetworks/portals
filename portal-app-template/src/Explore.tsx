import * as React from 'react'
import { SynapseComponents, SynapseClient } from 'synapse-react-client'
// import { synapseConfigs } from './synapseConfigs'
import { ExploreButtons } from './ExploreButtons'
import { BarLoader } from 'react-spinners'
import { QueryWrapperMenuProps } from 'synapse-react-client/dist/containers/QueryWrapperMenu'
const cloneDeep = require('clone-deep')

type CountQuery = {
  queryCount: number | string
  subPath?: string
}

type ExploreState = {
  headerCountQueries: CountQuery []
  currentCountQuery: CountQuery
}

export default class Explore extends React.Component<{}, ExploreState> {

  constructor(props: any) {
    super(props)
    this.getSynapseConfigFromHash = this.getSynapseConfigFromHash.bind(this)
    this.state = {
      headerCountQueries: [],
      currentCountQuery: {} as CountQuery
    }
  }

  componentDidMount() {
    // this.updateExploreCount()
  }

  componentDidUpdate() {
    // this.updateExploreCount()
  }

  updateExploreCount = () => {
    const subPath = window.location.hash.substring('#/Explore/'.length)
    const { headerCountQueries } =  this.state
    if (headerCountQueries.findIndex(el => el.subPath === subPath) === -1) {
      // while its loading don't show the prior number
      if (this.state.currentCountQuery.queryCount !== '') {
        this.setState({
          currentCountQuery: {
            queryCount: ''
          }
        })
      }
      const config = this.getSynapseConfigFromHash() as any
      const { countQuery } = config
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
  }

  getSynapseConfigFromHash(): void {
    const hash = window.location.hash
    // TODO
    // switch (hash) {
    //   case '#/Explore/Grants':
    //     return synapseConfigs.grants
    //   case '#/Explore/Publications':
    //     return synapseConfigs.publications
    //   case '#/Explore/Studies':
    //     return synapseConfigs.studies
    //   case '#/Explore/Data':
    //     return synapseConfigs.data
    //   case '#/Explore/Datasets':
    //     return synapseConfigs.datasets
    //   default:
    //     throw new Error(`Incompatible Hash: ${hash}`)
    // }
  }

  render () {
    // const config = this.getSynapseConfigFromHash()
    const handleChanges = (val: string) => window.location.hash = `Explore/${val}`
    const subPath = window.location.hash.substring('#/Explore/'.length)
    const subPathDisplay = subPath === 'Data' ? 'Files' : subPath
    const isSelected = (val: string) => val === subPathDisplay
    // const { queryCount = '' } = this.state.currentCountQuery
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
              {/* {subPathDisplay} ({queryCount && queryCount.toLocaleString()}) */}
              TODO
            </h3>
            <div className="break">
              <hr/>
            </div>
            {/* <div className="row">
              <SynapseComponents.QueryWrapperMenu
                loadingScreen={<div className="bar-loader"><BarLoader color="#47337D" loading={true} /></div>}
                {...config}
              />
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}
