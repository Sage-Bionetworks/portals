import Layout from 'portal-components/Layout'
import * as React from 'react'
import { Button, Form } from 'react-bootstrap'
import IconSvg from 'synapse-react-client/dist/containers/IconSvg'

const BrowseToolsPage = () => {
  const [searchText, setSearchText] = React.useState<string>('')
  return (
    <div className="browse-tools-page">
      <div className="SRC-portalCard SRC-portalCardHeader bootstrap-4-backport">
        <div className="home-container-description header-text" style={{padding: 0, marginTop: 0, marginBottom: 0}}>
          <h2 className="center-title">NF Research Tools Database</h2>
          <p className="text-align-center">
          The NF Research Tools Database aims to support the development of a robust research toolkit and lower the barrier of entry to neurofibromatosis (NF) research. The database includes NF-associated animal models, cell lines, antibodies, and genetic reagents and details on tool characteristics and sourcing, as well as observational and experimental data.
          </p>
          <div className="center-content">
            <Button className="pill-xl" variant="white" style={{marginTop: 50}}>SUBMIT A TOOL</Button>
          </div>
        </div>
      </div>
      <div className="home-container-description">
        <h2 className="title center-title" style={{marginTop: 50}}>What Tools Can We Help You Find?</h2>
        <div className="center-content">
          <div className="searchToolsRow">
            <div className="searchInputWithIcon">
              <IconSvg options={{ icon: 'searchOutlined' }} />
              <Form.Control type="search" placeholder="" 
                value={searchText}
                onChange={event => {
                  setSearchText(event.target.value)
                }}
              />
            </div>
            <div className="search-button-container bootstrap-4-backport">
              <Button className="pill-xl" variant="default">SEARCH</Button>
            </div>
          </div>
        </div>
        <h2 className="title center-title" style={{marginTop: 50}}>Popular Searches</h2>
        <div className="center-content">
          <div className="popularSearchesContainer">
            <a>Animal models for NF1 OPG</a>
            <a>Human Cell Lines for NF1</a>
            <a>NF1 Mouse Models</a>
            <a>NF PDX Lines</a>
          </div>
        </div>
      </div>
      <Layout outsideContainerClassName="home-spacer home-bg-dark">
        <h2 className="title center-title">
          Browse Tools by Category
        </h2>
        <p className="center-title">
          Drill-down to explore specific types of NF research tools.
        </p>
      </Layout>
      <Layout outsideContainerClassName="home-spacer">
        <h2 className="title center-title">
          Featured Tools
        </h2>
        <div className="center-content">
          <p className="description">
            Check out some recently-catalogued research resources below.
          </p>
        </div>
      </Layout>
      <Layout outsideContainerClassName="home-spacer home-bg-dark">
        <h2 className="title center-title">
          Submit a Tool to the Database
        </h2>
        <div className="center-content">
          <p className="description">
            We are currently accepting submissions that describe any NF1-related mouse model, cell line, genetic reagent (e.g. plasmid, CRISPR), antibody, or biobank. If you have a tool that you would like to add to the Research Tools Database, please reach out to us and we will be in touch with how to submit your tool. 
          </p>
        </div>
        <div className="center-content bootstrap-4-backport" style={{marginTop: 50}}>
          <Button className="pill-xl" variant="primary">SUBMIT A TOOL</Button>
        </div>
      </Layout>
    </div>
  )
}

export default BrowseToolsPage
