import * as React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import StatefulButtonControlWrapper, {
  StatefulButtonControlWrapperProps,
} from '../../portal-components/StatefulButtonControlWrapper'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'

// Michael TODO: Investigate why SynapseComponents has undefined CardContainer/CardContainerLogic
// exclusively at the start of this test
describe('StatefulButtonControlWrapper works', () => {
  const props: StatefulButtonControlWrapperProps = {
    configs: [
      {
        synapseConfigArray: [
          {
            name: 'Markdown',
            props: {
              ownerId: 'syn21641142',
            },
          },
        ],
        name: 'Route 1',
      },
    ],
  }

  it('renders correctly', async () => {
    const component = await mount(
      <MemoryRouter>
        <StatefulButtonControlWrapper {...props} />
      </MemoryRouter>,
    )
    // check its defined
    expect(component).toBeDefined()
    // check that it renders a markdown component
    expect(component.find(MarkdownSynapse)).toHaveLength(1)
  })
})
