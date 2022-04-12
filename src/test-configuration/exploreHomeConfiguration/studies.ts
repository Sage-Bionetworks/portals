import { SynapseConstants } from 'synapse-react-client'
import { SynapseConfig } from 'types/portal-config'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'

const studiesSql = 'SELECT * FROM syn16787123'
const type = SynapseConstants.GENERIC_CARD

const rgbIndex = 5

const studyCardConfiguration: CardConfiguration = {
  type,
  genericCardSchema: {
    title: 'studyName',
    type: SynapseConstants.STUDY,
    description: 'summary',
    subTitle: 'studyLeads',
    icon: 'studyStatus',
    secondaryLabels: [
      'dataStatus',
      'diseaseFocus',
      'manifestation',
      'fundingAgency',
      'institutions',
      'studyStatus',
    ],
  },
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Studies/DetailsPage',
    URLColumnName: 'studyId',
    matchColumnName: 'studyId',
  },
}

export const studies: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    sql: studiesSql,
    name: 'Studies',
    shouldDeepLink: true,
    cardConfiguration: studyCardConfiguration,
    searchConfiguration: {
      searchable: [
        'studyName',
        'summary',
        'studyLeads',
        'studyStatus',
        'dataStatus',
        'institutions',
        'diseaseFocus',
        'manifestation',
        'fundingAgency',
      ],
    },
  },
}
