import { SynapseConstants } from 'synapse-react-client'
import { SynapseConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { facetAliases } from './commonProps'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
export const publicationSql = 'SELECT * FROM syn22095937'
export const publicationEntityId = 'syn22095937'
const entityId = publicationEntityId
const sql = publicationSql
const rgbIndex = 1

export const publicationSchema: GenericCardSchema = {
  type: SynapseConstants.PUBLICATION,
  title: 'title',
  subTitle: 'authors',
  description: 'abstract',
  secondaryLabels: ['year', 'journal', 'study', 'grants', 'DOI'],
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
    entityId,
    sql,
    shouldDeepLink: true,
    hideDownload: true,
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
          columnName: 'pubmedId',
          hintText: '',
        },
      ],
    },
    facetsToPlot: ['study', 'grants'],
    name: 'Publications',
    facetAliases,
  },
}

export const publicationDetailPageProps = {
  sql,
  entityId,
  ...publicationsCardConfiguration,
}
