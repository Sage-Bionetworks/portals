import * as React from 'react'
import { useState } from 'react'
import { DetailsPageTabProps } from 'types/portal-util-types'
import { Icon } from "synapse-react-client/dist/containers/row_renderers/utils";
import SvgIcon from "@material-ui/icons/ExploreOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import { BarLoader } from "react-spinners";

export type DetailsPageTabsProps = {
  tabConfigs: DetailsPageTabProps[],
  loading: boolean,
  tabContents: JSX.Element[] | false
}

const getIcon = (config: DetailsPageTabProps) => {
  const icon = config.tabIconConfigs
  switch (icon.componentName) {
    case "mui":
      return <SvgIcon component={ExploreOutlinedIcon} className={icon.iconClass ? icon.iconClass : ""}></SvgIcon>
    case "icon":
      return <Icon type={icon.iconName}></Icon>
    default:
      return <></>
  }
}

const DetailsPageTabs: React.FunctionComponent<DetailsPageTabsProps> = props => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const { tabConfigs, loading, tabContents } = props

  return (
    <>
      <div className="tab-groups">
        {tabConfigs.map((tab, index) => {
          const activeClass = selectedTabIndex === index ? "tab-item-active" : "tab-item"
          const iconComponent = getIcon(tab)
          return <span key={`detailPage-tab-${index}`} className={activeClass} onClick={() => { setSelectedTabIndex(index) }}>
          { iconComponent }{tab.title}</span>
        })}
      </div>
      {loading && <BarLoader color="#878787" loading={true} height={5}/>}
      <div className="tab-content-group">
        {tabContents && tabContents.map((content, index) => {
          const activeClass = selectedTabIndex === index ? "tab-content-active" : "tab-content"
          return <div key={`detailPage-tabcontent-${index}`} className={activeClass}>
            {content}
          </div>
        })}
      </div>
    </>
  )
}

export default DetailsPageTabs