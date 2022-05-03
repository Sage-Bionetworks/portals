import * as React from 'react'
import { mount } from 'enzyme'
import RouteControlWrapper, {
  RouteControlWrapperProps,
} from '../../portal-components/RouteControlWrapper'
import { MemoryRouter } from 'react-router'
import { SynapseContextProvider } from 'synapse-react-client/dist/utils/SynapseContext'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'

describe('RouteControlWrapper works', () => {
  const routeName = 'custom route'
  const props: RouteControlWrapperProps = {
    synapseConfig: {
      name: 'Markdown',
      props: {
        markdown: '## This is a markdown component',
      },
    },
    customRoutes: [routeName],
  }

  it('renders correctly', () => {
    const component = mount(
      <SynapseContextProvider
        synapseContext={{
          accessToken: 'abcd',
          utcTime: false,
          isInExperimentalMode: false,
        }}
      >
        <MemoryRouter>
          <RouteControlWrapper {...props} />
        </MemoryRouter>
      </SynapseContextProvider>,
    )
    // check its defined
    expect(component).toBeDefined()
    // check that it renders a MarkdownSynapse component
    expect(component.find(MarkdownSynapse)).toHaveLength(1)
    expect(component.find('button').text()).toEqual(routeName)
  })
})
