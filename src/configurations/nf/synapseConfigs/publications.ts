import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { facetAliases } from './commonProps'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import loadingScreen from '../loadingScreen'

const sql = 'SELECT * FROM syn16857542'
export const publicationsSql = sql
export const newPublicationsSql = `${sql} order by ROW_ID desc limit 3`
const type = SynapseConstants.GENERIC_CARD
const unitDescription = 'Publications'
const rgbIndex = 0

export const publicationsCardConfiguration: CardConfiguration = {
  type,
  labelLinkConfig: [
    {
      isMarkdown: false,
      baseURL: 'Explore/Studies/DetailsPage',
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
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      link: 'Explore/Publications',
      linkText: 'Explore Publications',
      sql,
      facet: 'diseaseFocus',
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      loadingScreen,
      sql,
      shouldDeepLink: true,
      name: 'Publications',
      cardConfiguration: publicationsCardConfiguration,
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'title',
          },
          {
            columnName: 'author',
          },
          {
            columnName: 'journal',
          },
          {
            columnName: 'pmid',
          },
          {
            columnName: 'year',
          },
          {
            columnName: 'fundingAgency',
          },
          {
            columnName: 'studyName',
          },
          {
            columnName: 'diseaseFocus',
          },
          {
            columnName: 'manifestation',
          },
        ],
      },
    },
  },
}

export default publications
