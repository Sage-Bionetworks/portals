import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'

const unitDescription = 'Tools'
const rgbIndex = 8
export const toolsSql = 'SELECT * FROM syn21438237'
export const toolsEntityId = 'syn21438237'
const entityId = toolsEntityId
const sql = toolsSql
const facet = 'Project'

export const toolCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  loadingScreen,
  genericCardSchema: {
    type: 'Tool',
    title: 'title',
    description: 'toolDescription',
    secondaryLabels: ['toolLink', 'contributor', 'project'],
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
      link: 'Explore/Tools',
      linkText: 'Explore Tools',
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
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      entityId,
      sql,
      shouldDeepLink: true,
      facetsToPlot: ['Project'],
      name: 'Tools',
      cardConfiguration: toolCardConfiguration,
      // searchConfiguration: {
      //   searchable: [
      //     {
      //       columnName: 'title',
      //       hintText: 'Read level viewer',
      //     },
      //     {
      //       columnName: 'toolDescription',
      //       hintText: 'CNV read level viewer',
      //     },
      //     {
      //       columnName: 'contributor',
      //       hintText: 'LastName',
      //     },
      //     {
      //       columnName: 'project',
      //       hintText: '4',
      //     },
      //   ],
      // },
    },
  },
}

export default tools
