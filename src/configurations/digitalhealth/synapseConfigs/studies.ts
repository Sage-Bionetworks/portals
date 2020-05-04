import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
export const studySql = 'SELECT * FROM syn21994974'
export const studyEntityId = 'syn21994974'
const entityId = studyEntityId
const sql = studySql
const unitDescription = 'Studies'
const rgbIndex = 1

export const studySchema: GenericCardSchema = {
  type: SynapseConstants.STUDY,
  title: 'study',
  subTitle: 'studyDescription',
  secondaryLabels: [
    'reportedOutcome',
    'sensorType',
  ],
}

export const studiesCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: studySchema,
  loadingScreen,
  secondaryLabelLimit: 5,
  // titleLinkConfig: {
  //   isMarkdown: false,
  //   URLColumnName: 'study',
  //   matchColumnName: 'study',
  //   baseURL: 'Explore/Studies/DetailsPage',
  // },
  labelLinkConfig: [
  ],
}

export const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facet: 'theme',
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
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
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      entityId,
      cardConfiguration: studiesCardConfiguration,
      sql,
      shouldDeepLink: true,
      name: 'Studies',
      loadingScreen,
      // @ts-ignore
      facetAliases,
    },
  },
}
