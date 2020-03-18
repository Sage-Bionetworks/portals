import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'

const unitDescription = 'Individuals'
const rgbIndex = 4
export const individualsSql = 'SELECT * FROM syn21781196'
export const invidualsEntityId = 'syn21781196'
const entityId = invidualsEntityId
const sql = individualsSql
const facet = 'project'

export const toolCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  loadingScreen,
  genericCardSchema: {
    type: 'People',
    title: 'name',
    description: 'expertise',
    secondaryLabels: ['project'],
  },
  secondaryLabelLimit: 4,
}

const tools: HomeExploreConfig = {
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
            columnName: 'name',
            hintText: 'LastName',
          },
          {
            columnName: 'toolDescription',
            hintText: 'generation of iPSC organoids',
          },
          {
            columnName: 'project',
            hintText: 'syn12345',
          },
        ],
      },
      name: 'Individuals',
      unitDescription: 'Individuals',
      cardConfiguration: toolCardConfiguration,
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

export default tools
