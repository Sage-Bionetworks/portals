import { SynapseConfig } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'

import { peopleSql } from '../resources'
import { SQLOperator } from 'synapse-react-client/dist/utils/functions/sqlFunctions'

const name = 'PEOPLE'
const sql = 'SELECT * FROM syn22096112'
const rgbIndex = 4

export const people: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    sql: peopleSql,
    cardConfiguration: {
      type: SynapseConstants.MEDIUM_USER_CARD,
    },
    rgbIndex,
    name,
    shouldDeepLink: true,
    hideDownload: true,
    searchConfiguration: {
      searchable: [
        {
          columnName: 'grants',
        },
        {
          columnName: 'firstName',
        },
        {
          columnName: 'lastName',
        },
      ],
    },
  },
}

export const peopleDetailPageProps = {
  sql,
  type: SynapseConstants.MEDIUM_USER_CARD,
  sqlOperator: 'HAS' as SQLOperator,
}
