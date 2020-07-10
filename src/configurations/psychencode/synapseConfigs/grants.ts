import { SynapseConstants } from 'synapse-react-client'
import { SynapseConfigArray, SynapseConfig } from 'types/portal-config'
import loadingScreen from '../loadingScreen'
import {
  GenericCardSchema,
  IconOptions,
} from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { GenerateComponentsFromRowProps } from 'types/portal-util-types'
import { studyDetailPageProps } from './studies'
import { publicationDetailPageProps } from './publications'
import { peopleDetailPageProps } from './people'
import { Project } from 'synapse-react-client/dist/assets/themed_icons/Project'
export const grantSql = 'SELECT * FROM syn22096130'
export const grantEntityId = 'syn22096130'
const entityId = grantEntityId
const sql = grantSql
const rgbIndex = 2

export const grantSchema: GenericCardSchema = {
  type: 'Grant',
  title: 'title',
  subTitle: 'keyInvestigators',
  description: 'abstract',
  secondaryLabels: ['institutions', 'grants', 'phase'],
}

const iconOptions: IconOptions = {
  Grant: (Project as unknown) as string,
}

export const grantCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: grantSchema,
  titleLinkConfig: {
    isMarkdown: false,
    matchColumnName: 'grants',
    URLColumnName: 'grants',
    baseURL: 'Explore/Grants/DetailsPage',
  },
  loadingScreen,
  iconOptions,
}

export const grants: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    entityId,
    cardConfiguration: grantCardConfiguration,
    sql,
    shouldDeepLink: true,
    hideDownload: true,
    name: 'Grants',
    loadingScreen,
    facetsToPlot: ['grants', 'phase'],
    searchConfiguration: {
      searchable: [
        {
          columnName: 'title',
          hintText: '',
        },
        {
          columnName: 'keyInvestigators',
          hintText: '',
        },
        {
          columnName: 'abstract',
          hintText: '',
        },
        {
          columnName: 'institutions',
          hintText: '',
        },
        {
          columnName: 'grants',
          hintText: '',
        },
      ],
    },
  },
}

const details: GenerateComponentsFromRowProps = {
  sql,
  entityId,
  sqlOperator: 'LIKE',
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      props: studyDetailPageProps,
      columnName: 'grants',
      tableSqlKeys: ['grants'],
      title: 'Studies',
    },
    {
      name: 'CardContainerLogic',
      props: publicationDetailPageProps,
      columnName: 'grants',
      tableSqlKeys: ['grants'],
      title: 'Publications',
    },
    {
      name: 'CardContainerLogic',
      props: peopleDetailPageProps,
      columnName: 'grants',
      tableSqlKeys: ['grants'],
      title: 'People',
    },
    {
      name: 'CardContainerLogic',
      props: {
        sql,
        entityId,
        ...grantCardConfiguration,
      },
      columnName: 'relatedGrants',
      tableSqlKeys: ['grants'],
      title: 'Related Grants',
    },
  ],
}

export const grantsDetailPage: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      isHeader: true,
      isAlignToLeftNav: true,
      backgroundColor: '#5bb0b5',
      ...grantCardConfiguration,
      titleLinkConfig: undefined,
      genericCardSchema: grantSchema,
      rgbIndex,
      sql,
      entityId,
    },
  },
  {
    name: 'GenerateComponentsFromRow',
    props: details,
  },
]
