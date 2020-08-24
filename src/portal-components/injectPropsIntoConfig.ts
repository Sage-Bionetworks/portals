import { cloneDeep } from 'lodash'
import { MarkdownSynapseProps } from 'synapse-react-client/dist/containers/MarkdownSynapse'
import { SynapseConfig } from 'types/portal-config'
import { RowSynapseConfig } from 'types/portal-util-types'
// @ts-ignore
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
      if (value.includes('wiki')) {
        // value looks like syn20681023/wiki/594680
        const split = value.split('/')
        const ownerId = split[0]
        const wikiId = split[2]
        markdownProps.ownerId = ownerId
        markdownProps.wikiId = wikiId
      } else {
        // else assume its an ownerId
        markdownProps.ownerId = value
      }
    }
  }
  return internalProps
}
export default injectPropsIntoConfig
