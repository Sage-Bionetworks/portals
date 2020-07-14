import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import loadingScreen from '../loadingScreen'
import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'

const experimentalSchema: GenericCardSchema = {
  type: SynapseConstants.EXPERIMENTAL,
  title: 'name',
  description: 'summary',
  link: 'dataFileHandleId',
  secondaryLabels: [
    'toolType',
    'modelType',
    'AlzForum',
    'modelSystemName',
    'data',
    'supplementaryInformation',
    'contributor',
    'grant',
    'program',
  ],
}

const cardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  loadingScreen,
  genericCardSchema: experimentalSchema,
  labelLinkConfig: [
    {
      isMarkdown: true,
      matchColumnName: 'AlzForum',
    },
    {
      isMarkdown: false,
      matchColumnName: 'data',
      URLColumnName: 'Study_Name',
      baseURL: 'Explore/Studies/DetailsPage',
    },
    {
      isMarkdown: true,
      matchColumnName: 'supplementaryInformation',
    },
  ],
}

const sql = 'select * from syn22219805'
const entityId = 'syn22219805'
const rgbIndex = 6
const unitDescription = 'Tools'

const experimentalTools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      link: 'Explore/Experimental Tools',
      linkText: 'Explore Experimental Tools',
      facet: 'toolType',
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
      entityId,
      name: 'Experimental Tools',
      shouldDeepLink: true,
      cardConfiguration,
      facetsToPlot: [
        'toolType',
        'modelType',
        'contributor',
        'grant',
        'program',
        'backgroundStrain',
        'targetedGenes',
      ],
      facetAliases: {
        AlzForum: 'ALZFORUM',
      },
      searchConfiguration: {
        searchable: [
          {
            columnName: 'name',
            hintText: '',
          },
          {
            columnName: 'summary',
            hintText: '',
          },
          {
            columnName: 'toolType',
            hintText: '',
          },
          {
            columnName: 'contributor',
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
            columnName: 'backgroundStrain',
            hintText: '',
          },
          {
            columnName: 'targetedGenes',
            hintText: '',
          },
        ],
      },
    },
  },
}

export default experimentalTools
