import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
export const publicationSql = 'SELECT * FROM syn10923842'
const sql = publicationSql
const unitDescription = 'Publications'
const rgbIndex = 1


export const publicationSchema: GenericCardSchema = {
  type: 'Project',
  title: 'Title',
  subTitle: 'Authors',
  description: 'abstract',
  secondaryLabels: {
    0: { key: 'Journal'},
    1: { key: 'Publication Year', alias: 'Year' },
    2: { key: 'Theme' },
    3: { key: 'diseaseType', alias: 'Disease' },
    4: { key: 'tissue_or_organ', alias: 'Tissue' },
    5: { key: 'experimentalStrategy', alias: 'Assay' },
    6: { key: 'Keywords'},
    7: { key: 'DOI', alias: 'DOI' },
    8: { key: 'Grant'},
    9: { key: 'Consortium', alias: 'Program' },
    10: { key: 'grantType', alias: 'Grant Type' },
    11: { key: 'datasets', alias: 'Datasets' },
    12: { key: 'studies', alias: 'Studies' },
  },
  link: 'PubMed',
}

const facetAliases = {
  Consortium: 'Program',
  grantType: 'Grant Type',
  diseaseType: 'Disease',
  experimentalStrategy: 'Assay',
  'Publication Year': 'Year',
  'tissue_or_organ': 'Tissue',
}

export const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facetName: 'Consortium',
      facetAliases: {
        Consortium: 'Program',
      },
      link: 'Explore/Publications',
      linkText: 'Explore Publications',
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
        genericCardSchema: publicationSchema,
        secondaryLabelLimit: 5
      },
      stackedBarChartConfiguration: {
        loadingScreen
      },
      name: 'Publications',
      menuConfig: [
        {
          sql,
          facetAliases,
          facetName: 'Consortium',
        },
        {
          sql,
          facetAliases,
          facetName: 'Publication Year',
        },
        {
          sql,
          facetName: 'Theme',
        },
        {
          sql,
          facetAliases,
          facetName: 'diseaseType',
        },
        {
          sql,
          facetAliases,
          facetName: 'experimentalStrategy',
        },
        {
          sql,
          facetAliases,
          facetName: 'tissue_or_organ',
        },
        {
          sql,
          facetAliases,
          facetName: 'grantType',
        }
      ],
    }
  }
}
