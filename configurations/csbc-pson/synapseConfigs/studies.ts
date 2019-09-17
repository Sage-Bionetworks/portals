import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
import { facetAliases } from './commonProps'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
const unitDescription = 'studies'
export const studiesSql = `SELECT * FROM syn18483791 WHERE ( ( "is.study" = 'TRUE' ) )`
const sql = studiesSql
const rgbIndex = 1

export const studySchema: GenericCardSchema = {
  type: 'study',
  title: 'portalDisplayName',
  subTitle: 'centerName',
  description: 'description',
  secondaryLabels: [
    'PubMed',
    'Theme',
    'tumorType',
    'experimentalStrategy',
    'consortium',
    'grantType',
  ],
  link: 'id',
}

export const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facet: 'grantType',
      facetAliases,
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
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
      },
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      cardConfiguration: {
        type: SynapseConstants.GENERIC_CARD,
        genericCardSchema: studySchema
      },
      stackedBarChartConfiguration: {
        loadingScreen
      },
      name: 'Studies',
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'name',
            hintText: '',
          },
          {
            columnName: 'centerName',
            hintText: '',
          },
          {
            columnName: 'description',
            hintText: '',
          },
          {
            columnName: 'Theme',
            hintText: '',
          },
          {
            columnName: 'tumorType',
            hintText: '',
          },
          {
            columnName: 'experimentalStrategy',
            hintText: '',
          },
          {
            columnName: 'consortium',
            hintText: ''
          },
          {
            columnName: 'grantType',
            hintText: ''
          },
        ]
      },
      menuConfig: [
        {
          sql,
          facet: 'grantType'
        },
        {
          sql,
          facet: 'consortium'
        },
        {
          sql,
          facet: 'Theme'
        },
        {
          sql,
          facet: 'experimentalStrategy'
        },
        {
          sql,
          facet: 'tumorType'
        },
        {
          sql,
        },
      ],
    }
  }
}
