import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { facetAliases } from './commonProps'
export const toolsSql = 'SELECT * FROM syn9898965'
const sql= toolsSql
const unitDescription = 'Tools'
const rgbIndex = 8


export const toolsSchema: GenericCardSchema = {
  type: SynapseConstants.TOOL,
  title: 'name',
  secondaryLabels: [
    'inputDataType',
    'outputDataType',
    'softwareLanguage',
    'study',
    'consortium',
  ],
  link: 'id',
}

export const tools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facet: 'consortium',
      facetAliases,
      link: 'Explore/Tools',
      linkText: 'Explore Tools',
      initQueryRequest : {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask: SynapseConstants.BUNDLE_MASK_QUERY_FACETS
          | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: false,
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
      unitDescription,
      cardConfiguration: {
        type: SynapseConstants.GENERIC_CARD,
        genericCardSchema: toolsSchema,
        secondaryLabelLimit: 5
      },
      stackedBarChartConfiguration: {
        loadingScreen
      },
      searchConfiguration: {
        searchable: [
          {
            columnName: 'name',
            hintText: 'track'
          },
          {
            columnName: 'consortium',
            hintText: 'PS-ON'
          },
          {
            columnName: 'inputDataType',
            hintText: 'image'
          },
          {
            columnName: 'outputDataType',
            hintText: 'network'
          },
          {
            columnName: 'softwareLanguage',
            hintText: 'python'
          },
        ]
      },
      name: 'Tools',
      facetAliases,
      menuConfig: [
        {
          sql,
          facet: 'consortium',
        },
        {
          sql,
          facet: 'inputDataType',
        },
        {
          sql,
          facet: 'outputDataType',
        },
        {
          sql,
          facet: 'softwareLanguage',
        },
        {
          sql,
        },
      ],
    }
  }
}
