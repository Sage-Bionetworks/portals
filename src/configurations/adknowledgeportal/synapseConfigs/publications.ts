import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { DetailsPageProps } from 'types/portal-util-types'
import { projectsSql, publicationsSql } from '../resources'

const rgbIndex = 5
const unitDescription = 'Publications'

export const publicationCardProps = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: SynapseConstants.PUBLICATION,
    title: 'title',
    subTitle: 'authors',
    link: 'doi',
    secondaryLabels: [
      'year',
      'journal',
      'consortium',
      'long_amp_ad_grants',
      'doi',
      'pubmed_id',
    ],
  },
}

const facetAliases = {
  consortium: 'Program',
  long_amp_ad_grants: 'Grant',
  doi: 'DOI',
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
      facet: 'consortium',
      facetAliases: {
        consortium: 'Program',
      },
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
      facetsToPlot: ['consortium', 'year', 'long_amp_ad_grants', 'journal'],
      cardConfiguration: publicationCardProps,
      facetAliases,
    },
  },
}

const publicationsFromRowProps: DetailsPageProps = {
  sql: projectsSql,
  showMenu: false,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      columnName: 'Grant Number',
      title: 'Publications',
      showTitleSeperator: false,
      tableSqlKeys: ['long_amp_ad_grants'],
      props: {
        sql: publicationsSql,
        ...publicationCardProps,
      },
    },
  ],
}
export const publicationProgrammatic: SynapseConfig = {
  name: 'DetailsPage',
  props: publicationsFromRowProps,
}

export default publications
