import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { facetAliases } from './commonProps'
export const publicationSql = 'SELECT * FROM syn10923842'
const sql = publicationSql
const unitDescription = 'Publications'
const rgbIndex = 1

export const publicationSchema: GenericCardSchema = {
  type: SynapseConstants.PUBLICATION,
  title: 'Title',
  subTitle: 'Authors',
  description: 'abstract',
  secondaryLabels: [
    'Journal',
    'Publication Year',
    'Theme',
    'diseaseType',
    'tissue_or_organ.sv',
    'experimentalStrategy',
    'Keywords',
    'DOI',
    'Grant',
    'Consortium',
    'grantType',
    'datasets',
    'studies',
  ],
  link: 'PubMed',
}

export const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facet: 'Consortium',
      link: 'Explore/Publications',
      linkText: 'Explore Publications',
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
      cardConfiguration: {
        type: SynapseConstants.GENERIC_CARD,
        genericCardSchema: publicationSchema,
        secondaryLabelLimit: 5,
        labelConfig: [
          {
            isMarkdown: false,
            baseURL: 'Explore/Datasets',
            URLColumnNames: ['datasets'],
            matchColumnName: 'datasets',
          },
          {
            isMarkdown: false,
            baseURL: 'Explore/Studies',
            URLColumnNames: ['studies'],
            matchColumnName: 'studies',
          },
        ],
      },
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      searchConfiguration: {
        searchable: [
          {
            columnName: 'Title',
            hintText: 'methylation',
          },
          {
            columnName: 'Authors',
            hintText: 'LastName',
          },
          {
            columnName: 'Keywords',
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
      facetAliases,
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
          facet: 'diseaseType',
        },
        {
          sql,
          facet: 'tissue_or_organ.sv',
        },
        {
          sql,
          facet: 'Publication Year',
        },
        {
          sql,
          facet: 'Consortium',
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
