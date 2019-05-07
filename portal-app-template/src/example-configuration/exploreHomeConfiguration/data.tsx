import * as React from 'react'
import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import { BarLoader } from 'react-spinners'

const sql = 'SELECT * FROM syn18488466'
const unitDescription = 'Datasets'
const synapseId = 'syn18488466'

const rgbIndex = 0
const facetName = 'tumorType'

export const data: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapper',
    props: {
      rgbIndex,
      facetName,
      unitDescription,
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
      loadingScreen: <div className="bar-loader"><BarLoader color="#47337D" loading={true} /></div>,
      type: SynapseConstants.CSBC_DATASET,
      menuConfig: [
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'species',
          facetAliases: {
            species: 'Species',
          }
        },
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'Theme'
        },
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'experimentalStrategy',
          facetAliases: {
            experimentalStrategy: 'Assay'
          }
        },
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'platform',
          facetAliases: {
            platform: 'Platform'
          }
        },
        {
          sql,
          synapseId,
          unitDescription,
          facetName: 'tumorType',
          facetAliases: {
            tumorType: 'Disease Type'
          }
        }
      ],
      facetName: 'tumorType',
      facetAliases: {
        tumorType: 'Disease Type',
      },
    },
    countQuery : {
      concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
      partMask: SynapseConstants.BUNDLE_MASK_QUERY_COUNT,
      query: {
        sql,
        isConsistent: false,
        limit: 25,
        offset: 0,
      }
    }
  },
}
