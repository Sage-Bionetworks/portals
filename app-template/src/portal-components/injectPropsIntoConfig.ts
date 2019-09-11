import { cloneDeep } from "lodash";
import { MarkdownSynapseProps } from "synapse-react-client/dist/containers/MarkdownSynapse"
import { SynapseConfig } from "types/portal-config"

type SynapseConfigName = SynapseConfig['name']
const injectPropsIntoConfig = (value: string, name: SynapseConfigName, props: any): any  => {
  const internalProps = cloneDeep(props)
  if (name === 'Markdown') {
    const markdownProps = internalProps as MarkdownSynapseProps
    markdownProps.ownerId = value
  }
  return internalProps

}
export default injectPropsIntoConfig