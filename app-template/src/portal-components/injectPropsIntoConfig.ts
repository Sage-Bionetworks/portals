import { cloneDeep } from "lodash";
import { MarkdownSynapseProps } from "synapse-react-client/dist/containers/MarkdownSynapse"
import { QueryWrapperFlattenedProps } from "./QueryWrapperFlattened"
import { insertConditionsFromSearchParams } from "synapse-react-client/dist/utils/modules/sqlFunctions"

const injectPropsIntoConfig = (value: string, name: string, props: any)  => {
  const internalProps = cloneDeep(props)
  if (name === 'Markdown') {
    const markdownProps = internalProps as MarkdownSynapseProps
    markdownProps.ownerId = value
  } else if (name === 'QueryWrapperFlattened') {
    const queryWrapperFlattenedProps = props as QueryWrapperFlattenedProps
    const sql = queryWrapperFlattenedProps.initQueryRequest.query.sql
    // TODO
    // props.initQueryRequest.query.sql = insertConditionsFromSearchParams({}, sql)
  }
  return internalProps

}
export default injectPropsIntoConfig