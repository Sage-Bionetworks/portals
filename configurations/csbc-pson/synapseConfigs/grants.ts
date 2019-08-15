import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
const sql = `SELECT * FROM syn10142562 WHERE ( "grantType" = 'U54' OR "grantType" = 'U01')`
const unitDescription = 'grants'
const rgbIndex = 3

export const grantsSchema: GenericCardSchema = {
  type: 'Project',
  title: 'name',
  subTitle: 'Institutions',
  description: 'abstract',
  secondaryLabels: {
    0: { key: 'Key Investigators', alias: 'Investigators' },
    1: { key: 'grantNumber', alias: 'Grant' },
    2: { key: 'consortium', alias: 'Program' },
    3: { key: 'grantType', alias: 'Grant Type' },
  },
  link: 'id',
}

export const grants: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      unitDescription,
      loadingScreen,
      rgbIndex: 3,
      facet: 'grantType',
      facetAliases: {
        grantType: 'Grant Type',
      },
      link: 'Explore/Grants',
      linkText: 'Explore Grants',
      initQueryRequest : {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask: SynapseConstants.BUNDLE_MASK_QUERY_FACETS
          | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: false,
          limit: 25,
          offset: 0,
        }
      },
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      cardConfiguration: {
        type: SynapseConstants.GENERIC_CARD,
        genericCardSchema: grantsSchema,
        secondaryLabelLimit: 4
      },
      stackedBarChartConfiguration: {
        loadingScreen
      },
      name: 'Grants',
      facetAliases: {
        consortium: 'Program',
        grantType: 'Grant Type',
      },
      searchableConfiguration: {
        searchable: [
          {
            columnName: 'name',
            hintText: 'immunity'
          },
          {
            columnName: 'grantNumber',
            hintText: 'CA202123'
          },
          {
            columnName: 'consortium',
            hintText: 'PS-ON'
          },
          {
            columnName: 'Key Investigators',
            hintText: 'LastName'
          },
          {
            columnName: 'Institutions',
            hintText: 'Vanderbilt'
          },
          {
            columnName: 'abstract',
            hintText: 'metastasis'
          },
          {
            columnName: 'grantType',
            hintText: 'U54'
          },
        ]
      },
      menuConfig: [
        {
          sql,
          facet: 'consortium',
        },
        {
          sql,
          facet: 'grantType',
        },
        {
          sql,
        }
      ],
    }
  }
}
