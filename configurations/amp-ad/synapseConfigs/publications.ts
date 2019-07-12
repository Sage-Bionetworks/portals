import { SynapseConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const rgbIndex = 3
const unitDescription = 'Publications'

const sql = 'SELECT * FROM syn20448807'

export const publicationCardProps = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: SynapseConstants.PUBLICATION,
    title: 'title',
    subTitle: 'authrors',
    secondaryLabels: {
      0: { key: 'year', alias: 'Year' },
      1: { key: 'Key Data Contributors', alias:  'Key Contributors' },
      2: { key: 'consortium', alias: 'Program' },
      3: { key: 'long_amp_ad_grants', alias:  'Grant' },
      4: { key: 'doi', alias:  'DOI' },
      5: { key: 'pubmed_id', alias: 'Pubmed ID' }
    }
  },
}

const publications: SynapseConfig = {
  name: 'QueryWrapperMenu',
  props: {
    rgbIndex,
    unitDescription,
    stackedBarChartConfiguration: {
      loadingScreen,
    },
    name: 'Publications',
    isConsistent: true,
    cardConfiguration: publicationCardProps,
    menuConfig: [
      {
        sql,
        facetName: 'consortium',
        facetAliases: {
          consortium: 'Program'
        }
      },
      {
        sql,
        facetName: 'year',
        facetAliases: {
          year: 'Year'
        }
      },
      {
        sql,
        facetName: 'long_amp_ad_grants',
        facetAliases: {
          long_amp_ad_grants: 'Grant'
        }
      },
    ],
  }
}

export default publications
