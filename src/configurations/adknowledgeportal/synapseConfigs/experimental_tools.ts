import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { toolSql } from '../resources'

const experimentalSchema: GenericCardSchema = {
  type: SynapseConstants.EXPERIMENTAL,
  title: 'name',
  description: 'summary',
  link: 'dataFileHandleId',
  secondaryLabels: [
    'toolType',
    'modelType',
    'AlzForum',
    'modelSystemName',
    'data',
    'supplementaryInformation',
    'contributor',
    'grant',
    'program',
  ],
}

export const experimentalToolsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: experimentalSchema,
  labelLinkConfig: [
    {
      isMarkdown: true,
      matchColumnName: 'AlzForum',
    },
    {
      isMarkdown: false,
      matchColumnName: 'data',
      URLColumnName: 'Study_Name',
      baseURL: 'Explore/Studies/DetailsPage',
    },
    {
      isMarkdown: true,
      matchColumnName: 'supplementaryInformation',
    },
    {
      isMarkdown: false,
      matchColumnName: 'grant',
      URLColumnName: 'Grant Number',
      baseURL: 'Explore/Projects/DetailsPage',
    },
  ],
}

const rgbIndex = 6
const unitDescription = 'Tools'

const experimentalTools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      link: 'Explore/Experimental Tools',
      linkText: 'Explore Experimental Tools',
      facet: 'toolType',
      sql: toolSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: toolSql,
      name: 'Experimental Tools',
      shouldDeepLink: true,
      cardConfiguration: experimentalToolsCardConfiguration,
      facetsToPlot: [
        'toolType',
        'modelType',
        'contributor',
        'grant',
        'program',
        'backgroundStrain',
        'targetedGenes',
      ],
      facetAliases: {
        AlzForum: 'ALZFORUM',
      },
      searchConfiguration: {
        searchable: [
          'name',
          'summary',
          'toolType',
          'contributor',
          'grant',
          'program',
          'backgroundStrain',
          'targetedGenes',
        ],
      },
    },
  },
}

export default experimentalTools
