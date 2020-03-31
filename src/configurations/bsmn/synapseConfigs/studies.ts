import { HomeExploreConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
// import { GenerateComponentsFromRowProps } from 'types/portal-util-types'

const unitDescription = 'Studies'
const rgbIndex = 4
export const studiesSql = 'SELECT * FROM syn21438231'
export const studiesEntityId = 'syn21438231'
const entityId = studiesEntityId
const sql = studiesSql
const facet = 'Program'

export const studyCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  loadingScreen,
  genericCardSchema: {
    type: 'Study',
    title: 'studyName',
    subTitle: 'institutions',
    description: 'studyDescription',
    secondaryLabels: [
      'diagnosis',
      'organs',
      'tissues',
      'dataTypes',
      'project',
      'ndaStudy',
    ],
  },
  labelLinkConfig: [
    {
      matchColumnName: 'ndaStudy',
      isMarkdown: true,
    },
  ],
  secondaryLabelLimit: 4,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Studies/DetailsPage',
    URLColumnName: 'id',
    matchColumnName: 'id',
  },
}

const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      facet,
      loadingScreen,
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
      initQueryRequest: {
        entityId,
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_FACETS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          limit: 25,
          offset: 0,
        },
      },
    },
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      entityId,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'studyName',
            hintText: 'mosaic single nucleotide variations',
          },
          {
            columnName: 'institutions',
            hintText: 'Mayo Clinic',
          },
          {
            columnName: 'studyDescription',
            hintText: 'Reference Tissue',
          },
          {
            columnName: 'diagnosis',
            hintText: 'Schizophrenia',
          },
          {
            columnName: 'organs',
            hintText: 'Bran',
          },
          {
            columnName: 'tissues',
            hintText: 'Dorsolateral Prefrontal Cortex',
          },
          {
            columnName: 'dataTypes',
            hintText: 'Whole Genome Sequencing',
          },
          {
            columnName: 'project',
            hintText: 'syn1234',
          },
          {
            columnName: 'methods',
            hintText: '',
          },
        ],
      },
      name: 'Studies',
      unitDescription: 'Studies',
      cardConfiguration: studyCardConfiguration,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      menuConfig: [
        {
          sql,
          facet: 'diagnosis',
        },
        {
          sql,
          facet: 'organs',
        },
        {
          sql,
          facet: 'tissues',
        },
        {
          sql,
          facet: 'dataTypes',
        },
        {
          sql,
          facet: 'project',
        },
        {
          sql,
        },
      ],
    },
  },
}

// export const studiesDetailPageConfiguration: GenerateComponentsFromRowProps = {
//   showMenu: true,
//   sql,
//   entityId,
//   synapseConfigArray: [
//     {
//       name: 'Markdown',
//       columnName: 'accessRequirements',
//       injectMarkdown: true,
//       props: {},
//     },
//     {
//       name: 'CardContainerLogic',
//       columnName: 'id',
//       tableSqlKeys: ['projectId'],
//     }
//   ],
// }

export default studies
