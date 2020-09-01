import { SynapseConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { dataSql } from '../resources'

export const dataEntityId = 'syn20821313'

const facetAliases = {
  id: 'File',
}

const rgbIndex = 8
const unitDescription = 'files'

export const data: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    unitDescription,
    sql: dataSql,
    tableConfiguration: {
      showAccessColumn: true,
      columnLinks: [
        {
          matchColumnName: 'study',
          URLColumnName: 'studyName',
          baseURL: 'Explore/Studies/DetailsPage',
          isMarkdown: false,
        },
      ],
    },
    visibleColumnCount: 10,
    loadingScreen,
    shouldDeepLink: true,
    name: 'Data',
    facetAliases,
    facetsToPlot: [
      'study',
      'dataType',
      'species',
      'tissue',
      'referenceSet',
      'fileFormat',
    ],
  },
}
