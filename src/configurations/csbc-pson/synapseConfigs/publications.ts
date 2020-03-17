import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
export const publicationSql = 'SELECT * FROM syn21682809'
export const publicationEntityId = 'syn21682809'
const entityId = publicationEntityId
const sql = publicationSql
const unitDescription = 'Publications'
const rgbIndex = 1

export const publicationSchema: GenericCardSchema = {
  type: SynapseConstants.PUBLICATION,
  title: 'publicationTitle',
  subTitle: 'authors',
  secondaryLabels: [
    'journal',
    'publicationYear',
    'theme',
    'tumorType',
    'tissue',
    'assay',
    'keywords',
    'doi',
    'grantName',
    'consortium',
    'grantType',
    'datasets',
  ],
  link: 'PubMed',
}

export const publicationsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: publicationSchema,
  loadingScreen,
  secondaryLabelLimit: 5,
  labelLinkConfig: [
    {
      isMarkdown: false,
      baseURL: 'Explore/Grants/DetailsPage',
      matchColumnName: 'grantName',
      URLColumnName: 'grantName',
    },
    {
      isMarkdown: false,
      baseURL: 'Explore/Datasets',
      URLColumnName: 'grantName',
      matchColumnName: 'datasets',
    },
  ],
}

export const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facet: 'theme',
      link: 'Explore/Publications',
      linkText: 'Explore Publications',
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
      cardConfiguration: publicationsCardConfiguration,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      searchConfiguration: {
        searchable: [
          {
            columnName: 'publicationTitle',
            hintText: 'methylation',
          },
          {
            columnName: 'authors',
            hintText: 'LastName',
          },
          {
            columnName: 'keywords',
            hintText: 'scRNA-seq',
          },
          {
            columnName: 'Journal',
            hintText: 'Nucleic Acids Res',
          },
          {
            columnName: 'DOI',
            hintText: '10.1158/2159-8290.CD-17-0222',
          },
          {
            columnName: 'theme',
            hintText: 'tumor-immune',
          },
          {
            columnName: 'assay',
            hintText: 'RNA-seq',
          },
          {
            columnName: 'tumorType',
            hintText: 'Skin Cutaneous Melanoma',
          },
          {
            columnName: 'tissue',
            hintText: 'Prostate gland',
          },
          {
            columnName: 'publicationYear',
            hintText: '2018',
          },
          {
            columnName: 'consortium',
            hintText: 'PS-ON',
          },
        ],
      },
      name: 'Publications',
      menuConfig: [
        {
          sql,
          facet: 'theme',
        },
        {
          sql,
          facet: 'assay',
        },
        {
          sql,
          facet: 'tumorType',
        },
        {
          sql,
          facet: 'tissue',
        },
        {
          sql,
          facet: 'publicationYear',
        },
        {
          sql,
          facet: 'grantName',
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
