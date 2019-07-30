import { GenericCardSchema } from "synapse-react-client/dist/containers/GenericCard"
import loadingScreen from '../loadingScreen'
import { SynapseConstants } from "synapse-react-client"
import { HomeExploreConfig } from "types/portal-util-types"
export const toolsSql = 'SELECT * FROM syn16859448'

const toolsSchema: GenericCardSchema = {
  type: 'TOOL',
  title: 'name',
  subTitle: 'contact',
  description: 'summary',
  icon: 'type',
  secondaryLabels: {
    0: { key: 'subtype', alias: 'Sub Type' },
    1: { key: 'diseaseFocus', alias: 'Disease Focus' },
    2: { key: 'manifestation', alias: 'Manifestation' },
    3: { key: 'fundingAgency', alias: 'Funding Agency' },
    4: { key: 'studyName', alias: 'Study Name' },
  },
  link: 'link',
}

const facetAliases = {
  studyName: 'Study Name',
  fundingAgency: 'Funding Agency',
  type: 'Type',
  subtype: 'Sub Type',
  diseaseFocus: 'Disease Focus',
  manifestation: 'Manifestation'
}
const computationalSql = "SELECT * FROM syn16859448 WHERE type = 'computational'"
const experimentalSql = "SELECT * FROM syn16859448 WHERE type = 'experimental'"
const clinicalSql = "SELECT * FROM syn16859448 WHERE type = 'clinical'"
const rgbIndex = 6

const tools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription: 'Tools',
      link: 'Explore/Tools',
      linkText: 'Explore Tools',
      initQueryRequest: {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
            SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
            | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
            | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql: "SELECT * FROM syn16859448",
          isConsistent: false,
          limit: 25,
          offset: 0,
        },
      },
      facetName: 'type',
      facetAliases: {
        type: 'Type'
      }
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      accordionConfig: [
        {
          name: 'Computational',
          unitDescription: 'tools from Computational',
          cardConfiguration: {
            type: SynapseConstants.GENERIC_CARD,
            genericCardSchema: toolsSchema,
            loadingScreen
          },
          menuConfig: [
            {
              sql: computationalSql,
              facetName: 'studyName',
              facetAliases
            },
            {
              sql: computationalSql,
              facetName: 'fundingAgency',
              facetAliases
            },
            {
              sql: computationalSql,
              facetName: 'subtype',
              facetAliases
            },
            {
              sql: computationalSql,
              facetName: 'diseaseFocus',
              facetAliases
            },
            {
              sql: computationalSql,
              facetName: 'manifestation',
              facetAliases
            },
          ]
        },
        {
          name: 'Experimental',
          unitDescription: 'tools from Experimental',
          cardConfiguration: {
            type: SynapseConstants.GENERIC_CARD,
            genericCardSchema: toolsSchema,
            loadingScreen
          },
          menuConfig: [
            {
              sql: experimentalSql,
              facetName: 'studyName',
              facetAliases
            },
            {
              sql: experimentalSql,
              facetName: 'fundingAgency',
              facetAliases
            },
            {
              sql: experimentalSql,
              facetName: 'subtype',
              facetAliases
            },
            {
              sql: experimentalSql,
              facetName: 'diseaseFocus',
              facetAliases
            },
            {
              sql: experimentalSql,
              facetName: 'manifestation',
              facetAliases
            },
          ]
        },
        {
          name: 'Clinical',
          unitDescription: 'tools from Clinical',
          cardConfiguration: {
            type: SynapseConstants.GENERIC_CARD,
            genericCardSchema: toolsSchema,
            loadingScreen
          },
          menuConfig: [
            {
              sql: clinicalSql,
              facetName: 'studyName',
              facetAliases
            },
            {
              sql: clinicalSql,
              facetName: 'fundingAgency',
              facetAliases
            },
            {
              sql: clinicalSql,
              facetName: 'subtype',
              facetAliases
            },
            {
              sql: clinicalSql,
              facetName: 'diseaseFocus',
              facetAliases
            },
            {
              sql: clinicalSql,
              facetName: 'manifestation',
              facetAliases
            },
          ]
        },
      ]
    }
  }
}

export default tools
