import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { computationalSql } from '../resources'

const computationalSchema: GenericCardSchema = {
  type: SynapseConstants.COMPUTATIONAL,
  title: 'name',
  description: 'summary',
  subTitle: 'softwareType',
  secondaryLabels: ['contributor', 'program', 'grant', 'documentation'],
  link: 'url',  
}

export const computationalCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: computationalSchema,  
  labelLinkConfig: [{
    isMarkdown: false,
    matchColumnName: 'grant',
    URLColumnName: 'Grant Number',
    baseURL: 'Explore/Projects/DetailsPage',
  }]
}

const rgbIndex = 7
const unitDescription = 'Tools'

const computationalTools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      link: 'Explore/Computational Tools',
      linkText: 'Explore Computational Tools',
      facet: 'softwareType',
      sql: computationalSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: computationalSql,
      cardConfiguration: computationalCardConfiguration,
      shouldDeepLink: true,
      name: 'Computational Tools',
      facetsToPlot: ['grant', 'program', 'softwareType'],
      searchConfiguration: {
        searchable: [
          'contributor',
          'name',
          'grant',
          'program',
          'softwareType',
          'summary',          
        ],
      },
    },
  },
}

export default computationalTools
