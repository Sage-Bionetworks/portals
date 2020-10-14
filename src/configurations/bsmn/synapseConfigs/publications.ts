import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { publicationsSql } from '../resources'

const unitDescription = 'Publications'
const rgbIndex = 5
const facet = 'Program'

export const publicationsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: 'Publication',
    title: 'title',
    subTitle: 'authors',
    secondaryLabels: ['year', 'journal', 'doi', 'grantNumber'],
  },
  secondaryLabelLimit: 4,
}

const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      facet,
      link: 'Explore/Publications',
      linkText: 'Explore Publications',
      sql: publicationsSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      shouldDeepLink: true,
      hideDownload: true,
      name: 'Publications',
      cardConfiguration: publicationsCardConfiguration,
      sql: publicationsSql,
      facetsToPlot: ['grantNumber', 'year', 'journal', 'projectTitle'],
      searchConfiguration: {
        searchable: [
          'title',
          'authors',
          'year',
          'journal',
          'grantNumber',          
        ],
      },
    },
  },
}

export default publications
