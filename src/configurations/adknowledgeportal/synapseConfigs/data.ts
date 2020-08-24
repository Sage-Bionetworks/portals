import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'

const unitDescription = 'data files'
const rgbIndex = 1
const sql = 'SELECT * FROM syn11346063'

const data: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      facet: 'study',
      link: 'Explore/Data',
      linkText: 'Explore Data',
      sql,
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
        columnLinks: [
          {
            matchColumnName: 'study',
            isMarkdown: false,
            baseURL: 'Explore/Studies/DetailsPage',
            URLColumnName: 'Study_Name',
          },
        ],
      },
      loadingScreen,
      sql,
      shouldDeepLink: true,
    },
  },
}

export default data
