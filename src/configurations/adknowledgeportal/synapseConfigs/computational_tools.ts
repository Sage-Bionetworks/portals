import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import loadingScreen from '../loadingScreen'
import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'

const computationalSchema: GenericCardSchema = {
  type: SynapseConstants.COMPUTATIONAL,
  title: 'name',
  description: 'summary',
  subTitle: 'softwareType',
  secondaryLabels: ['contributor', 'program', 'grant', 'documentation'],
}

const cardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  loadingScreen,
  genericCardSchema: computationalSchema,
}

const sql = 'Select * from syn20337467'
const entityId = 'syn20337467'
const rgbIndex = 6
const unitDescription = 'Tools'

const computationalTools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      link: 'Explore/Computational Tools',
      linkText: 'Explore Computational Tools',
      facet: 'softwareType',
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
      sql,
      cardConfiguration,
      entityId,
      shouldDeepLink: true,
      name: 'Computational Tools',
      facetsToPlot: ['grant', 'program', 'softwareType'],
      searchConfiguration: {
        searchable: [
          {
            columnName: 'contributor',
            hintText: '',
          },
          {
            columnName: 'name',
            hintText: '',
          },
          {
            columnName: 'grant',
            hintText: '',
          },
          {
            columnName: 'program',
            hintText: '',
          },
          {
            columnName: 'softwareType',
            hintText: '',
          },
          {
            columnName: 'summary',
            hintText: '',
          },
        ],
      },
    },
  },
}

export default computationalTools
