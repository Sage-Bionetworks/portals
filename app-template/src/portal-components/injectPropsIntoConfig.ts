import { cloneDeep } from "lodash";
import { MarkdownSynapseProps } from "synapse-react-client/dist/containers/MarkdownSynapse"
import { SynapseConfig } from "types/portal-config"

type SynapseConfigName = SynapseConfig['name']
/**
 * Given a value and synapse config, returns the props with the value injected into the synapse object accordingly.
 *
 * @param {string} value
 * @param {SynapseConfigName} name
 * @param {*} props
 * @returns {*}
 */
const injectPropsIntoConfig = (value: string, name: SynapseConfigName, props: any): any  => {
  const internalProps = cloneDeep(props)
  if (name === 'Markdown') {
    const markdownProps = internalProps as MarkdownSynapseProps
    markdownProps.ownerId = value
  }
  return internalProps

}
export default injectPropsIntoConfig