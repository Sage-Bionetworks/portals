import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
const unitDescription = 'studies'
export const studiesSql = `SELECT * FROM syn18483791 WHERE ( ( "is.study" = 'TRUE' ) )`
const sql = studiesSql
const rgbIndex = 1

export const studySchema: GenericCardSchema = {
  type: SynapseConstants.STUDY,
  title: 'name',
  subTitle: 'centerName',
  description: 'description',
  secondaryLabels: {
    0: { key: 'Theme' },
    1: { key: 'tumorType', alias: 'Disease' },
    2: { key: 'experimentalStrategy', alias: 'Assay' },
    3: { key: 'consortium', alias: 'Program' },
    4: { key: 'grantType', alias: 'Grant Type' },
  },
  link: 'id',
}

export const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facetName: 'grantType',
      facetAliases: {
        grantType: 'Grant Type',
      },
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
      menuConfig: [
        {
          sql,
          facetName: 'grantType',
          facetAliases: {
            grantType: 'Grant Type',
          }
        },
        {
          sql,
          facetName: 'consortium',
          facetAliases: {
            consortium: 'Program',
          }
        },
        {
          sql,
          facetName: 'Theme'
        },
        {
          sql,
          facetName: 'experimentalStrategy',
          facetAliases: {
            experimentalStrategy: 'Assay',
          }
        },
        {
          sql,
          facetName: 'tumorType',
          facetAliases: {
            tumorType: 'Disease Type',
          }
        },
      ],
    }
  }
}
