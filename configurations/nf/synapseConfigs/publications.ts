import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import { facetAliases } from './commonProps'
import loadingScreen from '../loadingScreen'

const sql = 'SELECT * FROM syn16857542'
export const publicationsSql = sql
const type = SynapseConstants.GENERIC_CARD
const unitDescription = 'Publications'
const rgbIndex = 0

export const publicationsCardConfiguration = {
  type,
  genericCardSchema: {
    title: 'title',
    type: SynapseConstants.PUBLICATION,
    subTitle: 'author',
    link: 'doi',
    secondaryLabels: {
      0: { key: 'journal', alias: 'Journal' },
      1: { key: 'year', alias: 'Year' },
      2: { key: 'studyName', alias: 'Study Name' },
      3: { key: 'diseaseFocus', alias: 'Disease Focus' },
      4: { key: 'manifestation', alias: 'Manifestation' },
      5: { key: 'fundingAgency', alias: 'Funding Agency' },
      6: { key: 'pmid', alias: 'PubMed ID' },
      7: { key: 'doi', alias: 'DOI' },
    }
  }
}

const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      link: 'Explore/Publications',
      linkText: 'Explore Publications',
      initQueryRequest: {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
            SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
            | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
            | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: false,
          limit: 25,
          offset: 0,
        },
      },
      facet: 'diseaseFocus',
      facetAliases: {
        diseaseFocus: 'Disease Focus',
      },
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      name: 'Publications',
      cardConfiguration: publicationsCardConfiguration,
      facetAliases,
      menuConfig: [
        {
          sql,
          facet: 'fundingAgency'
        },
        {
          sql,
          facet: 'journal'
        },
        {
          sql,
          facet: 'year'
        },
        {
          sql,
          facet: 'studyName'
        },
        {
          sql,
          facet: 'diseaseFocus'
        },
        {
          sql,
          facet: 'manifestation'
        },
      ]
    }
  }
}

export default publications
