import * as React from 'react'
import { mount } from 'enzyme'
import ExploreButtonControlWrapper, { ExploreButtonControlWrapperProps } from '../../portal-components/ExploreButtonControlWrapper'
import { MemoryRouter } from 'react-router'
import CardContainerLogic from 'synapse-react-client/dist/containers/CardContainerLogic'

describe('ExploreButtonControlWrapper works', () => {

  const routeName = 'custom route'
  const props: ExploreButtonControlWrapperProps = {
    SynapseConfig: {
      name: 'CardContainerLogic',
      props: {
        sql: '',
        type: ''
      },
    },
    colors: ['red'],
    customRoutes: [routeName]
  }

  it('renders correctly', () => {
    const component = mount(<MemoryRouter><ExploreButtonControlWrapper {...props} /></MemoryRouter>)
    // check its defined
    expect(component).toBeDefined()
    // check that it renders a CardContainerLogic component
    expect(component.find(CardContainerLogic)).toHaveLength(1)
    expect(component.find('button').text()).toEqual(routeName)
  })
})
