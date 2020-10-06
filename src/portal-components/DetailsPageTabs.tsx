import * as React from 'react'
import { useState } from 'react'
import { DetailsPageTabProps } from 'types/portal-util-types'
import { Icon } from "synapse-react-client/dist/containers/row_renderers/utils"
import { BarLoader } from "react-spinners";

export type DetailsPageTabsProps = {
  tabConfigs: DetailsPageTabProps[],
  loading: boolean,
  tabContents: JSX.Element[] | false
}

const DetailsPageTabs: React.FunctionComponent<DetailsPageTabsProps> = props => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const { tabConfigs, loading, tabContents } = props

  return (
    <>
      <div className="tab-groups">
        {tabConfigs.map((tab, index) => {
          const tabClass = selectedTabIndex === index ? `tab-item-active ${tab.cssClass || ''}`: `tab-item ${tab.cssClass || ''}`
          return <span key={`detailPage-tab-${index}`} className={tabClass} onClick={() => { setSelectedTabIndex(index) }}>
          { <Icon type={tab.iconName}></Icon> }{tab.title}</span>
        })}
      </div>
      {loading && <BarLoader color="#878787" loading={true} height={5}/>}
      <div className="tab-content-group">
        {tabContents && tabContents.map((content, index) => {
          const tabClass = selectedTabIndex === index ? `tab-content-active` : `tab-content`
          return <div key={`detailPage-tabcontent-${index}`} className={tabClass}>
            {content}
          </div>
        })}
      </div>
    </>
  )
}

export default DetailsPageTabs