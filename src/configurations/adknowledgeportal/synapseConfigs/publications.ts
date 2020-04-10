import { HomeExploreConfig, SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { GenerateComponentsFromRowProps } from 'types/portal-util-types'
import loadingScreen from '../loadingScreen'
import { projectsSql, projectsEntityId } from './projects'

const rgbIndex = 5
const unitDescription = 'Publications'

const sql = 'SELECT * FROM syn20448807'
export const publicationsEntityId = 'syn20448807'
const entityId = publicationsEntityId

export const publicationCardProps = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: SynapseConstants.PUBLICATION,
    title: 'title',
    subTitle: 'authors',
    link: 'doi',
    secondaryLabels: [
      'year',
      'journal',
      'consortium',
      'long_amp_ad_grants',
      'doi',
      'pubmed_id',
    ],
  },
}

const facetAliases = {
  consortium: 'Program',
  long_amp_ad_grants: 'Grant',
  doi: 'DOI',
  pubmed_id: 'Pubmed ID',
}

const publications: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      rgbIndex,
      loadingScreen,
      link: 'Explore/Publications',
      linkText: 'Explore Publications',
      facet: 'consortium',
      facetAliases: {
        consortium: 'Program',
      },
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
      unitDescription,
      entityId,
      stackedBarChartConfiguration: {
        loadingScreen,
      },
      name: 'Publications',

      shouldDeepLink: true,
      facetAliases,
      searchConfiguration: {
        searchable: [
          {
            columnName: 'title',
            hintText: 'network',
          },
          {
            columnName: 'journal',
            hintText: 'Alzheimers Dement',
          },
          {
            columnName: 'authors',
            hintText: 'LastName',
          },
          {
            columnName: 'year',
            hintText: '2018',
          },
          {
            columnName: 'doi',
            hintText: '10.1186/s13024-017-0219-3',
          },
          {
            columnName: 'long_amp_ad_grants',
            hintText: 'U01AG046161',
          },
          {
            columnName: 'consortium',
            hintText: 'AMP-AD',
          },
        ],
      },
      cardConfiguration: publicationCardProps,
      menuConfig: [
        {
          sql,
          facet: 'consortium',
        },
        {
          sql,
          facet: 'year',
        },
        {
          sql,
          facet: 'long_amp_ad_grants',
        },
        {
          sql,
        },
      ],
    },
  },
}

const publicationsFromRowProps: GenerateComponentsFromRowProps = {
  sql: projectsSql,
  showMenu: false,
  entityId: projectsEntityId,
  synapseConfigArray: [
    {
      name: 'CardContainerLogic',
      columnName: 'Grant Number',
      title: 'Publications',
      showTitleSeperator: false,
      tableSqlKeys: ['long_amp_ad_grants'],
      props: {
        entityId: publicationsEntityId,
        sql,
        ...publicationCardProps,
      },
    },
  ],
}
export const publicationProgrammatic: SynapseConfig = {
  name: 'GenerateComponentsFromRow',
  props: publicationsFromRowProps,
}

export default publications
