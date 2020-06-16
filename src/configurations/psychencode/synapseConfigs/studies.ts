import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { facetAliases } from './commonProps'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { SynapseConfig, SynapseConfigArray } from 'types/portal-config'
import { GenerateComponentsFromRowProps } from 'types/portal-util-types'
import { dataSql } from './data'
import { publicationDetailPageProps } from './publications'
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
}

export const studyCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: studySchema,
  secondaryLabelLimit: 7,
  titleLinkConfig: {
    baseURL: 'Explore/Studies/DetailsPage',
    URLColumnName: 'study',
    matchColumnName: 'study',
    isMarkdown: false,
  },
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

export const details: GenerateComponentsFromRowProps = {
  sql,
  entityId,
  synapseConfigArray: [
    {
      name: 'Markdown',
      props: {},
      injectMarkdown: false,
      columnName: 'study',
      title: 'Study Description',
    },
    {
      name: 'Markdown',
      props: {
        ownerId: 'syn4921369',
        wikiId: '477467',
      },
      title: 'Access Requirements',
      standalone: true,
    },
    {
      name: 'Markdown',
      props: {},
      columnName: 'methods',
      title: 'Methods',
      resolveSynId: {
        title: true,
      },
    },
    {
      name: 'StandaloneQueryWrapper',
      props: {
        sql: `${dataSql} WHERE "dataSubtype" = 'metadata'`,
        rgbIndex,
        title: 'Metadata',
      },
      resolveSynId: {
        value: true,
      },
      tableSqlKeys: ['study'],
      columnName: 'study',
      title: 'Metadata',
    },
    {
      name: 'StandaloneQueryWrapper',
      props: {
        sql: dataSql,
        rgbIndex,
        title: 'Data',
      },
      resolveSynId: {
        value: true,
      },
      tableSqlKeys: ['study'],
      columnName: 'study',
      title: 'Data',
    },
    {
      name: 'CardContainerLogic',
      title: 'Related Studies',
      props: {
        ...studyCardConfiguration,
        sql,
        entityId,
      },
      columnName: 'relatedStudies',
      tableSqlKeys: ['study'],
    },
    {
      name: 'CardContainerLogic',
      title: 'Publications',
      props: publicationDetailPageProps,
      columnName: 'study',
      tableSqlKeys: ['study'],
    },
  ],
}

export const studyDetailPage: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      isHeader: true,
      isAlignToLeftNav: true,
      ...studyCardConfiguration,
      titleLinkConfig: undefined,
      rgbIndex,
      facetAliases,
      genericCardSchema: studySchema,
      sql,
      entityId,
    },
  },
  {
    name: 'GenerateComponentsFromRow',
    props: details,
  },
]

export const studyDetailPageProps = {
  sql,
  entityId,
  ...studyCardConfiguration,
}
