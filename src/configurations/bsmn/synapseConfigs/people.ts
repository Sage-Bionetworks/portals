import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { MEDIUM_USER_CARD } from 'synapse-react-client/dist/utils/SynapseConstants'

const unitDescription = 'People'
const rgbIndex = 3
export const peopleSql = 'SELECT * FROM syn21781196'
export const peopleEntityId = 'syn21781196'
const entityId = peopleEntityId
const sql = peopleSql
const facet = 'project'

export const peopleCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  loadingScreen,
  genericCardSchema: {
    type: 'People',
    title: 'name',
    secondaryLabels: ['project'],
  },
  secondaryLabelLimit: 4,
  labelLinkConfig: [
    {
      isMarkdown: false,
      baseURL: 'Explore/Projects/DetailsPage',
      matchColumnName: 'project',
      URLColumnName: 'id',
    },
  ],
}

const individuals: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      facet,
      loadingScreen,
      link: 'Explore/Individuals',
      linkText: 'Explore Individuals',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
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
      entityId,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'experise',
            hintText: 'genomics',
          },
        ],
      },
      name: 'People',
      unitDescription: 'People',
      cardConfiguration: {
        type: MEDIUM_USER_CARD,
      },
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      menuConfig: [
        {
          sql,
        },
      ],
    },
  },
}

export default individuals
