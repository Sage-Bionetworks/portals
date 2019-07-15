import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'Projects'
const rgbIndex = 4
const sql = 'SELECT * FROM syn17024229'
const facetName = 'Program'

export const projectCardProps = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: 'Project',
    title: 'Name',
    subTitle: 'Key Investigators',
    description: 'Abstract',
    secondaryLabels: {
      0: { key: 'Institutions' },
      1: { key: 'Key Data Contributors', alias:  'Key Contributors' },
      2: { key: 'Program' },
      3: { key: 'Grant Number', alias:  'Grant' },
    }
  },
  internalLinkConfiguration: {
    baseURL: 'Explore/Projects',
    columnValues: ['Grant Number']
  }
}

const projects: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      facetName,
      loadingScreen,
      link: 'Explore/Projects',
      linkText: 'Explore Projects',
      initQueryRequest : {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask: SynapseConstants.BUNDLE_MASK_QUERY_FACETS
          | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: true,
          limit: 25,
          offset: 0,
        }
      }
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      name: 'Projects',
      isConsistent: true,
      unitDescription: 'Projects',
      cardConfiguration: projectCardProps,
      menuConfig: [
        {
          sql,
          facetName,
        },
      ],
    }
  }
}

export default projects
