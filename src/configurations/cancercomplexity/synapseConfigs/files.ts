import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import { filesSql } from '../resources'

const rgbIndex = 8

export const files: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    shouldDeepLink: true,
    sql: filesSql,
    name: 'Files',
    visibleColumnCount: Infinity,
    tableConfiguration: {
      showDownloadColumn: true,
    },
    facetAliases,
    searchConfiguration: {
      searchable: [
        'tummorType',
        'tissue',
        'assay',
        'dataFormat',
        'species',
        'gender',
        'grantName',
        'grant',
      ],
    },
  },
}
