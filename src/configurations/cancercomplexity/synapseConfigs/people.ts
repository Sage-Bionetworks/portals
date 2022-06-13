import { SynapseConstants } from 'synapse-react-client'
import {
  GenericCardSchema,
  IconOptions,
} from 'synapse-react-client/dist/containers/GenericCard'
import { Project } from 'synapse-react-client/dist/assets/themed_icons/Project'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { peopleSql } from '../resources'
import { SynapseConfig } from 'types/portal-config'
const rgbIndex = 3

export const peopleSchema: GenericCardSchema = {
  type: 'Person',
  title: 'name',
  subTitle: 'lastKnownInstitution',
  description: '',
  secondaryLabels: [
    'synapseProfileLink',
    'orcidId',
    'grantName',
    'consortium',
    'chairRoles',
  ],
}

// TODO: Change iconOptions type to map () => string | JSX.Element and remove cast
const iconOptions: IconOptions = {
  Grant: (Project as unknown) as string,
}

export const peopleCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  secondaryLabelLimit: 4,
  iconOptions,
  genericCardSchema: peopleSchema,
  titleLinkConfig: {
    isMarkdown: false,
    URLColumnName: 'name',
    matchColumnName: 'name',
    baseURL: 'Explore/People/DetailsPage',
  },
  labelLinkConfig: [
    {
      isMarkdown: true,
      matchColumnName: 'synapseProfileLink',
    },
  ],
}

export const people: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    sql: peopleSql,
    cardConfiguration: peopleCardConfiguration,
    shouldDeepLink: true,
    name: 'People',
    facetsToPlot: ['consortium', 'grantNumber'],
    searchConfiguration: {
      searchable: [
        'grantName',
        'grantNumber',
        'chairRoles',
      ],
    },
  },
}
