import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { facetAliases } from './commonProps'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { SynapseConfig } from 'types/portal-config'
export const studiesSql = `SELECT * FROM syn21783965`
const entityId = 'syn21783965'
export const studiesEntityId = 'syn21783965'
const sql = studiesSql
const rgbIndex = 1

export const studySchema: GenericCardSchema = {
  type: SynapseConstants.STUDY,
  title: 'studyName',
  subTitle: 'dataContributor',
  description: 'studyDescription',
  secondaryLabels: [
    'dataTypes',
    'diagnosis',
    'tissue',
    'nucleicAcidSource',
    'species',
    'numberOfIndividuals',
    'grants',
  ],
  link: 'study',
}

export const studyCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: studySchema,
  secondaryLabelLimit: 7,
}

export const studies: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    entityId,
    sql,
    loadingScreen,
    shouldDeepLink: true,
    cardConfiguration: studyCardConfiguration,
    name: 'Studies',
    facetAliases,
    searchConfiguration: {
      searchable: [
        {
          columnName: 'dataContributor',
          hintText: '',
        },
        {
          columnName: 'dataTypes',
          hintText: '',
        },
        {
          columnName: 'diagnosis',
          hintText: '',
        },
        {
          columnName: 'grants',
          hintText: '',
        },
        {
          columnName: 'tissue',
          hintText: '',
        },
        {
          columnName: 'species',
          hintText: '',
        },
        {
          columnName: 'studyDescription',
          hintText: '',
        },
        {
          columnName: 'studyName',
          hintText: '',
        },
      ],
    },
  },
}
