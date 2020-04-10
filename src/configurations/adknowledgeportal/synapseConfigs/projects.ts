import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'

const unitDescription = 'Projects'
const rgbIndex = 4
export const projectsSql = 'SELECT * FROM syn17024229'
export const projectsEntityId = 'syn17024229'
const entityId = projectsEntityId
const sql = projectsSql
const facet = 'Program'

export const projectCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  loadingScreen,
  genericCardSchema: {
    type: 'Project',
    title: 'Name',
    subTitle: 'Key Investigators',
    description: 'Abstract',
    secondaryLabels: [
      'Institutions',
      'Key Data Contributors',
      'Program',
      'Grant Number',
    ],
  },
  secondaryLabelLimit: 4,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Projects/DetailsPage',
    URLColumnName: 'Grant Number',
    matchColumnName: 'Grant Number',
  },
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
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: true,
          limit: 25,
          offset: 0,
        },
      },
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      entityId,
      shouldDeepLink: true,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'Name',
            hintText: 'immunity',
          },
          {
            columnName: 'Abstract',
            hintText: 'targets',
          },
          {
            columnName: 'Key Investigators',
            hintText: 'LastName',
          },
          {
            columnName: 'Key Data Contributors',
            hintText: 'LastName',
          },
          {
            columnName: 'Institutions',
            hintText: 'Sage Bionetworks',
          },
          {
            columnName: 'Grant Number',
            hintText: 'U01AG046139',
          },
          {
            columnName: 'Program',
            hintText: 'MODEL-AD',
          },
        ],
      },
      name: 'Projects',
      isConsistent: true,
      unitDescription: 'Projects',
      cardConfiguration: projectCardConfiguration,
      menuConfig: [
        {
          sql,
          facet,
        },
        {
          sql,
        },
      ],
    },
  },
}

export default projects
