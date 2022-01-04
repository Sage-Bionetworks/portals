import * as React from 'react'
import { useState } from 'react'
import { DetailsPageTabProps } from 'types/portal-util-types'
import { Icon } from 'synapse-react-client/dist/containers/row_renderers/utils'
import { BarLoader } from 'react-spinners'
import { DetailsPageSynapseConfigArray } from './DetailsPage'
import { QueryResultBundle } from 'synapse-react-client/dist/utils/synapseTypes'

export type DetailsPageTabsProps = {
  tabConfigs: DetailsPageTabProps[]
  loading: boolean
  showMenu: boolean
  queryResultBundle?: QueryResultBundle
}

const DetailsPageTabs: React.FunctionComponent<DetailsPageTabsProps> = (
  props,
) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const { tabConfigs, loading, queryResultBundle, showMenu } = props
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
          if (tabConfig.tabLayout && tabConfig.synapseConfigArray) {
            // It doesn't make sense to show both sub-tabs and Synapse components
            console.warn(
              'tabLayout and synapseConfigArray were both specified in the following tabConfig when only one is supported.',
              tabConfig,
            )
          }
          return (
            selectedTabIndex === index && (
              <div key={index} className="tab-content">
                {tabConfig.tabLayout && (
                  <DetailsPageTabs
                    tabConfigs={tabConfig.tabLayout}
                    loading={loading}
                    queryResultBundle={queryResultBundle}
                    showMenu={showMenu}
                  ></DetailsPageTabs>
                )}
                {tabConfig.synapseConfigArray && (
                  <DetailsPageSynapseConfigArray
                    showMenu={showMenu}
                    synapseConfigArray={tabConfig.synapseConfigArray!}
                    queryResultBundle={queryResultBundle}
                  />
                )}
              </div>
            )
          )
        })}
      </div>
    </>
  )
}

export default DetailsPageTabs
