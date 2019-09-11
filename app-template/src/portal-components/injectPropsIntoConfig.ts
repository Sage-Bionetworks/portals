import { cloneDeep } from "lodash";
import { MarkdownSynapseProps } from "synapse-react-client/dist/containers/MarkdownSynapse"
import { SynapseConfig } from "types/portal-config"

type SynapseConfigName = SynapseConfig['name']
const injectPropsIntoConfig = <T>(value: string, name: SynapseConfigName, props: any): T  => {
  const internalProps = cloneDeep(props)
  if (name === 'Markdown') {
    const markdownProps = internalProps as MarkdownSynapseProps
    markdownProps.ownerId = value
  }
  return internalProps

}
export default injectPropsIntoConfig