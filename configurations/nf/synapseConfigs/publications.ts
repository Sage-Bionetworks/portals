import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import { facetAliases } from './commonProps'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import loadingScreen from '../loadingScreen'

const sql = 'SELECT * FROM syn16857542'
export const publicationsSql = sql
export const publicationsEntityId = 'syn16857542'
export const entityId = publicationsEntityId
const type = SynapseConstants.GENERIC_CARD
const unitDescription = 'Publications'
const rgbIndex = 0

export const publicationsCardConfiguration: CardConfiguration = {
  type,
  labelLinkConfig: [
    {
      isMarkdown: false,
      baseURL: 'Explore/Studies',
      URLColumnName: 'studyName',
      matchColumnName: 'studyName',
    },
  ],
  genericCardSchema: {
    title: 'title',
    type: SynapseConstants.PUBLICATION,
    subTitle: 'author',
    link: 'doi',
    secondaryLabels: [
      'journal',
      'year',
      'studyName',
      'diseaseFocus',
      'manifestation',
      'fundingAgency',
      'pmid',
      'doi',
    ],
  },
  loadingScreen,
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
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: true,
          limit: 25,
          offset: 0,
        },
      },
      facet: 'diseaseFocus',
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      entityId,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      name: 'Publications',
      cardConfiguration: publicationsCardConfiguration,
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'title',
            hintText: 'Schwann',
          },
          {
            columnName: 'author',
            hintText: 'Weimer',
          },
          {
            columnName: 'journal',
            hintText: 'neuro',
          },
          {
            columnName: 'pmid',
            hintText: '29055717',
          },
          {
            columnName: 'year',
            hintText: '2018',
          },
          {
            columnName: 'fundingAgency',
            hintText: 'NTAP',
          },
          {
            columnName: 'studyName',
            hintText: 'Plexiform',
          },
          {
            columnName: 'diseaseFocus',
            hintText: 'Neurofibromatosis 2',
          },
          {
            columnName: 'manifestation',
            hintText: 'MPNST',
          },
        ],
      },
      menuConfig: [
        {
          sql,
          facet: 'fundingAgency',
        },
        {
          sql,
          facet: 'journal',
        },
        {
          sql,
          facet: 'year',
        },
        {
          sql,
          facet: 'studyName',
        },
        {
          sql,
          facet: 'diseaseFocus',
        },
        {
          sql,
          facet: 'manifestation',
        },
        {
          sql,
        },
      ],
    },
  },
}

export default publications
