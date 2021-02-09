import { HomeExploreConfig } from 'types/portal-config'

import { facetAliases } from './commonProps'
import { initiativesSql } from '../resources'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { SynapseConstants } from 'synapse-react-client'

export const newSql = `${initiativesSql} order by ROW_ID desc limit 3`
const unitDescription = 'initiatives'
const rgbIndex = 8

export const cardConfiguration: CardConfiguration = {
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
      cardConfiguration,
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

export default initiatives
