import * as React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import CardContainerLogic from 'synapse-react-client/dist/containers/CardContainerLogic'
import StatefulButtonControlWrapper, {
  StatefulButtonControlWrapperProps,
} from '../../portal-components/StatefulButtonControlWrapper'

describe('StatefulButtonControlWrapper works', () => {
  const props: StatefulButtonControlWrapperProps = {
    configs: [
      {
        synapseConfigArray: [
          {
            name: 'CardContainerLogic',
            props: {
              sql: '',
              type: '',
            },
          },
        ],
        name: 'Route 1',
      },
    ],
    colors: ['red'],
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
    expect(component.find(CardContainerLogic)).toHaveLength(1)
  })
})
