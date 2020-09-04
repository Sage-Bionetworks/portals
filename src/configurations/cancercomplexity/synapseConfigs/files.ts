import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
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
      loadingScreen,
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
      loadingScreen,
      visibleColumnCount: Infinity,
      tableConfiguration: {},
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'tummorType',
          },
          {
            columnName: 'tissue',
          },
          {
            columnName: 'assay',
          },
          {
            columnName: 'dataFormat',
          },
          {
            columnName: 'species',
          },
          {
            columnName: 'gender',
          },
          {
            columnName: 'grantName',
          },
          {
            columnName: 'grant',
          },
        ],
      },
    },
  },
}
