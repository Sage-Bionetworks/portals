import * as React from 'react'
import { useState } from 'react'
import { DetailsPageTabProps } from 'types/portal-util-types'
import { Icon } from 'synapse-react-client/dist/containers/row_renderers/utils'
import { BarLoader } from 'react-spinners'
import { DetailsPageSynapseConfigArray } from './DetailsPage'
import {
  QueryResultBundle,
  PaginatedResults,
  EntityHeader,
} from 'synapse-react-client/dist/utils/synapseTypes'

export type DetailsPageTabsProps = {
  tabConfigs: DetailsPageTabProps[]
  loading: boolean
  queryResultBundle?: QueryResultBundle
  entityHeaders?: PaginatedResults<EntityHeader>
}

const DetailsPageTabs: React.FunctionComponent<DetailsPageTabsProps> = (
  props,
) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const { tabConfigs, loading, queryResultBundle, entityHeaders } = props

  return (
    <>
      <div className="tab-groups">
        {tabConfigs.map((tab, index) => {
          return (
            <span
              key={`detailPage-tab-${index}`}
              className={'tab-item'}
              aria-selected={selectedTabIndex === index}
              onClick={() => {
                setSelectedTabIndex(index)
              }}
            >
              {tab.iconName && <Icon type={tab.iconName}></Icon>}
              {tab.title}
            </span>
          )
        })}
      </div>
      {loading && <BarLoader color="#878787" loading={true} height={5} />}
      <div className="tab-content-group">
        {tabConfigs.map((tabConfig, index) => {
          return (
            <div
              key={index}
              className={`tab-content${
                index === selectedTabIndex ? '-active' : ''
              }`}
            >
              {tabConfig.tabLayout && (
                <DetailsPageTabs
                  tabConfigs={tabConfig.tabLayout}
                  loading={loading}
                  queryResultBundle={queryResultBundle}
                  entityHeaders={entityHeaders}
                ></DetailsPageTabs>
              )}
              {tabConfig.synapseConfigArray && (
                <DetailsPageSynapseConfigArray
                  synapseConfigArray={tabConfig.synapseConfigArray!}
                  queryResultBundle={queryResultBundle}
                  entityHeaders={entityHeaders}
                />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default DetailsPageTabs
