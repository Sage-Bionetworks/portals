import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { experimentalModelsSql } from '../resources'
import { SynapseTableProps } from 'synapse-react-client/dist/containers/table/SynapseTable'

// https://sagebionetworks.jira.com/wiki/spaces/PS/pages/1254293523/AMP-AD+Experimental+Models+Schema

const experimentalSchema: GenericCardSchema = {
  type: SynapseConstants.EXPERIMENTAL,
  title: 'name',
  description: 'summary',
  link: 'url',
  secondaryLabels: [
    'modelType',
    'alzforumInformation',
    'mouseModelReport',
    'availableData',
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
      matchColumnName: 'alzforumInformation',
    },
    {
      isMarkdown: true,
      matchColumnName: 'availableData',
    },
    {
      isMarkdown: true,
      matchColumnName: 'mouseModelReport',
    },
    {
      isMarkdown: true,
      matchColumnName: 'supplementaryInformation',
    },
    {
      isMarkdown: false,
      matchColumnName: 'data',
      URLColumnName: 'Study_Name',
      baseURL: 'Explore/Studies/DetailsPage',
    },
    {
      isMarkdown: false,
      matchColumnName: 'grant',
      URLColumnName: 'Grant Number',
      baseURL: 'Explore/Projects/DetailsPage',
    },
  ],
}

export const experimentalDetailsTableConfiguration: SynapseTableProps = {
  showDownloadColumn: false,
  showAccessColumn: false,
  columnLinks: [
    {
      isMarkdown: false,
      matchColumnName: 'name',
      linkColumnName: 'url',
    },
    {
      isMarkdown: true,
      matchColumnName: 'alzforumInformation',
    },
    {
      isMarkdown: false,
      matchColumnName: 'availableData',
      URLColumnName: 'modelSystemName',
      baseURL: 'Explore/Data',
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
      isMarkdown: true,
      matchColumnName: 'mouseModelReport',
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
      link: 'Explore/Experimental Models',
      linkText: 'Explore Experimental Models',
      facet: 'toolType',
      sql: experimentalModelsSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      visibleColumnCount: 10,
      sql: experimentalModelsSql,
      name: 'Experimental Models',
      shouldDeepLink: true,
      hideDownload: true,
      tableConfiguration: experimentalDetailsTableConfiguration,
      facetsToFilter: [
        'modelType',
        'targetedGenes',
        'backgroundStrain',
        'contributor',
        'grant',
        'program',
        'toolType',
      ],
      facetsToPlot: [
        'modelType',
        'targetedGenes',
        'backgroundStrain',
        'contributor',
        'grant',
        'program',
        'toolType',
      ],
      facetAliases: {
        mouseModelReport: 'Model Report Card',
      },
      searchConfiguration: {
        searchable: [
          'name',
          'summary',
          'modelType',
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
