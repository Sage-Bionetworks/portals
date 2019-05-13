import * as React from 'react'
import { mount, shallow } from 'enzyme'
import StackedBarChartControl, { StackedBarChartControlProps } from '../../custom-components/StackedBarChartControl'
import { publications, data } from '../../example-configuration/exploreHomeConfiguration'
import { ExploreButtons } from '../../ExploreButtons'
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/MemoryRouter.md
import { MemoryRouter } from 'react-router'

describe('functions correctly', () => {

  const props: StackedBarChartControlProps = {
    queryWrapperConfigs: [
      data.homePageSynapseObject.props,
      publications.homePageSynapseObject.props
    ],
  }

  it('renders without crashing', () => {
    const component = shallow(<MemoryRouter><StackedBarChartControl {...props}/></MemoryRouter>)
    expect(component).toBeDefined()
  })

  it('renders the UI correctly', () => {
    const component = mount(<MemoryRouter><StackedBarChartControl {...props} /></MemoryRouter>)
    const stackedBarChart = component.find(StackedBarChartControl)
    expect(stackedBarChart.find('a#exploreData').text()).toEqual(` Explore ${data.homePageSynapseObject.props.name} `)
  })

  it('handles click event correctly', () => {
    const component = mount(<MemoryRouter><StackedBarChartControl {...props} /></MemoryRouter>)
    const stackedBarChart = component.find(StackedBarChartControl)
    stackedBarChart.setState({
      index: 1
    })
    expect(component.find('a#exploreData').text()).toEqual(` Explore ${publications.homePageSynapseObject.props.name} `)
  })
})
