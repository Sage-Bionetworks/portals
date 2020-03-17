import * as React from 'react'
import { mount } from 'enzyme'
import RouteButtonControlWrapper, {
  RouteButtonControlWrapperProps,
} from '../../portal-components/RouteButtonControlWrapper'
import { MemoryRouter } from 'react-router'
import CardContainerLogic from 'synapse-react-client/dist/containers/CardContainerLogic'

describe('RouteButtonControlWrapper works', () => {
  const routeName = 'custom route'
  const props: RouteButtonControlWrapperProps = {
    synapseConfig: {
      name: 'CardContainerLogic',
      props: {
        sql: '',
        type: '',
        entityId: '',
      },
    },
    colors: ['red'],
    customRoutes: [routeName],
  }

  it('renders correctly', () => {
    const component = mount(
      <MemoryRouter>
        <RouteButtonControlWrapper {...props} />
      </MemoryRouter>,
    )
    // check its defined
    expect(component).toBeDefined()
    // check that it renders a CardContainerLogic component
    expect(component.find(CardContainerLogic)).toHaveLength(1)
    expect(component.find('button').text()).toEqual(routeName)
  })
})
