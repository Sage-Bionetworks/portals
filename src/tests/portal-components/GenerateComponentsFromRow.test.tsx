import { mount } from 'enzyme'
import StandaloneQueryWrapper from 'portal-components/StandaloneQueryWrapper'
import * as React from 'react'
import { SynapseClient } from 'synapse-react-client'
import MarkdownSynapse from 'synapse-react-client/dist/containers/MarkdownSynapse'
import {
  EntityHeader,
  PaginatedResults,
  QueryResultBundle,
  EntityColumnType,
} from 'synapse-react-client/dist/utils/synapseTypes/'
import { DetailsPageProps, RowSynapseConfig } from 'types/portal-util-types'
import DetailsPage from '../../portal-components/DetailsPage'
const injectPropsIntoConfig = require('portal-components/injectPropsIntoConfig')

const createMountedComponent = async (props: DetailsPageProps) => {
  const wrapper = await mount<DetailsPage>(<DetailsPage {...props} />)
  return wrapper
}

describe('DetailsPageProps works', () => {
  // ---- MARKDOWN COMPONENT PROPS SETUP ----
  const MARKDOWN_COL_TEST_NAME = 'MARKDOWN_COL_TEST_NAME'
  const MARKDOWN_ROW_TEST_VALUE = 'syn123'
  // type isn't being carried through..
  const markdownSynapseConfig: RowSynapseConfig = {
    name: 'Markdown',
    columnName: MARKDOWN_COL_TEST_NAME,
    props: {
      markdown: '#header',
    },
  }
  // ---- MARKDOWN COMPONENT PROPS END ----

  // ---- MULTI VALUE MARKDOWN COMPONENT PROPS SETUP ----
  const val1 = 'syn234'
  const val2 = 'syn345'
  const val3 = 'syn456'
  const MARKDOWN_COL_MULTI_VALUE_TEST_NAME = `MARKDOWN_COL_MULTI_VALUE_TEST_NAME`
  const MARKDOWN_COL_MULTI_VALUE_TEST_VALUE = `${val1} ,   ${val2} ,   ${val3}`
  const multiValueMarkdownSynapseConfig: RowSynapseConfig = {
    name: 'Markdown',
    columnName: MARKDOWN_COL_MULTI_VALUE_TEST_NAME,
    props: {
      markdown: '#header',
    },
  }
  // ---- MULTI VALUE MARKDOWN COMPONENT PROPS END ----

  // ---- TABLE COMPONENT PROPS SETUP ----
  const TABLE_COL_TEST_NAME = 'TABLE_COL_TEST_NAME'
  const TABLE_ROW_TEST_VALUE = 'TABLE_ROW_TEST_VALUE'
  const tableSynapseConfig: RowSynapseConfig = {
    name: 'StandaloneQueryWrapper',
    columnName: TABLE_COL_TEST_NAME,
    title: 'title',
    props: {
      sql: 'SELECT * FROM syn11346063',
      unitDescription: '',
      title: 'title',
      rgbIndex: 0,
    },
  }
  // ---- TABLE COMPONENT PROPS END ----

  // ---- COMPONENT PROPS DATA SETUP ----
  const mockDataResponse: QueryResultBundle = {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryResultBundle',
    selectColumns: [],
    queryCount: 3,
    queryResult: {
      concreteType: 'org.sagebionetworks.repo.model.table.QueryResult',
      queryResults: {
        tableId: '',
        concreteType: '',
        etag: '',
        headers: [
          {
            columnType: EntityColumnType.STRING,
            name: MARKDOWN_COL_TEST_NAME,
            id: '',
          },
          {
            columnType: EntityColumnType.STRING,
            name: MARKDOWN_COL_MULTI_VALUE_TEST_NAME,
            id: '',
          },
          {
            columnType: EntityColumnType.STRING,
            name: TABLE_COL_TEST_NAME,
            id: '',
          },
        ],
        rows: [
          {
            values: [
              MARKDOWN_ROW_TEST_VALUE,
              MARKDOWN_COL_MULTI_VALUE_TEST_VALUE,
              TABLE_ROW_TEST_VALUE,
            ],
            rowId: 1,
            versionNumber: 1,
          },
        ],
      },
    },
  }
  // @ts-ignore
  SynapseClient.getQueryTableResults = jest.fn(() =>
    Promise.resolve(mockDataResponse),
  )
  const MOCK_HEADER_NAME = 'MOCK_HEADER_NAME'
  const mockEntityHeaderResponse: PaginatedResults<EntityHeader> = {
    results: [
      {
        name: MOCK_HEADER_NAME,
        id: TABLE_ROW_TEST_VALUE,
        type: '',
        versionLabel: '',
        versionNumber: 1,
        benefactorId: 1,
        createdBy: '',
        createdOn: '',
        modifiedBy: '',
        modifiedOn: '',
      },
    ],
    totalNumberOfResults: 1,
  }
  // @ts-ignore
  SynapseClient.getEntityHeader = jest.fn(() =>
    Promise.resolve(mockEntityHeaderResponse),
  )
  // ---- COMPONENT PROPS DATA END ----

  const spyOnInject = jest.spyOn(injectPropsIntoConfig, 'default')
  const props: DetailsPageProps = {
    searchParams: {
      study: 'syn',
    },
    sql: 'SELECT * FROM syn',
    synapseConfigArray: [],
  }

  beforeEach(() => {
    spyOnInject.mockClear()
  })

  it('renders without crashing', () => {
    props.synapseConfigArray = [markdownSynapseConfig]
    const wrapper = createMountedComponent(props)
    expect(wrapper).toBeDefined()
  })

  it('renders a markdown component correctly', async () => {
    props.synapseConfigArray = [markdownSynapseConfig]
    const wrapper = await createMountedComponent(props)
    await wrapper.update()
    expect(wrapper.find(MarkdownSynapse)).toHaveLength(1)
    expect(spyOnInject).toHaveBeenCalled()
    expect(spyOnInject).toHaveBeenCalledWith(
      MARKDOWN_ROW_TEST_VALUE,
      markdownSynapseConfig,
      markdownSynapseConfig.props,
    )
  })

  it('renders a table component correctly', async () => {
    props.synapseConfigArray = [tableSynapseConfig]
    const wrapper = await createMountedComponent(props)
    await wrapper.update()
    expect(wrapper.find(StandaloneQueryWrapper)).toHaveLength(1)
    expect(spyOnInject).toHaveBeenCalled()
    expect(spyOnInject).toHaveBeenCalledWith(
      TABLE_ROW_TEST_VALUE,
      tableSynapseConfig,
      tableSynapseConfig.props,
    )
  })

  it('renders a component with its props already set', async () => {
    const standaloneProps: DetailsPageProps = {
      searchParams: {
        study: 'syn',
      },
      sql: 'SELECT * FROM syn',
      synapseConfigArray: [{ ...markdownSynapseConfig, standalone: true }],
    }
    const wrapper = await createMountedComponent(standaloneProps)
    await wrapper.update()
    expect(wrapper.find(MarkdownSynapse)).toHaveLength(1)
    expect(spyOnInject).not.toHaveBeenCalled()
  })

  it('renders a component with a value that is comma delimited', async () => {
    const multivalueProps: DetailsPageProps = {
      searchParams: {
        study: 'syn',
      },
      sql: 'SELECT * FROM syn',
      synapseConfigArray: [multiValueMarkdownSynapseConfig],
    }
    const wrapper = await createMountedComponent(multivalueProps)
    await wrapper.update()
    expect(wrapper.find(MarkdownSynapse)).toHaveLength(3)
    expect(spyOnInject).toHaveBeenNthCalledWith(
      1,
      val1,
      multiValueMarkdownSynapseConfig,
      multiValueMarkdownSynapseConfig.props,
    )
    expect(spyOnInject).toHaveBeenNthCalledWith(
      2,
      val2,
      multiValueMarkdownSynapseConfig,
      multiValueMarkdownSynapseConfig.props,
    )
    expect(spyOnInject).toHaveBeenNthCalledWith(
      3,
      val3,
      multiValueMarkdownSynapseConfig,
      multiValueMarkdownSynapseConfig.props,
    )
  })

  it('renders a component whos value is a synId that needs to be resolved as a value', async () => {
    const key = 'KEY'
    props.synapseConfigArray = [
      {
        ...tableSynapseConfig,
        resolveSynId: { value: true },
        tableSqlKeys: [key],
      },
    ]
    const wrapper = await createMountedComponent(props)
    await wrapper.update()
    expect(wrapper.find(StandaloneQueryWrapper)).toHaveLength(1)
    expect(spyOnInject).toHaveBeenCalled()
    expect(spyOnInject).toHaveBeenCalledWith(
      MOCK_HEADER_NAME,
      {
        ...tableSynapseConfig,
        resolveSynId: { value: true },
        tableSqlKeys: [key],
      },
      tableSynapseConfig.props,
    )
  })

  it('renders a component whos value is a synId that needs to be resolved as a title', async () => {
    const key = 'KEY'
    props.synapseConfigArray = [
      {
        ...tableSynapseConfig,
        resolveSynId: { title: true },
        tableSqlKeys: [key],
      },
    ]
    const wrapper = await createMountedComponent(props)
    await wrapper.update()
    expect(wrapper.find('h2').text().trim()).toEqual(
      `${tableSynapseConfig.title}: ${MOCK_HEADER_NAME}`,
    )
  })
})
