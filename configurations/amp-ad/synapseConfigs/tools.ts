import { SynapseConfig } from '../../types/portal-config'
import { GenericCardSchema } from "synapse-react-client/dist/containers/GenericCard"
import loadingScreen from '../loadingScreen'
import { SynapseConstants } from "synapse-react-client"

const computationalSchema: GenericCardSchema = {
  type: 'TOOL',
  title: 'title',
  subTitle: 'reagantType',
  description: 'summary',
  icon: 'icon',
  secondaryLabels: {
    0: { key: 'contributor', alias: 'Contributor' },
    1: { key: 'program', alias: 'Program' },
    2: { key: 'grant', alias: 'Grant' },
    3: { key: 'documentation', alias: 'Documentation' }
  },
  link: 'url',
}

const experimentalSchema: GenericCardSchema = {
  type: 'TOOL',
  title: 'title',
  subTitle: 'reagantType',
  description: 'summary',
  icon: 'icon',
  secondaryLabels: {
    0: { key: 'contributor', alias: 'Contributor' },
    1: { key: 'diagnosis', alias: 'Diagnosis' },
    2: { key: 'modelType', alias: 'Model Type' },
    3: { key: 'modelSystemName', alias: 'Model Name' },
    4: { key: 'grant', alias: 'Grant' },
    5: { key: 'program', alias: 'Program' },
  },
  link: 'url',
}

const facetAliases = {
  diagnosis: 'Diagnosis',
  grant: 'Grant',
  modelSystemName: 'Model Name',
  modelType: 'Model Type',
  program: 'Program',
  reagentType: 'Reagent Type',
  softwareType: 'Software Type'
}

const computationalSql = "SELECT * FROM syn20337467 WHERE type = 'computational'"
const experimentalSql = "SELECT * FROM syn20337467 WHERE type = 'experimental'"

const tools: SynapseConfig = {
  name: 'QueryWrapperMenu',
  props: {
    rgbIndex: 6,
    accordionConfig: [
      {
        name: 'Computational',
        unitDescription: 'tools from Computational',
        cardConfiguration: {
          type: SynapseConstants.GENERIC_CARD,
          genericCardSchema: computationalSchema,
          loadingScreen
        },
        menuConfig: [
          {
            sql: computationalSql,
            facetName: 'diagnosis',
            facetAliases
          },
          {
            sql: computationalSql,
            facetName: 'grant',
            facetAliases
          },
          {
            sql: computationalSql,
            facetName: 'modelSystemName',
            facetAliases
          },
          {
            sql: computationalSql,
            facetName: 'modelType',
            facetAliases
          },
          {
            sql: computationalSql,
            facetName: 'program',
            facetAliases
          },
          {
            sql: computationalSql,
            facetName: 'reagentType',
            facetAliases
          },
          {
            sql: computationalSql,
            facetName: 'softwareType',
            facetAliases
          },
        ]
      },
      {
        name: 'Experimental',
        unitDescription: 'tools from Experimental',
        cardConfiguration: {
          type: SynapseConstants.GENERIC_CARD,
          genericCardSchema: experimentalSchema,
          loadingScreen
        },
        menuConfig: [
          {
            sql: experimentalSql,
            facetName: 'diagnosis',
            facetAliases
          },
          {
            sql: experimentalSql,
            facetName: 'grant',
            facetAliases
          },
          {
            sql: experimentalSql,
            facetName: 'modelSystemName',
            facetAliases
          },
          {
            sql: experimentalSql,
            facetName: 'modelType',
            facetAliases
          },
          {
            sql: experimentalSql,
            facetName: 'program',
            facetAliases
          },
          {
            sql: experimentalSql,
            facetName: 'reagentType',
            facetAliases
          },
          {
            sql: experimentalSql,
            facetName: 'softwareType',
            facetAliases
          },
        ]
      },
    ]
  }
}

export default tools
