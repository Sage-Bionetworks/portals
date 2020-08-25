import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { facetAliases } from './commonProps'

const sql = 'SELECT * FROM syn16859580'
export const datasetsSql = sql
export const newDatasetsSql = `${sql} order by ROW_ID desc limit 3`
const type = 'dataset'
const unitDescription = 'datasets'
const rgbIndex = 8

const datasets: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      facetAliases,
      loadingScreen,
      link: 'Explore/Datasets',
      linkText: 'Explore Datasets',
      facet: 'diseaseFocus',
      sql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      shouldDeepLink: true,
      sql,
      cardConfiguration: {
        type,
      },
      loadingScreen,
      name: 'Datasets',
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'datasetName',
          },
          {
            columnName: 'summary',
          },
          {
            columnName: 'studyName',
          },
          {
            columnName: 'diseaseFocus',
          },
          {
            columnName: 'manifestation',
          },
          {
            columnName: 'fundingAgency',
          },
        ],
      },
    },
  },
}

export default datasets
