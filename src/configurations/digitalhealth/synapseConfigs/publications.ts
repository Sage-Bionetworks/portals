import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import {
  CardConfiguration,
  CardContainerLogicProps,
} from 'synapse-react-client/dist/containers/CardContainerLogic'
import { publicationSql } from '../resources'

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
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      facet,
      unitDescription,
      loadingScreen,
      link: 'Explore/Files',
      linkText: 'Explore Files',
      sql: publicationSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      shouldDeepLink: true,
      hideDownload: true,
      sql: publicationSql,
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
