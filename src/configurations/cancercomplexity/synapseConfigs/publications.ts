import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
import { publicationSql } from '../resources'
const unitDescription = 'Publications'
const rgbIndex = 1

export const publicationSchema: GenericCardSchema = {
  type: SynapseConstants.PUBLICATION,
  title: 'publicationTitle',
  subTitle: 'authors',
  secondaryLabels: [
    'pubMedLink',
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
    'dataset',
  ],
}

export const publicationsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: publicationSchema,
  secondaryLabelLimit: 5,
  titleLinkConfig: {
    isMarkdown: false,
    URLColumnName: 'publicationTitle',
    matchColumnName: 'publicationTitle',
    baseURL: 'Explore/Publications/DetailsPage',
  },
  labelLinkConfig: [
    {
      isMarkdown: true,
      matchColumnName: 'pubMedLink',
    },
    {
      isMarkdown: false,
      baseURL: 'Explore/Grants/DetailsPage',
      matchColumnName: 'grantName',
      URLColumnName: 'grantName',
    },
    {
      isMarkdown: false,
      baseURL: 'Explore/Datasets/DetailsPage',
      URLColumnName: 'datasetAlias',
      matchColumnName: 'dataset',
    },
  ],
}

export const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      unitDescription,
      facet: 'theme',
      link: 'Explore/Publications',
      linkText: 'Explore Publications',
      sql: publicationSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      cardConfiguration: publicationsCardConfiguration,
      sql: publicationSql,
      shouldDeepLink: true,
      name: 'Publications',
      facetAliases,
      searchConfiguration: {
        searchable: [
          'publicationTitle',
          'authors',
          'journal',
          'doi',
          'pubMedId',
          'keywords',
          'tummorType',
          'tissue',
          'assay',
          'grantName',
          'grantNumber',
          'dataset',
        ],
      },
    },
  },
}
