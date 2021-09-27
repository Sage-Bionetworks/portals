import { HomeExploreConfig } from 'types/portal-config'

import { facetAliases } from './commonProps'
import { initiativesSql, studiesSql } from '../resources'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { SynapseConstants } from 'synapse-react-client'
import { DetailsPageProps } from 'types/portal-util-types'
import { studyCardConfiguration } from './studies'

export const newSql = `${initiativesSql} order by ROW_ID desc limit 3`
const unitDescription = 'initiatives'
const rgbIndex = 8

export const initiativeCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: 'Initiative',
    title: 'initiative',    
    description: 'summary',    
    link: 'website',
    imageFileHandleColumnName: 'image',
  },
}

const initiatives: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'StandaloneQueryWrapper',
    props: {
      unitDescription,
      rgbIndex,
      facetAliases,
      link: 'Explore/Initiatives',
      linkText: 'Explore Initiatives',
      sql: newSql,
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperPlotNav',
    props: {
      rgbIndex,
      defaultShowFacetVisualization: false,
      shouldDeepLink: true,
      sql: initiativesSql,
      cardConfiguration: {
        ...initiativeCardConfiguration,
        titleLinkConfig: {
          matchColumnName: 'initiative',
          isMarkdown: false,
          baseURL: 'Explore/Initiatives/DetailsPage',
          URLColumnName: 'initiative',
        },
        ctaLinkConfig: {
          text: 'Visit Website',
          link: 'website'
        },
      },
      name: 'Initiatives',
      facetAliases,
      searchConfiguration: {
        searchable: [
          'initiative',
          'summary',          
        ],
      },  
    },
  },
}

export const initiativeDetailsPageConfiguration: DetailsPageProps = {
  showMenu: false,
  sql: initiativesSql,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      columnName: 'initiative',
      title: 'Studies',
      showTitleSeperator: false,
      tableSqlKeys: ['initiative'],
      props: {
        sql: studiesSql,
        ...studyCardConfiguration,
      },
    },
  ],
}

export default initiatives
