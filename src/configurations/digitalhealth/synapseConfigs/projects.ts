import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
export const projectsSql =
  "SELECT * FROM syn21994974 WHERE  dhPortalIndex = 'TRUE' and isDHProject = 'TRUE'"
export const projectsEntityId = 'syn21994974'
const entityId = projectsEntityId
const sql = projectsSql
const unitDescription = 'Studies'
const rgbIndex = 1

export const projectSchema: GenericCardSchema = {
  type: SynapseConstants.PROJECT,
  link: 'id',
  title: 'study',
  description: 'studyDescription',
}

export const studiesCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: projectSchema,
  loadingScreen,
}

export const projects: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facet: 'theme',
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
