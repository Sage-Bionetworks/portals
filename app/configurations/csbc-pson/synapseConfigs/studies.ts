import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../src/types/portal-config'
import loadingScreen from '../loadingScreen'
import { facetAliases, detailPageLinks } from './commonProps'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
const unitDescription = 'studies'
export const studiesSql = `SELECT * FROM syn18483791 WHERE ( ( "is.study" = 'TRUE' ) )`
const entityId = 'syn18483791'
export const studiesEntityId = 'syn18483791'
const sql = studiesSql
const rgbIndex = 1

export const studySchema: GenericCardSchema = {
  type: SynapseConstants.STUDY,
  title: 'portalDisplayName',
  subTitle: 'centerName',
  description: 'description',
  secondaryLabels: [
    'Title',
    'PubMed',
    'Theme',
    'tumorType',
    'experimentalStrategy',
    'datasets',
    'centerName',
    'consortium',
    'grantType',
  ],
}

export const studyCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: studySchema,
  secondaryLabelLimit: 4,
  labelLinkConfig: detailPageLinks,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Studies',
    URLColumnName: 'studies',
    matchColumnName: 'id',
  },
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
      unitDescription,
      entityId,
      cardConfiguration: studyCardConfiguration,
      stackedBarChartConfiguration: {
        loadingScreen,
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
            columnName: 'description',
            hintText: '',
          },
          {
            columnName: 'centerName',
            hintText: '',
          },
          {
            columnName: 'Theme',
            hintText: '',
          },
          {
            columnName: 'experimentalStrategy',
            hintText: '',
          },
          {
            columnName: 'tumorType',
            hintText: '',
          },
          {
            columnName: 'consortium',
            hintText: '',
          },
          {
            columnName: 'grantType',
            hintText: '',
          },
        ],
      },
      menuConfig: [
        {
          sql,
          facet: 'Theme',
        },
        {
          sql,
          facet: 'experimentalStrategy',
        },
        {
          sql,
          facet: 'tumorType',
        },
        {
          sql,
          facet: 'consortium',
        },
        {
          sql,
          facet: 'grantType',
        },
        {
          sql,
        },
      ],
    },
  },
}
