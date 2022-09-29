import { SynapseConstants } from 'synapse-react-client'
import { SynapseConfig } from 'types/portal-config'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
import { DetailsPageProps } from 'types/portal-util-types'
import { dataDetailPageProps } from './data'
import { projectsSql } from '../resources'

const rgbIndex = 9

export const projectSchema: GenericCardSchema = {
  type: SynapseConstants.PROJECT,
  title: 'Project',
  subTitle: 'Program',
  description: 'Description',
  secondaryLabels: [
    'Program',
  ],
}

export const projectsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: projectSchema,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Projects/DetailsPage',
    URLColumnName: 'Project',
    matchColumnName: 'Project',
  },
  labelLinkConfig: [
    {
      matchColumnName: 'Description',
      isMarkdown: true,
    },
  ],
}

export const projects: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    cardConfiguration: projectsCardConfiguration,
    sql: projectsSql,
    shouldDeepLink: true,
    hideDownload: true,
    name: 'Projects',
    facetAliases,
    facetsToPlot: [],
  },
}

export const details: DetailsPageProps = {
  sql: projectsSql,
  synapseConfigArray: [
    {
      name: 'StandaloneQueryWrapper',
      title: 'Data Files',
      columnName: 'id',
      tableSqlKeys: ['projectId'],
      props: dataDetailPageProps,
    },
  ],
}

export const projectDetailPage: SynapseConfig[] = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      isHeader: true,
      isAlignToLeftNav: true,
      ...projectsCardConfiguration,
      rgbIndex,
      facetAliases,
      genericCardSchema: {
        ...projectSchema,
        title: 'Study',
        link: 'Study',
      },
      sql: projectsSql,
    },
  },
  {
    name: 'DetailsPage',
    props: details,
  },
]
