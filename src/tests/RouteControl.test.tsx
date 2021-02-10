import * as React from 'react'
import { shallow } from 'enzyme'
import { RouteControl, RouteControlProps } from '../RouteControl'

describe('RouteControl works', () => {
  const customRoutes = ['route1', 'route2']
  const props: RouteControlProps = {
    customRoutes,
    handleChanges: jest.fn(),
    isSelected: jest.fn(),
  }
  it('renders the routes and colors correctly', () => {
    const el = shallow(<RouteControl {...props} />)
    const buttons = el.find('button')
    expect(buttons).toHaveLength(2)
    // test that the first button has the right background and text set
    const buttonOne = buttons.at(0)
    expect(buttonOne.text()).toEqual(customRoutes[0])
    // test that the first button has the right background and text set
    const buttonTwo = buttons.at(1)
    expect(buttonTwo.text()).toEqual(customRoutes[1])
  })
})
