import { SynapseConstants } from 'synapse-react-client'
import { SynapseConfig } from 'types/portal-config'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
import { DetailsPageProps } from 'types/portal-util-types'
import { datasetsSql, programSql, projectsSql } from '../resources'
import { projectsCardConfiguration } from './projects'
import { datasetCardConfiguration } from './datasets'
import ampRaSleSvg from '../style/AMP-RA-SLE.svg'

const rgbIndex = 9

export const programSchema: GenericCardSchema = {
  type: 'program',
  title: 'Program',
  // subTitle: 'Short Description',
  description: 'Description',
}

export const programsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: programSchema,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Programs/DetailsPage',
    URLColumnName: 'Program',
    matchColumnName: 'Program',
  },
  labelLinkConfig: [
    {
      matchColumnName: 'Description',
      isMarkdown: true,
    },
  ],
  iconOptions: {
    "AMP-RA/SLE": ampRaSleSvg,
  },
}

export const programs: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    cardConfiguration: programsCardConfiguration,
    sql: programSql,
    shouldDeepLink: true,
    hideDownload: true,
    name: 'Programs',
    facetAliases,
    facetsToPlot: [],
    defaultShowFacetVisualization: false
  },
}

export const details: DetailsPageProps = {
  sql: programSql,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      columnName: 'Program',
      title: 'Projects',
      tableSqlKeys: ['Program'],
      props: {
        ...projectsCardConfiguration,
        sql: projectsSql,
      },
    },
    {
      name: 'CardContainerLogic',
      columnName: 'Program',
      title: 'Datasets',
      tableSqlKeys: ['program'],
      props: {
        ...datasetCardConfiguration,
        sql: datasetsSql,
      },
    },
  ],
}

export const programDetailPage: SynapseConfig[] = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      isHeader: true,
      isAlignToLeftNav: true,
      ...programsCardConfiguration,
      rgbIndex,
      facetAliases,
      genericCardSchema: {
        ...programSchema,
        title: 'Program',
        link: 'Program',
      },
      sql: programSql,
    },
  },
  {
    name: 'DetailsPage',
    props: details,
  },
]
