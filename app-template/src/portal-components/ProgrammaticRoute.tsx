import * as React from 'react'
import { SynapseConfigArray } from '../types/portal-config'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { generateSynapseObject } from '../RouteResolver'
import Layout from './Layout'

export declare type ProgrammaticRouteProps = {
  synapseIds: string []
  synapseConfigArray: SynapseConfigArray
}

const ProgrammaticRoute: React.FunctionComponent<ProgrammaticRouteProps & RouteComponentProps> = ({ synapseIds, synapseConfigArray, location }) => {
  if (synapseIds.length !== synapseConfigArray.length) {
    throw Error(`synapseIds.length should equal synapseConfigArray.length but found ${synapseIds.length} and ${synapseConfigArray.length}`)
  }
  const { search } = location
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams -- needs polyfill for ie11
  const searchParams = new URLSearchParams(search)
  const iter = searchParams.entries()
  let result = iter.next()
  let whereClause = ''
  while (!result.done) {
    const kv = result.value
    const column = kv[0]
    const value = kv[1]
    whereClause += ` "${column}" LIKE '${value}' `
    result = iter.next()
  }
  return (
    <React.Fragment>
      {
        synapseConfigArray.map(
          (el, index) => {
            const { props } = el
            const sql = `SELECT * FROM ${synapseIds[index]} WHERE ${whereClause}`
            if (el.name === 'CardContainerLogic') {
              props.sql = sql
            }
            return (
              <React.Fragment key={JSON.stringify(el.props)}>
                {
                  el.isOutsideContainer ?
                    generateSynapseObject(el)
                    :
                    <Layout>
                      {el.title &&  <h2 className="title"> {el.title} </h2>}
                      {generateSynapseObject(el)}
                    </Layout>
                }
              </React.Fragment>
            )
          }
        )
      }
    </React.Fragment>
  )
}

export default withRouter(ProgrammaticRoute)
