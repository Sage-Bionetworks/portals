import { SynapseConstants } from 'synapse-react-client'

import { SynapseConfig } from 'types/portal-config'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'

const sql = 'SELECT * FROM syn10923842'
const rgbIndex = 0

const publicationSchema: GenericCardSchema = {
  type: 'Project',
  title: 'Title',
  subTitle: 'Authors',
  description: 'abstract',
  secondaryLabels: ['Journal'],
  link: 'PubMed',
}
export const publications: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    cardConfiguration: {
      type: SynapseConstants.GENERIC_CARD,
      genericCardSchema: publicationSchema,
    },
    sql,
    shouldDeepLink: true,
    name: 'Publications',
    searchConfiguration: {
      searchable: [
        'publicationTitle',
        'authors',
        'journal',
        'doi',
        'pubMedId',
        'keywords',
        'tummorType',
        'tissue',
        'assay',
        'grantName',
        'grantNumber',
        'dataset',
      ],
    },
  },
}
