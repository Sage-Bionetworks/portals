import { HomeExploreConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const unitDescription = 'Projects'
const rgbIndex = 4
export const projectsSql = 'SELECT * FROM syn17024229'
const sql = projectsSql
const facet = 'Program'

export const projectCardProps = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: 'Project',
    title: 'Name',
    subTitle: 'Key Investigators',
    description: 'Abstract',
    secondaryLabels: [
      'Institutions',
      'Key Data Contributors',
      'Program' 
    ],
  },
  secondaryLabelLimit: 4,
  titleLinkConfig: {
    baseURL: 'Explore/Projects',
    URLColumnNames: ['Grant Number']
  }
}

const projects: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      facet,
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
      searchConfiguration: {
        searchable: [
          {
            columnName: 'Name',
            hintText: 'immunity'
          },
          {
            columnName: 'Grant Number',
            hintText: 'U01AG046139'
          },
          {
            columnName: 'Program',
            hintText: 'MODEL-AD'
          },
          {
            columnName: 'Key Investigators',
            hintText: 'LastName'
          },
          {
            columnName: 'Key Data Contributors',
            hintText: 'LastName'
          },
          {
            columnName: 'Institutions',
            hintText: 'Sage Bionetworks'
          },
          {
            columnName: 'Abstract',
            hintText: 'targets'
          },
        ]
      },
      name: 'Projects',
      isConsistent: true,
      unitDescription: 'Projects',
      cardConfiguration: projectCardProps,
      menuConfig: [
        {
          sql,
          facet,
        },
        {
          sql,
        },
      ],
    }
  }
}

export default projects
