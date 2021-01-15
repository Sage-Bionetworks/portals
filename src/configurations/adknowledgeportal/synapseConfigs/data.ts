import { HomeExploreConfig } from 'types/portal-config'
import { dataSql } from '../resources'

const unitDescription = 'data files'
const rgbIndex = 1

const data: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      facet: 'study',
      link: 'Explore/Data',
      linkText: 'Explore Data',
      sql: dataSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      name: 'Data',
      visibleColumnCount: 10,
      tableConfiguration: {
        showAccessColumn: true,
        showDownloadColumn: true,
        columnLinks: [
          {
            matchColumnName: 'study',
            isMarkdown: false,
            baseURL: 'Explore/Studies/DetailsPage',
            URLColumnName: 'Study_Name',
            wrapValueWithParens: true,
          },
        ],
      },
      sql: dataSql,
      shouldDeepLink: true,
    },
  },
}

export default data
