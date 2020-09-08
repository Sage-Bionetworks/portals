import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import loadingScreen from '../loadingScreen'
import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { facetAliases } from './commonProps'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { toolsSql } from '../resources'

export const newToolsSql = `${toolsSql} order by ROW_ID desc limit 3`

export const toolsSchema: GenericCardSchema = {
  type: 'TOOL',
  title: 'name',
  subTitle: 'contact',
  description: 'summary',
  icon: 'type',
  secondaryLabels: [
    'subtype',
    'diseaseFocus',
    'manifestation',
    'fundingAgency',
    'studyName',
  ],
  link: 'link',
}

export const toolsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: 'TOOL',
    title: 'name',
    subTitle: 'contact',
    description: 'summary',
    icon: 'type',
    secondaryLabels: [
      'subtype',
      'diseaseFocus',
      'manifestation',
      'fundingAgency',
      'studyName',
    ],
    link: 'link',
  },
  loadingScreen,
}

const searchConfiguration = {
  searchable: [
    {
      columnName: 'name',
      hintText: 'Browser',
    },
    {
      columnName: 'summary',
      hintText: 'prediction',
    },
    {
      columnName: 'studyName',
      hintText: 'Nerve Sheath',
    },
    {
      columnName: 'fundingAgency',
      hintText: 'NTAP',
    },
    {
      columnName: 'contact',
      hintText: 'Serra',
    },
    {
      columnName: 'type',
      hintText: 'Computational',
    },
    {
      columnName: 'subtype',
      hintText: 'animal model',
    },
    {
      columnName: 'diseaseFocus',
      hintText: 'Neurofibromatosis 2',
    },
    {
      columnName: 'manifestation',
      hintText: 'MPNST',
    },
  ],
}

const computationalSql =
  "SELECT * FROM syn16859448 WHERE type = 'computational'"
const experimentalSql = "SELECT * FROM syn16859448 WHERE type = 'experimental'"
const clinicalSql = "SELECT * FROM syn16859448 WHERE type = 'clinical'"
const rgbIndex = 6
export const toolsEntityId = 'syn16859448'

const tools: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      unitDescription: 'Tools',
      link: 'Explore/Tools',
      linkText: 'Explore Tools',
      facet: 'type',
      sql: 'SELECT * FROM syn16859448',
      facetAliases,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      facetAliases,
      name: 'Tools',
      globalQueryCountSql: 'SELECT * FROM syn16859448',
      shouldDeepLink: true,
      accordionConfig: [
        {
          name: 'Computational',
          cardConfiguration: toolsCardConfiguration,
          searchConfiguration,
          menuConfig: [
            {
              sql: computationalSql,
              facet: 'studyName',
            },
            {
              sql: computationalSql,
              facet: 'fundingAgency',
            },
            {
              sql: computationalSql,
              facet: 'subtype',
            },
            {
              sql: computationalSql,
              facet: 'diseaseFocus',
            },
            {
              sql: computationalSql,
              facet: 'manifestation',
            },
            {
              sql: computationalSql,
            },
          ],
        },
        {
          name: 'Experimental',
          cardConfiguration: toolsCardConfiguration,
          searchConfiguration,
          menuConfig: [
            {
              sql: experimentalSql,
              facet: 'studyName',
            },
            {
              sql: experimentalSql,
              facet: 'fundingAgency',
            },
            {
              sql: experimentalSql,
              facet: 'subtype',
            },
            {
              sql: experimentalSql,
              facet: 'diseaseFocus',
            },
            {
              sql: experimentalSql,
              facet: 'manifestation',
            },
            {
              sql: experimentalSql,
            },
          ],
        },
        {
          name: 'Clinical',
          cardConfiguration: toolsCardConfiguration,
          searchConfiguration,
          menuConfig: [
            {
              sql: clinicalSql,
              facet: 'studyName',
            },
            {
              sql: clinicalSql,
              facet: 'fundingAgency',
            },
            {
              sql: clinicalSql,
              facet: 'subtype',
            },
            {
              sql: clinicalSql,
              facet: 'diseaseFocus',
            },
            {
              sql: clinicalSql,
              facet: 'manifestation',
            },
            {
              sql: clinicalSql,
            },
          ],
        },
      ],
    },
  },
}

export default tools
