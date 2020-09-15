import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from 'types/portal-config'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { projectsSql } from '../resources'
const unitDescription = 'projects'
const rgbIndex = 1

export const projectsSchema: GenericCardSchema = {
  type: SynapseConstants.PROJECT,
  title: 'projectName',
  subTitle: 'grantName',
  description: 'description',
  secondaryLabels: ['consortium', 'grantType'],
}

export const projectCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: projectsSchema,
  secondaryLabelLimit: 4,
  descriptionLinkConfig: {
    isMarkdown: true,
  },
}

export const projects: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      rgbIndex,
      unitDescription,
      facet: 'grantName',
      link: 'Explore/Projects',
      linkText: 'Explore Projects',
      sql: projectsSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      cardConfiguration: projectCardConfiguration,
      shouldDeepLink: true,
      name: 'Projects',
      sql: projectsSql,
    },
  },
}
