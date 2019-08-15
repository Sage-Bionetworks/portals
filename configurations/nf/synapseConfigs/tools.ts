import { GenericCardSchema } from "synapse-react-client/dist/containers/GenericCard"
import loadingScreen from '../loadingScreen'
import { SynapseConstants } from "synapse-react-client"
import { HomeExploreConfig } from "types/portal-util-types"
export const toolsSql = 'SELECT * FROM syn16859448'

export const toolsSchema: GenericCardSchema = {
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

const searchConfiguration = {
  searchable: [
    {
      columnName: 'name',
      hintText: ''
    },
    {
      columnName: 'summary',
      hintText: ''
    },
    {
      columnName: 'studyName',
      hintText: ''
    },
    {
      columnName: 'fundingAgency',
      hintText: ''
    },
    {
      columnName: 'contact',
      hintText: ''
    },
    {
      columnName: 'type',
      hintText: ''
    },
    {
      columnName: 'subtype',
      hintText: ''
    },
    {
      columnName: 'diseaseFocus',
      hintText: ''
    },
    {
      columnName: 'manifestation',
      hintText: ''
    },
  ]
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
      facet: 'type',
      facetAliases: {
        type: 'Type'
      }
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      facetAliases,
      accordionConfig: [
        {
          name: 'Computational',
          cardConfiguration: {
            type: SynapseConstants.GENERIC_CARD,
            genericCardSchema: toolsSchema,
            loadingScreen
          },
          searchConfiguration,
          menuConfig: [
            {
              sql: computationalSql,
              facet: 'studyName'
            },
            {
              sql: computationalSql,
              facet: 'fundingAgency'
            },
            {
              sql: computationalSql,
              facet: 'subtype'
            },
            {
              sql: computationalSql,
              facet: 'diseaseFocus'
            },
            {
              sql: computationalSql,
              facet: 'manifestation'
            },
            {
              sql: computationalSql,
            },
          ]
        },
        {
          name: 'Experimental',
          cardConfiguration: {
            type: SynapseConstants.GENERIC_CARD,
            genericCardSchema: toolsSchema,
            loadingScreen
          },
          searchConfiguration,
          menuConfig: [
            {
              sql: experimentalSql,
              facet: 'studyName'
            },
            {
              sql: experimentalSql,
              facet: 'fundingAgency'
            },
            {
              sql: experimentalSql,
              facet: 'subtype'
            },
            {
              sql: experimentalSql,
              facet: 'diseaseFocus'
            },
            {
              sql: experimentalSql,
              facet: 'manifestation'
            },
            {
              sql: experimentalSql,
            },
          ]
        },
        {
          name: 'Clinical',
          cardConfiguration: {
            type: SynapseConstants.GENERIC_CARD,
            genericCardSchema: toolsSchema,
            loadingScreen
          },
          searchConfiguration,
          menuConfig: [
            {
              sql: clinicalSql,
              facet: 'studyName'
            },
            {
              sql: clinicalSql,
              facet: 'fundingAgency'
            },
            {
              sql: clinicalSql,
              facet: 'subtype'
            },
            {
              sql: clinicalSql,
              facet: 'diseaseFocus'
            },
            {
              sql: clinicalSql,
              facet: 'manifestation'
            },
            {
              sql: clinicalSql,
            },
          ]
        },
      ]
    }
  }
}

export default tools
