import injectPropsIntoConfig from '../../portal-components/injectPropsIntoConfig'
import { MarkdownSynapseProps } from 'synapse-react-client/dist/containers/MarkdownSynapse';

describe('injectPropsIntoConfig works', () => {
  it('works with markdown', () => {
    const val = 'syn123'
    const markdownProps: MarkdownSynapseProps = {}
    const injectedProps = injectPropsIntoConfig<MarkdownSynapseProps>(val, 'Markdown', markdownProps)
    expect(injectedProps.ownerId).toEqual(val)
  })
})
