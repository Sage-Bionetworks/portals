import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'

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
}
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
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      sql: 'SELECT * FROM syn16859448',
      shouldDeepLink: true,
      name: 'Tools',
      cardConfiguration: toolsCardConfiguration,
      facetAliases,
      searchConfiguration: {
        searchable: [
          'name',
          'summary',
          'studyName',
          'fundingAgency',
          'contact',
          'type',
          'subtype',
          'diseaseFocus',
          'manifestation',
        ],
      },

    },
  },
}

export default tools
