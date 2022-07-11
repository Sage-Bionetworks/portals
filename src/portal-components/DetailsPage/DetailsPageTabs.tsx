import * as React from 'react'
import { useState } from 'react'
import { Icon } from 'synapse-react-client/dist/containers/row_renderers/utils'
import { BarLoader } from 'react-spinners'
import { DetailsPageSynapseConfigArray } from './DetailsPage'
import { QueryResultBundle } from 'synapse-react-client/dist/utils/synapseTypes'
import { NavLink, Route, useLocation, useRouteMatch } from 'react-router-dom'
import RedirectWithQuery from '../RedirectWithQuery'
import { DetailsPageTabProps } from 'types/portal-util-types'

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
  const { url } = useRouteMatch()
  const urlWithTrailingSlash = `${url}${url.endsWith('/') ? '' : '/'}`
  const { search } = useLocation()
  return (
    <>
      <RedirectWithQuery
        exact={true}
        from={urlWithTrailingSlash}
        to={`${urlWithTrailingSlash}${tabConfigs[0].uriValue}`}
      />
      <div className="tab-groups">
        {tabConfigs.map((tab, index) => {
          return (
            <NavLink
              to={`${urlWithTrailingSlash}${tab.uriValue + search}`}
              key={`detailPage-tab-${index}`}
              className={'tab-item ignoreLink'}
              aria-selected={selectedTabIndex === index}
              onClick={() => {
                setSelectedTabIndex(index)
              }}
            >
              {tab.iconName && <Icon type={tab.iconName}></Icon>}
              {tab.title}
            </NavLink>
          )
        })}
      </div>
      {loading ? (
        <BarLoader color="#878787" loading={true} height={5} />
      ) : (
        <div className="tab-content-group">
          <div className="tab-content">
            {tabConfigs.map((tabConfig, index) => {
              return (
                <Route
                  key={tabConfig.uriValue}
                  path={`${urlWithTrailingSlash}${tabConfig.uriValue}`}
                >
                  {'tabLayout' in tabConfig && tabConfig.tabLayout && (
                    <DetailsPageTabs
                      tabConfigs={tabConfig.tabLayout}
                      loading={loading}
                      queryResultBundle={queryResultBundle}
                      showMenu={showMenu}
                    ></DetailsPageTabs>
                  )}
                  {'synapseConfigArray' in tabConfig &&
                    tabConfig.synapseConfigArray && (
                      <DetailsPageSynapseConfigArray
                        showMenu={showMenu}
                        synapseConfigArray={tabConfig.synapseConfigArray!}
                        queryResultBundle={queryResultBundle}
                      />
                    )}
                </Route>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default DetailsPageTabs
