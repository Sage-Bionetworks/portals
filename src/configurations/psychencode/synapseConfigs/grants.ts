import { SynapseConstants } from 'synapse-react-client'
import { SynapseConfigArray, SynapseConfig } from 'types/portal-config'

import {
  GenericCardSchema,
  IconOptions,
} from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { DetailsPageProps } from 'types/portal-util-types'
import { studyDetailPageProps } from './studies'
import { publicationDetailPageProps } from './publications'
import { peopleDetailPageProps } from './people'
import { Project } from 'synapse-react-client/dist/assets/themed_icons/Project'
import { grantSql } from '../resources'

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
  iconOptions,
}

export const grants: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    cardConfiguration: grantCardConfiguration,
    sql: grantSql,
    shouldDeepLink: true,
    hideDownload: true,
    name: 'Grants',
    facetsToPlot: ['grants', 'phase'],
    searchConfiguration: {
      searchable: [
        'title',
        'keyInvestigators',
        'institutions',
        'grants',
      ],
    },
  },
}

const details: DetailsPageProps = {
  sql: grantSql,
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
        sql: grantSql,
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
      
      ...grantCardConfiguration,
      titleLinkConfig: undefined,
      genericCardSchema: grantSchema,
      rgbIndex,
      sql: grantSql,
    },
  },
  {
    name: 'DetailsPage',
    props: details,
  },
]
