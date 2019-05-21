import * as React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import CardContainerLogic from 'synapse-react-client/dist/containers/CardContainerLogic'
import HomeButtonControl, { HomeButtonControlProps } from '../../portal-components/HomeButtonControl'

describe('ExploreButtonControl works', () => {
  const props: HomeButtonControlProps = {
    configs: [{
      synapseObjectSingle: {
        name: 'CardContainerLogic',
        props: {
          sql: '',
          type: ''
        },
      },
      name: 'Route 1  '
    }],
    colors: ['red'],
  }

  it('renders correctly', async () => {
    const component = await mount(<MemoryRouter><HomeButtonControl {...props} /></MemoryRouter>)
    // check its defined
    expect(component).toBeDefined()
    // check that it renders a markdown component
    expect(component.find(CardContainerLogic)).toHaveLength(1)
  })
})
