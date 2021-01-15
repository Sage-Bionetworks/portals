import { HomeExploreConfig } from 'types/portal-config'

import { facetAliases } from './commonProps'
import { filesSql } from '../resources'

const rgbIndex = 1
const unitDescription = 'Files'
const visibleColumnCount = 7

const files: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      unitDescription,
      link: 'Explore/Files',
      linkText: 'Explore Files',
      sql: "SELECT * FROM syn16858331 WHERE resourceType = 'experimentalData'",
      facet: 'assay',
      facetAliases,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      name: 'Files',
      sql: filesSql,
      visibleColumnCount,
      tableConfiguration: {
        showAccessColumn: true,
        showDownloadColumn: true,
      },
      shouldDeepLink: true,
      facetAliases,
    },
  },
}

export default files
