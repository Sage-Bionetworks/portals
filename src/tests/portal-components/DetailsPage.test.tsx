import React from 'react'
import DetailsPage, {
  SplitStringToComponent,
} from '../../portal-components/DetailsPage'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DetailsPageTabProps, RowSynapseConfig } from 'types/portal-util-types'
import { SynapseContextProvider } from 'synapse-react-client/dist/utils/SynapseContext'
import syn16787123Json from '../../mocks/syn16787123.json'
import { SynapseConfig } from 'types/portal-config'
import { assert } from 'console'

function renderWithContext(component) {
  return render(
    <SynapseContextProvider
      synapseContext={{
        accessToken: 'abcd',
        utcTime: false,
        isInExperimentalMode: false,
      }}
    >
      {component}
    </SynapseContextProvider>,
  )
}

// We have to mock fetching a table query result, but those details remain untested
const SynapseClient = require('synapse-react-client/dist/utils/SynapseClient')
// eslint-disable-next-line no-import-assign
SynapseClient.getQueryTableResults = jest
  .fn()
  .mockResolvedValue(syn16787123Json)

const SynapseComponentWithContext = require('../../SynapseComponentWithContext')
let getSynapseConfig: () => SynapseConfig

describe('DetailsPage tests', () => {
  it('Renders synapseConfigArray with no tabs', async () => {
    const synapseConfigArray: RowSynapseConfig[] = [
      {
        name: 'Markdown',
        standalone: true,
        props: {
          markdown: 'Synapse Component 1',
        },
      },
    ]
    renderWithContext(
      <DetailsPage synapseConfigArray={synapseConfigArray} sql="" />,
    )

    await waitFor(() => screen.getByText('Synapse Component 1'))
  })

  it('Renders one set of tabs and synapseConfigArray objects', async () => {
    const tabLayout: DetailsPageTabProps[] = [
      {
        title: 'Tab 1',
        synapseConfigArray: [
          {
            name: 'Markdown',
            standalone: true,
            props: {
              markdown: 'Synapse Component 1',
            },
          },
        ],
      },
      {
        title: 'Tab 2',
        synapseConfigArray: [
          {
            name: 'Markdown',
            standalone: true,
            props: {
              markdown: 'Synapse Component 2',
            },
          },
        ],
      },
    ]
    renderWithContext(<DetailsPage tabLayout={tabLayout} sql="" />)

    // Tab buttons should be visible
    const tab1 = await screen.findByText('Tab 1')
    const tab2 = await screen.findByText('Tab 2')

    // Component 1 should be visible at first, component 2 should not be visible
    await screen.findByText('Synapse Component 1')
    expect(await screen.queryByText('Synapse Component 2')).toBeNull()

    // Call under test - click tab 2 to reveal tab 2's contents and hide tab 1's contents
    userEvent.click(tab2)

    expect(await screen.queryByText('Synapse Component 1')).toBeNull()
    await screen.findByText('Synapse Component 2')

    // Call under test -- click back to tab 1
    userEvent.click(tab1)

    await screen.findByText('Synapse Component 1')
    expect(await screen.queryByText('Synapse Component 2')).toBeNull()
  })

  it('Renders two sets of tabs (subtabs) and synapseConfigArray objects', async () => {
    const tabLayout: DetailsPageTabProps[] = [
      {
        title: 'Tab 1',
        tabLayout: [
          {
            title: 'Subtab 1',
            synapseConfigArray: [
              {
                name: 'Markdown',
                standalone: true,
                props: {
                  markdown: 'Synapse component in first subtab',
                },
              },
            ],
          },
          {
            title: 'Subtab 2',
            synapseConfigArray: [
              {
                name: 'Markdown',
                standalone: true,
                props: {
                  markdown: 'Synapse component in second subtab',
                },
              },
            ],
          },
        ],
      },
      {
        title: 'Tab 2',
        synapseConfigArray: [
          {
            name: 'Markdown',
            standalone: true,
            props: {
              markdown: 'Synapse component in second tab',
            },
          },
        ],
      },
    ]
    renderWithContext(<DetailsPage tabLayout={tabLayout} sql="" />)

    // Tab buttons should be visible
    const tab1 = await screen.findByText('Tab 1')
    const tab2 = await screen.findByText('Tab 2')

    // Sub tab buttons should be visible
    const subtab1 = await screen.findByText('Subtab 1')
    const subtab2 = await screen.findByText('Subtab 2')

    // Component in first subtab should be visible, second should not
    await screen.findByText('Synapse component in first subtab')
    expect(
      await screen.queryByText('Synapse component in second subtab'),
    ).toBeNull()

    // Click the second subtab and which component is visible should switch
    userEvent.click(subtab2)

    await screen.findByText('Synapse component in second subtab')
    expect(
      await screen.queryByText('Synapse component in first subtab'),
    ).toBeNull()

    // Click the first subtab and it should switch back
    userEvent.click(subtab1)

    await screen.findByText('Synapse component in first subtab')
    expect(
      await screen.queryByText('Synapse component in second subtab'),
    ).toBeNull()

    // Click tab 2 and the subtabs and content should disappear
    userEvent.click(tab2)

    await screen.findByText('Synapse component in second tab')
    expect(await screen.queryByText('Subtab 1')).toBeNull()
    expect(await screen.queryByText('Subtab 2')).toBeNull()
    expect(
      await screen.queryByText('Synapse component in first subtab'),
    ).toBeNull()
    expect(
      await screen.queryByText('Synapse component in second subtab'),
    ).toBeNull()

    // Click tab 1 and the subtabs should reappear
    userEvent.click(tab1)
    await screen.findByText('Subtab 1')
    await screen.findByText('Subtab 2')
  })

  it('Test overrideSqlSourceTable', async () => {
    SynapseComponentWithContext.SynapseComponentWithContext = jest
      .fn()
      .mockImplementation(({ synapseConfig }) => {
        getSynapseConfig = () => {
          return synapseConfig
        }
        return <div>My Query Wrapper Plot Nav</div>
      })
    
    const queryPlotNavRowConfig: RowSynapseConfig = {
      name: 'QueryWrapperPlotNav',
      props: {
        sqlOperator: 'HAS',
        name: 'Files',
        sql: 'select * from syn1',
        visibleColumnCount: 7,
        tableConfiguration: {
          showAccessColumn: true,
          showDownloadColumn: true,
        },
        shouldDeepLink: false,
      },
      overrideSqlSourceTable: true,
    }
    const deepCloneOfProps = {
      sqlOperator: 'HAS',
      rgbIndex: 6,
      name: 'Files',
      sql: '',
      visibleColumnCount: 7,
      tableConfiguration: { showAccessColumn: true, showDownloadColumn: true },
      shouldDeepLink: false,
    }
    renderWithContext(
      <SplitStringToComponent
        splitString="syn26843747"
        deepCloneOfProps={deepCloneOfProps}
        el={queryPlotNavRowConfig}
        columnName="id"
      />,
    )
    await waitFor(() => screen.getByText('My Query Wrapper Plot Nav'))
    const modifiedSynapseConfig = getSynapseConfig()
    assert(
      modifiedSynapseConfig!.props!['sql'] === 'SELECT  *  FROM  syn26843747',
    )
  })
})
