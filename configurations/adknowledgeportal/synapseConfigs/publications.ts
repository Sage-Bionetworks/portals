import { HomeExploreConfig, SynapseConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { GenerateComponentsFromRowProps } from '../../types/portal-util-types'
import loadingScreen from '../loadingScreen'

const rgbIndex = 5
const unitDescription = 'Publications'

const sql = 'SELECT * FROM syn20448807'

export const publicationCardProps = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: SynapseConstants.PUBLICATION,
    title: 'title',
    subTitle: 'authors',
    link: 'doi',
    secondaryLabels: [
      'year',
      'journal',
      'consortium',
      'long_amp_ad_grants',
      'doi',
      'pubmed_id',
    ],
  },
}

const facetAliases = {
  consortium: 'Program',
  long_amp_ad_grants: 'Grant',
  doi: 'DOI',
  pubmed_id: 'Pubmed ID',
}

const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      link: 'Explore/Publications',
      linkText: 'Explore Publications',
      facet: 'consortium',
      facetAliases: {
        consortium: 'Program',
      },
      initQueryRequest: {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: false,
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
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      name: 'Publications',
      isConsistent: false,
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'authors',
            hintText: 'LastName',
          },
          {
            columnName: 'consortium',
            hintText: 'AMP-AD',
          },
          {
            columnName: 'doi',
            hintText: '10.1186/s13024-017-0219-3',
          },
          {
            columnName: 'journal',
            hintText: 'Alzheimers Dement',
          },
          {
            columnName: 'title',
            hintText: 'network',
          },
          {
            columnName: 'year',
            hintText: '2018',
          },
          {
            columnName: 'long_amp_ad_grants',
            hintText: 'U01AG046161',
          },
        ],
      },
      cardConfiguration: publicationCardProps,
      menuConfig: [
        {
          sql,
          facet: 'consortium',
        },
        {
          sql,
          facet: 'year',
        },
        {
          sql,
          facet: 'long_amp_ad_grants',
        },
        {
          sql,
        },
      ],
    },
  },
}

const publicationsFromRowProps: GenerateComponentsFromRowProps = {
  sql,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      sql,
      columnName: 'grantNumber',
      tableSqlKeys: ['long_amp_ad_grants'],
      title: 'Publications',
      props: publicationCardProps,
    },
  ],
}
export const publicationProgrammatic: SynapseConfig = {
  name: 'GenerateComponentsFromRow',
  title: 'Publications',
  props: publicationsFromRowProps,
}

export default publications
