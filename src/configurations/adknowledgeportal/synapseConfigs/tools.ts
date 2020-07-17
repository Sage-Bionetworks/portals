import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import loadingScreen from '../loadingScreen'
import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'

const computationalSchema: GenericCardSchema = {
  type: 'TOOL',
  title: 'name',
  subTitle: 'softwareType',
  description: 'summary',
  icon: 'toolType',
  secondaryLabels: ['contributor', 'program', 'grant', 'documentation'],
  link: 'url',
}

const experimentalSchema: GenericCardSchema = {
  type: 'TOOL',
  title: 'name',
  subTitle: 'reagentType',
  description: 'summary',
  icon: 'toolType',
  secondaryLabels: [
    'contributor',
    'diagnosis',
    'modelType',
    'modelSystemName',
    'grant',
    'program',
  ],
  link: 'url',
}

const facetAliases = {
  modelSystemName: 'Model Name',
  summary: 'Summary',
}

const entityId = 'syn20337467'
const computationalSql =
  "SELECT * FROM syn20337467 WHERE toolType = 'computational'"
const experimentalSql =
  "SELECT * FROM syn20337467 WHERE toolType = 'experimental'"
const searchConfiguration = {
  searchable: [
    {
      columnName: 'displayName',
      hintText: 'APOE4',
    },
    {
      columnName: 'summary',
      hintText: 'network',
    },
    {
      columnName: 'contributor',
      hintText: 'LastName',
    },
    {
      columnName: 'diagnosis',
      hintText: 'LOAD',
    },
    {
      columnName: 'reagentType',
      hintText: 'Mouse',
    },
    {
      columnName: 'modelSystemName',
      hintText: 'APP',
    },
    {
      columnName: 'modelType',
      hintText: 'Trem2',
    },
    {
      columnName: 'softwareType',
      hintText: 'web application',
    },
    {
      columnName: 'program',
      hintText: 'MODEL-AD',
    },
    {
      columnName: 'grant',
      hintText: 'U01AG046139',
    },
    {
      columnName: 'consortium',
      hintText: 'AMP-AD',
    },
  ],
}
const rgbIndex = 6
const unitDescription = 'Tools'

const tools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      link: 'Explore/Tools',
      linkText: 'Explore Tools',
      facet: 'toolType',
      facetAliases: {
        toolType: 'Tool Type',
      },
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql: 'SELECT * FROM syn20337467',
          limit: 25,
          offset: 0,
        },
      },
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex: 6,
      facetAliases,
      name: 'Tools',
      entityId,
      shouldDeepLink: true,
      globalQueryCountSql: 'SELECT * FROM syn20337467',
      accordionConfig: [
        {
          name: 'Computational',
          cardConfiguration: {
            type: SynapseConstants.GENERIC_CARD,
            genericCardSchema: computationalSchema,
            loadingScreen,
          },
          searchConfiguration,
          menuConfig: [
            {
              sql: computationalSql,
              facet: 'softwareType',
            },
            {
              sql: computationalSql,
              facet: 'diagnosis',
            },
            {
              sql: computationalSql,
              facet: 'program',
            },
            {
              sql: computationalSql,
              facet: 'grant',
            },
            {
              sql: computationalSql,
            },
          ],
        },
        {
          name: 'Experimental',
          cardConfiguration: {
            type: SynapseConstants.GENERIC_CARD,
            genericCardSchema: experimentalSchema,
            loadingScreen,
          },
          searchConfiguration,
          menuConfig: [
            {
              sql: experimentalSql,
              facet: 'reagentType',
            },
            {
              sql: experimentalSql,
              facet: 'modelType',
            },
            {
              sql: experimentalSql,
              facet: 'diagnosis',
            },
            {
              sql: experimentalSql,
              facet: 'program',
            },
            {
              sql: experimentalSql,
              facet: 'grant',
            },
            {
              sql: experimentalSql,
            },
          ],
        },
      ],
    },
  },
}

export default tools
