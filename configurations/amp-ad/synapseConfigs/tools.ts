import { SynapseConfig } from '../../types/portal-config'
import { GenericCardSchema } from "synapse-react-client/dist/containers/GenericCard"
import loadingScreen from '../loadingScreen'
import { SynapseConstants } from "synapse-react-client"

const computationalSchema: GenericCardSchema = {
  type: 'TOOL',
  title: 'name',
  subTitle: 'softwareType',
  description: 'summary',
  icon: 'toolType',
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
  title: 'name',
  subTitle: 'reagentType',
  description: 'summary',
  icon: 'toolType',
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

const computationalSql = "SELECT * FROM syn20337467 WHERE toolType = 'computational'"
const experimentalSql = "SELECT * FROM syn20337467 WHERE toolType = 'experimental'"

const tools: SynapseConfig = {
  name: 'QueryWrapperMenu',
  props: {
    rgbIndex: 6,
    facetAliases,
    accordionConfig: [
      {
        name: 'Computational',
        cardConfiguration: {
          type: SynapseConstants.GENERIC_CARD,
          genericCardSchema: computationalSchema,
          loadingScreen
        },
        menuConfig: [
          {
            sql: computationalSql,
            facetName: 'diagnosis',
          },
          {
            sql: computationalSql,
            facetName: 'grant'
          },
          {
            sql: computationalSql,
            facetName: 'program'
          },
          {
            sql: computationalSql,
            facetName: 'softwareType'
          },
        ]
      },
      {
        name: 'Experimental',
        cardConfiguration: {
          type: SynapseConstants.GENERIC_CARD,
          genericCardSchema: experimentalSchema,
          loadingScreen
        },
        menuConfig: [
          {
            sql: experimentalSql,
            facetName: 'diagnosis'
          },
          {
            sql: experimentalSql,
            facetName: 'grant'
          },
          {
            sql: experimentalSql,
            facetName: 'modelType'
          },
          {
            sql: experimentalSql,
            facetName: 'program'
          },
          {
            sql: experimentalSql,
            facetName: 'reagentType'
          },
        ]
      },
    ]
  }
}

export default tools
