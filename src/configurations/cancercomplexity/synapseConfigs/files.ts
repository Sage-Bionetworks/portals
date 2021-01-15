import { HomeExploreConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import { filesSql } from '../resources'

const rgbIndex = 8
const unitDescription = 'files'
const facet = 'grantType'

export const files: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      facet,
      unitDescription,
      link: 'Explore/Files',
      linkText: 'Explore Files',
      sql: filesSql,
    },
  },
  explorePageSynapseObject: {
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
  },
}
