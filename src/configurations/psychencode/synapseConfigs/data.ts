import { SynapseConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'

const sql = 'SELECT * FROM syn20821313'
export const dataSql = sql
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
    entityId: dataEntityId,
    sql,
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
