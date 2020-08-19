import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import {
  CardConfiguration,
  CardContainerLogicProps,
} from 'synapse-react-client/dist/containers/CardContainerLogic'

const sql = 'SELECT * FROM syn22017695 ORDER BY "Year" DESC, "Title" ASC'
export const publicationEntityId = 'syn22017695'
const entityId = publicationEntityId
export const publicationSql = sql

const rgbIndex = 7
const unitDescription = 'Publications'
const facet = 'study'

export const publicationSchema: GenericCardSchema = {
  type: SynapseConstants.PUBLICATION,
  title: 'Title',
  subTitle: 'Author',
  secondaryLabels: [
    'Year',
    'Journal',
    'doi',
    'PMID',
    'studyOrProject',
    'Tools',
    'sensorType',
    'digitalAssessmentCategory',
  ],
  link: 'url',
}

export const publicationCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: publicationSchema,
  labelLinkConfig: [
    {
      matchColumnName: 'Tools',
      URLColumnName: 'softwareName',
      baseURL: 'Explore/Tools/DetailsPage',
      isMarkdown: false,
    },
    {
      matchColumnName: 'studyOrProject',
      isMarkdown: true,
    },
  ],
  loadingScreen,
}

export const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      facet,
      unitDescription,
      loadingScreen,
      link: 'Explore/Files',
      linkText: 'Explore Files',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          limit: 25,
          offset: 0,
        },
      },
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      shouldDeepLink: true,
      hideDownload: true,
      sql,
      name: 'Publications',
      cardConfiguration: publicationCardConfiguration,
      loadingScreen,
      visibleColumnCount: Infinity,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'Author',
          },
          {
            columnName: 'Diagnosis',
          },
          {
            columnName: 'Journal',
          },
          {
            columnName: 'Title',
          },
          {
            columnName: 'Year',
          },
          {
            columnName: 'digitalAssessmentCategory',
          },
          {
            columnName: 'sensorType',
          },
          {
            columnName: 'Tools',
          },
        ],
      },
    },
  },
}

export const publicationDetailPageProps: CardContainerLogicProps = {
  sql: publicationSql,
  ...publicationCardConfiguration,
  sqlOperator: 'LIKE',
}
