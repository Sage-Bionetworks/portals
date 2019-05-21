import * as React from 'react'
import { mount } from 'enzyme'
import ExploreButtonControl, { ExploreButtonControlProps } from '../../portal-components/ExploreButtonControl'
import { MemoryRouter } from 'react-router'
import CardContainerLogic from 'synapse-react-client/dist/containers/CardContainerLogic'

describe('ExploreButtonControl works', () => {

  const props: ExploreButtonControlProps = {
    synapseObjectSingle: {
      name: 'CardContainerLogic',
      props: {
        sql: '',
        type: ''
      },
    },
    colors: ['red'],
    customRoutes: [
      {
        name: 'Custom Route 1'
      }
    ]
  }

  it('renders correctly', () => {
    const component = mount(<MemoryRouter><ExploreButtonControl {...props} /></MemoryRouter>)
    // check its defined
    expect(component).toBeDefined()
    // check that it renders a CardContainerLogic component
    expect(component.find(CardContainerLogic)).toHaveLength(1)
  })
})
