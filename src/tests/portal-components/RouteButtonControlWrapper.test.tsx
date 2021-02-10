import * as React from 'react'
import { mount } from 'enzyme'
import RouteControlWrapper, {
  RouteControlWrapperProps,
} from '../../portal-components/RouteControlWrapper'
import { MemoryRouter } from 'react-router'
import CardContainerLogic from 'synapse-react-client/dist/containers/CardContainerLogic'

describe('RouteControlWrapper works', () => {
  const routeName = 'custom route'
  const props: RouteControlWrapperProps = {
    synapseConfig: {
      name: 'CardContainerLogic',
      props: {
        sql: '',
        type: '',
        entityId: '',
      },
    },
    customRoutes: [routeName],
  }

  it('renders correctly', () => {
    const component = mount(
      <MemoryRouter>
        <RouteControlWrapper {...props} />
      </MemoryRouter>,
    )
    // check its defined
    expect(component).toBeDefined()
    // check that it renders a CardContainerLogic component
    expect(component.find(CardContainerLogic)).toHaveLength(1)
    expect(component.find('button').text()).toEqual(routeName)
  })
})
