import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { publicationsSql } from '../resources'

const rgbIndex = 5
const unitDescription = 'Publications'

export const publicationCardProps = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: SynapseConstants.PUBLICATION,
    title: 'title',
    subTitle: 'authors',
    link: 'DOI',
    secondaryLabels: [
      'year',
      'journal',
      'Program',
      'grant',
      'DOI',
      'pubmed_id',
    ],
  },
}

const facetAliases = {
  pubmed_id: 'Pubmed ID',
}

const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      link: 'Explore/Publications',
      linkText: 'Explore Publications',
      facet: 'Program',
      sql: publicationsSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: publicationsSql,
      name: 'Publications',
      shouldDeepLink: true,
      facetsToPlot: ['Program', 'year', 'grant', 'journal'],
      cardConfiguration: publicationCardProps,
      facetAliases,
    },
  },
}



export default publications
