import * as React from 'react'
import QueryWrapperFlattened, {
  QueryWrapperFlattenedProps,
} from 'portal-components/QueryWrapperFlattened'

import QueryCount from 'synapse-react-client/dist/containers/QueryCount'
export type TableWithSideFacetsProps = QueryWrapperFlattenedProps & {
  name: string
}
const TableWithSideFacets = (
  props: QueryWrapperFlattenedProps & { name: string },
) => {
  return (
    <div>
      <h3 id="exploreCount" className="SRC-boldText">
        <QueryCount
          name={props.name}
          token={props.token}
          sql={props.initQueryRequest.query.sql}
        />
      </h3>
      <div className="break">
        <hr />
      </div>
      <QueryWrapperFlattened {...props} />
    </div>
  )
}

export default TableWithSideFacets
