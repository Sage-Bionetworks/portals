import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { facetAliases } from './commonProps'

const rgbIndex = 1
const unitDescription = 'Files'
const visibleColumnCount = 7
export const filesEntityId = 'syn16858331'

const files: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
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
      sql: `SELECT id AS "File ID", assay, dataType, diagnosis, tumorType,  species, individualID,  fileFormat, dataSubtype, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", studyName, fundingAgency, consortium, name AS "File Name", accessType, accessTeam  FROM syn16858331 WHERE resourceType = 'experimentalData'`,
      visibleColumnCount,
      loadingScreen,
      tableConfiguration: {
        showAccessColumn: true,
      },
      shouldDeepLink: true,
      facetAliases,
    },
  },
}

export default files
