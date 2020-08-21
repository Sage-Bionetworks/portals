import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'

const unitDescription = 'Tools'
const rgbIndex = 8
export const toolsSql = 'SELECT * FROM syn21438237'
const sql = toolsSql
const facet = 'Project'

export const toolCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  loadingScreen,
  genericCardSchema: {
    type: SynapseConstants.COMPUTATIONAL,
    title: 'title',
    description: 'toolDescription',
    secondaryLabels: ['toolLink', 'contributor', 'institutions', 'project'],
  },
  secondaryLabelLimit: 4,
  labelLinkConfig: [
    {
      isMarkdown: true,
      matchColumnName: 'toolLink',
    },
  ],
}

const tools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      facet,
      loadingScreen,
      link: 'Explore/Tools',
      linkText: 'Explore Tools',
      sql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql,
      shouldDeepLink: true,
      hideDownload: true,
      facetsToPlot: ['contributor', 'institutions'],
      name: 'Tools',
      cardConfiguration: toolCardConfiguration,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'title',
          },
          {
            columnName: 'toolDescription',
          },
          {
            columnName: 'contributor',
          },
          {
            columnName: 'institutions',
          },
        ],
      },
    },
  },
}

export default tools
