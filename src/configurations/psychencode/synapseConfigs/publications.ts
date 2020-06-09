import { SynapseConstants } from 'synapse-react-client'
import { SynapseConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { facetAliases } from './commonProps'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
export const publicationSql = 'SELECT * FROM syn20448807'
export const publicationEntityId = 'syn20448807'
const entityId = publicationEntityId
const sql = publicationSql
const unitDescription = 'Publications'
const rgbIndex = 1

export const publicationSchema: GenericCardSchema = {
  type: SynapseConstants.PUBLICATION,
  title: 'title',
  subTitle: 'authors',
  description: 'abstract',
  secondaryLabels: ['year', 'journal', 'study', 'grants', 'DOI', 'pubmedId'],
}

export const publicationsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: publicationSchema,
  loadingScreen,
  secondaryLabelLimit: 5,
}

export const publications: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    unitDescription,
    entityId,
    sql,
    shouldDeepLink: true,
    cardConfiguration: publicationsCardConfiguration,
    searchConfiguration: {
      searchable: [
        {
          columnName: 'title',
          hintText: '',
        },
        {
          columnName: 'authors',
          hintText: '',
        },
        {
          columnName: 'year',
          hintText: '',
        },
        {
          columnName: 'journal',
          hintText: '',
        },
        {
          columnName: 'study',
          hintText: '',
        },
        {
          columnName: 'grants',
          hintText: '',
        },
        {
          columnName: 'DOI',
          hintText: '',
        },
        {
          columnName: 'pubmedid',
          hintText: '',
        },
      ],
    },
    name: 'Publications',
    facetAliases,
  },
}
