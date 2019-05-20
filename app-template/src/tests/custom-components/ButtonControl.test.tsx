import * as React from 'react'
import { mount, shallow } from 'enzyme'
import ButtonControl, { ButtonControlProps } from '../../custom-components/ButtonControl'
import { publications, data } from '../../example-configuration/exploreHomeConfiguration'
import { ExploreButtons } from '../../ExploreButtons'
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/MemoryRouter.md
import { MemoryRouter } from 'react-router'

describe('functions correctly', () => {

  // @ts-ignore
  const props: ButtonControlProps = {
    statefulConfigurations: [
      { name: 'data', synapseObject: data.homePageSynapseObject.props },
      { name: 'publications', synapseObject: publications.homePageSynapseObject.props }
    ],
    colors: [
      'purple',
      'blue'
    ]
  }

  it('renders without crashing', () => {
    const component = shallow(<MemoryRouter><ButtonControl {...props}/></MemoryRouter>)
    expect(component).toBeDefined()
  })

  it('renders the UI correctly', () => {
    const component = mount(<MemoryRouter><ButtonControl {...props} /></MemoryRouter>)
    const stackedBarChart = component.find(ButtonControl)
    expect(stackedBarChart.find('a#exploreData').text()).toEqual(` Explore ${data.homePageSynapseObject.props.name} `)
  })

  it('handles click event correctly', () => {
    const component = mount(<MemoryRouter><ButtonControl {...props} /></MemoryRouter>)
    const stackedBarChart = component.find(ButtonControl)
    stackedBarChart.setState({
      index: 1
    })
    expect(component.find('a#exploreData').text()).toEqual(` Explore ${publications.homePageSynapseObject.props.name} `)
  })
})
