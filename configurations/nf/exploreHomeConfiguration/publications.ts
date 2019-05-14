import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config';

const sql = 'SELECT * FROM syn16857542'
const type = 'publication'
const unitDescription = 'Publications'
const synapseId = 'syn16857542'
const rgbIndex = 0

const facetAliases = {
  projectStatus: 'Project Status',
  dataStatus: 'Data Status',
  fundingAgency: 'Funding Agency',
  tumorType: 'Tumor Type',
  diseaseFocus: 'Disease Focus',
}

const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StackedBarChartControl',
    props: {
      unitDescription,
      rgbIndex,
      name: 'Publications',
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
      facetName: 'diseaseFocus',
      facetAliases: {
        diseaseFocus: 'Disease Focus',
      },
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      synapseId,
      type,
      menuConfig: [
        {
          sql,
          facetAliases,
          synapseId,
          unitDescription,
          facetName: 'fundingAgency',
        },
        {
          sql,
          facetAliases,
          synapseId,
          unitDescription,
          facetName: 'tumorType',
        },
        {
          sql,
          synapseId,
          facetAliases,
          unitDescription,
          facetName: 'diseaseFocus',
        }
      ]
    }
  }
}

export default publications
