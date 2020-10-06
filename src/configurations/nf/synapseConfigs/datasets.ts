import { HomeExploreConfig } from 'types/portal-config'

import { facetAliases } from './commonProps'
import { datasetsSql } from '../resources'

export const newDatasetsSql = `${datasetsSql} order by ROW_ID desc limit 3`
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
      link: 'Explore/Datasets',
      linkText: 'Explore Datasets',
      facet: 'diseaseFocus',
      sql: datasetsSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      shouldDeepLink: true,
      sql: datasetsSql,
      cardConfiguration: {
        type,
      },
      name: 'Datasets',
      facetAliases,
      searchConfiguration: {
        searchable: [
          'datasetName',
          'summary',
          'studyName',
          'diseaseFocus',
          'manifestation',
          'fundingAgency',
        ],
      },
    },
  },
}

export default datasets
