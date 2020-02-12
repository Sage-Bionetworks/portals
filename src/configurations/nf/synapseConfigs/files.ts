import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { facetAliases } from './commonProps'

const rgbIndex = 1
const unitDescription = 'Files'
const title = 'Files'
const visibleColumnCount = 7
export const filesEntityId = 'syn16858331'
const entityId = filesEntityId

const files: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      link: 'Explore/Files',
      linkText: 'Explore Files',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          isConsistent: true,
          limit: 25,
          offset: 0,
          sql:
            "SELECT * FROM syn16858331 WHERE resourceType = 'experimentalData'",
        },
      },
      facet: 'assay',
      facetAliases,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      name: 'Files',
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      tableConfiguration: {
        title,
        visibleColumnCount,
      },
      entityId,
      facetAliases,
      menuConfig: [
        {
          sql: `
            SELECT id AS "File ID", assay, dataType, diagnosis, tumorType,  species, individualID,  fileFormat, dataSubtype, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", studyName, fundingAgency, consortium, name AS "File Name", accessType, accessTeam  FROM syn16858331 WHERE resourceType = 'experimentalData'
          `,
          facet: 'assay',
        },
        {
          sql: `
            SELECT id AS "File ID", dataType, assay, diagnosis, tumorType, species, individualID, fileFormat, dataSubtype, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", studyName, fundingAgency, consortium, name AS "File Name", accessType, accessTeam  FROM syn16858331 where resourceType = 'experimentalData'
          `,
          facet: 'dataType',
        },
        {
          sql: `
            SELECT id AS "File ID", tumorType, diagnosis, species, individualID, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", dataType, assay, fileFormat, dataSubtype, studyName, fundingAgency, consortium, name AS "File Name", accessType, accessTeam  FROM syn16858331 where resourceType = 'experimentalData'
          `,
          facet: 'tumorType',
        },
        {
          sql: `
            SELECT id AS "File ID", fileFormat, dataType, assay, diagnosis, tumorType, species, individualID, dataSubtype, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", studyName, fundingAgency, consortium, name AS "File Name", accessType, accessTeam  FROM syn16858331 where resourceType = 'experimentalData'
          `,
          facet: 'fileFormat',
        },
        {
          sql: `
            SELECT id AS "File ID", fundingAgency, studyName, consortium, dataType, assay, diagnosis, tumorType, species, fileFormat, individualID, dataSubtype, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", name AS "File Name", accessType, accessTeam  FROM syn16858331 where resourceType = 'experimentalData'
          `,
          facet: 'fundingAgency',
        },
        {
          sql: `
            SELECT id AS "File ID", nf1Genotype as "NF1 Genotype", diagnosis, tumorType, species, individualID, dataType, assay, fileFormat, dataSubtype, studyName, fundingAgency, consortium, name AS "File Name", nf2Genotype as "NF2 Genotype", accessType, accessTeam  FROM syn16858331 where resourceType = 'experimentalData'
          `,
          facet: 'nf1Genotype',
        },
        {
          sql: `
            SELECT id AS "File ID", nf2Genotype as "NF2 Genotype", diagnosis, tumorType, species, individualID, dataType, assay, fileFormat, dataSubtype, studyName, fundingAgency, consortium, name AS "File Name",  nf1Genotype as "NF1 Genotype", accessType, accessTeam  FROM syn16858331 where resourceType = 'experimentalData'
          `,
          facet: 'nf2Genotype',
        },
        {
          sql: `
            SELECT id AS "File ID", species, diagnosis, tumorType, individualID, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", dataType, assay, fileFormat, dataSubtype, studyName, fundingAgency, consortium, name AS "File Name" FROM syn16858331 where resourceType = 'experimentalData'
          `,
          facet: 'species',
        },
        {
          sql: `
            SELECT id AS "File ID", isCellLine AS "Is Cell Line", species, diagnosis, tumorType, individualID, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", dataType, assay, fileFormat, dataSubtype, studyName, fundingAgency, consortium, name AS "File Name" FROM syn16858331 where resourceType = 'experimentalData'
          `,
          facet: 'isCellLine',
        },
        {
          sql: `
            SELECT id AS "File ID",isMultiSpecimen AS "Is Multi-specimen", species, diagnosis, tumorType, individualID, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", dataType, assay, fileFormat, dataSubtype, studyName, fundingAgency, consortium, name AS "File Name" FROM syn16858331 where resourceType = 'experimentalData'
          `,
          facet: 'isMultiSpecimen',
        },
        {
          sql: `
            SELECT id AS "File ID", accessType, accessTeam, dataType, assay, diagnosis, tumorType, species, individualID, fileFormat, dataSubtype, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", fundingAgency, consortium, name AS "File Name" FROM syn16858331 where resourceType = 'experimentalData'
          `,
          facet: 'accessType',
        },
      ],
    },
  },
}

export default files
