import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { detailPageLinks } from './commonProps'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
export const publicationSql = 'SELECT * FROM syn10923842'
export const publicationEntityId = 'syn10923842'
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
    'DOI',
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
  // TODO: Add title link config
  // labelLinkConfig: detailPageLinks,
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
            columnName: 'Theme',
            hintText: 'tumor-immune',
          },
          {
            columnName: 'experimentalStrategy',
            hintText: 'RNA-seq',
          },
          {
            columnName: 'diseaseType',
            hintText: 'Skin Cutaneous Melanoma',
          },
          {
            columnName: 'tissue_or_organ.sv',
            hintText: 'Prostate gland',
          },
          {
            columnName: 'Publication Year',
            hintText: '2018',
          },
          {
            columnName: 'Consortium',
            hintText: 'PS-ON',
          },
          {
            columnName: 'grantType',
            hintText: 'U01',
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
