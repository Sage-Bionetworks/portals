import * as React from 'react'
import { mount } from 'enzyme'
import GenerateComponentsFromRow, { GenerateComponentsFromRowProps, RowSynapseConfig } from '../../portal-components/GenerateComponentsFromRow'
import { SynapseClient } from 'synapse-react-client'
import { QueryResultBundle } from 'synapse-react-client/dist/utils/jsonResponses/Table/QueryResultBundle'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'
import QueryWrapperFlattened from 'portal-components/QueryWrapperFlattened'
const injectPropsIntoConfig = require('portal-components/injectPropsIntoConfig')

describe('GenerateComponentsFromRowProps works', () => {
  // ---- MARKDOWN COMPONENT PROPS SETUP ----
  const MARKDOWN_COL_TEST_NAME = 'MARKDOWN_COL_TEST_NAME'
  const MARKDOWN_ROW_TEST_VALUE = 'syn123'
  // type isn't being carried through..
  const markdownSynapseConfig: RowSynapseConfig = {
    name: 'Markdown',
    columnName: MARKDOWN_COL_TEST_NAME,
    props: {
      markdown: '#header'
    }
  }
  // ---- MARKDOWN COMPONENT PROPS END ----

  // ---- TABLE COMPONENT PROPS SETUP ----
  const TABLE_COL_TEST_NAME = 'TABLE_COL_TEST_NAME'
  const TABLE_ROW_TEST_VALUE = 'TABLE_ROW_TEST_VALUE'
  const tableSynapseConfig: RowSynapseConfig = {
    name: 'QueryWrapperFlattened',
    columnName: TABLE_COL_TEST_NAME,
    props: {
      initQueryRequest: {
        partMask: 0,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        query: {
          sql: 'SELECT * FROM syn',
          limit: 25,
          offset: 0
        }
      }
    }
  }
  // ---- TABLE COMPONENT PROPS END ----

  // ---- COMPONENT PROPS SETUP ----
  const mockData: QueryResultBundle = {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryResultBundle',
    selectColumns: [],
    queryResult: {
      concreteType: '',
      queryResults: {
        tableId: '',
        concreteType: '',
        etag: '',
        headers: [
          {
            columnType: 'STRING',
            name: MARKDOWN_COL_TEST_NAME,
            id: ''
          },
          {
            columnType: 'STRING',
            name: TABLE_COL_TEST_NAME,
            id: ''
          }
        ],
        rows: [
          {
            values: [
              MARKDOWN_ROW_TEST_VALUE,
              TABLE_ROW_TEST_VALUE
            ],
            rowId: 1,
            versionNumber: 1
          }
        ]
      },
    }
  }
  // @ts-ignore
  SynapseClient.getQueryTableResults = jest.fn(() => Promise.resolve(mockData))
  const props : GenerateComponentsFromRowProps = {
    searchParams: {
      study: 'syn'
    },
    sql: 'SELECT * FROM syn',
    synapseConfigArray: [
      markdownSynapseConfig,
      tableSynapseConfig
    ]
  }
  it('renders without crashing', () => {
    const wrapper = mount(<GenerateComponentsFromRow {...props} />)
    expect(wrapper).toBeDefined()
  })

  it('renders a markdown component correctly', async () => {
    const spyOnInject = jest.spyOn(injectPropsIntoConfig, 'default')
    const wrapper = await mount(<GenerateComponentsFromRow {...props} />)
    // https://github.com/airbnb/enzyme/issues/1233#issuecomment-343449560
    wrapper.update()
    expect(wrapper.find(MarkdownSynapse)).toHaveLength(1)
    expect(spyOnInject).toHaveBeenCalled()
    expect(spyOnInject).toHaveBeenCalledWith(MARKDOWN_ROW_TEST_VALUE, 'Markdown', markdownSynapseConfig.props)
  })

  it('renders a table component correctly', async () => {
    const spyOnInject = jest.spyOn(injectPropsIntoConfig, 'default')
    const wrapper = await mount(<GenerateComponentsFromRow {...props} />)
    // https://github.com/airbnb/enzyme/issues/1233#issuecomment-343449560
    wrapper.update()
    expect(wrapper.find(QueryWrapperFlattened)).toHaveLength(1)
    expect(spyOnInject).toHaveBeenCalled()
    expect(spyOnInject).toHaveBeenCalledWith(TABLE_ROW_TEST_VALUE, 'QueryWrapperFlattened', tableSynapseConfig.props)
  })

})
