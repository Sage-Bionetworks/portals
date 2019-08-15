import { SynapseConfig } from '../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../loadingScreen'

const rgbIndex = 5
const unitDescription = 'Publications'

const sql = 'SELECT * FROM syn20448807'

export const publicationCardProps = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: SynapseConstants.PUBLICATION,
    title: 'title',
    subTitle: 'authors',
    link: 'doi',
    secondaryLabels: {
      0: { key: 'year', alias: 'Year' },
      1: { key: 'journal', alias: 'Journal' },
      2: { key: 'consortium', alias: 'Program' },
      3: { key: 'long_amp_ad_grants', alias:  'Grant' },
      4: { key: 'doi', alias:  'DOI' },
      5: { key: 'pubmed_id', alias: 'Pubmed ID' }
    }
  },
}

const facetAliases = {
  authors: 'Authors',
  title: 'Title',
  year:'Year',
  journal:'Journal',
  consortium:'Program',
  long_amp_ad_grants: 'Grant',
  doi: 'DOI',
  pubmed_id:'Pubmed ID'
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
    facetAliases,
    searchConfiguration: {
      searchable: [
        {
        columnName: 'authors',
        hintText: 'LastName'
        },
        {
        columnName: 'consortium',
        hintText: 'AMP-AD'
        },
        {
        columnName: 'doi',
        hintText: '10.1186/s13024-017-0219-3'
        },
        {
        columnName: 'journal',
        hintText: 'Alzheimers Dement'
        },
        {
        columnName: 'title',
        hintText: 'network'
        },
        {
        columnName: 'year',
        hintText: '2018'
        },
        {
        columnName: 'long_amp_ad_grants',
        hintText: 'U01AG046161'
        },
      ]
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
  }
}

export default publications
