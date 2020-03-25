import { cloneDeep } from 'lodash'
import { MarkdownSynapseProps } from 'synapse-react-client/dist/containers/MarkdownSynapse'
import { SynapseConfig } from 'types/portal-config'
import { RowSynapseConfig } from 'types/portal-util-types'

type SynapseConfigName = SynapseConfig['name']
/**
 * Given a value and synapse config, returns the props with the value injected into the synapse object accordingly.
 *
 * @param {string} value
 * @param {SynapseConfigName} name
 * @param {*} props
 * @returns {*}
 */
const injectPropsIntoConfig = (
  value: string,
  el: RowSynapseConfig,
  props: any,
): any => {
  const internalProps = cloneDeep(props)
  if (el.name === 'Markdown') {
    const markdownProps = internalProps as MarkdownSynapseProps
    if (el.injectMarkdown) {
      markdownProps.markdown = value
    } else {
      markdownProps.ownerId = value
    }
  }
  return internalProps
}
export default injectPropsIntoConfig
