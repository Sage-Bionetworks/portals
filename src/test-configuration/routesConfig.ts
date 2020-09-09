import { GenericRoute } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import { publications, studies } from './exploreHomeConfiguration'

// Constants used for testing
export const ABOUT_INDEX = 3
export const EXPLORE_INDEX = 1
export const ORGANIZATION_INDEX = 2
export const HOME_INDEX = 0

const routes: GenericRoute[] = []

routes[ABOUT_INDEX] = {
  isNested: false,
  to: 'About',
  synapseConfigArray: [
    {
      title: 'About',
      name: 'Markdown',
      props: {
        ownerId: 'syn7080714',
        wikiId: '470467',
      },
    },
  ],
}

routes[EXPLORE_INDEX] = {
  to: 'Explore',
  isNested: true,
  routes: [
    {
      isNested: false,
      to: 'Data',
      synapseConfigArray: [studies.explorePageSynapseObject],
    },
    {
      isNested: false,
      to: 'Publications',
      synapseConfigArray: [publications.explorePageSynapseObject],
    },
  ],
}

routes[ORGANIZATION_INDEX] = {
  to: 'Organizations',
  isNested: true,
  routes: [
    {
      isNested: true,
      to: 'Content',
      synapseConfigArray: [
        {
          title: 'Grants',
          name: 'Markdown',
          props: {
            ownerId: 'syn18421331',
            wikiId: '590615',
          },
        },
        {
          title: 'Cards',
          name: 'CardContainerLogic',
          props: {
            type: SynapseConstants.GENERIC_CARD,
            genericCardSchema: {
              title: 'name',
              type: SynapseConstants.PUBLICATION,
            },
            sql: `SELECT * FROM syn18488466 WHERE ( ( "featured" = 'TRUE' ) )`,
          },
        },
      ],
      routes: [
        {
          to: 'Subcontent',
          isNested: false,
          synapseConfigArray: [
            {
              name: 'Markdown',
              props: {
                ownerId: 'syn18421331',
                wikiId: '590615',
              },
            },
          ],
        },
      ],
    },
  ],
}

routes[HOME_INDEX] = {
  to: '',
  isNested: false,
  synapseConfigArray: [
    {
      title: 'Explore Portal',
      name: 'StatefulButtonControlWrapper',
      props: {
        configs: [
          {
            name: 'testroute',
            synapseConfigArray: [
              studies.homePageSynapseObject,
              publications.homePageSynapseObject,
            ],
          },
        ],
        colors: ['green', 'blue'],
      },
    },
    {
      title: 'Explore Cards',
      name: 'CardContainerLogic',
      link: '/Explore/Data',
      props: {
        sql: 'SELECT * FROM syn9630847',
        type: SynapseConstants.GENERIC_CARD,
        genericCardSchema: {
          title: 'name',
          type: SynapseConstants.PUBLICATION,
        },
        limit: 3,
      },
    },
    {
      title: 'Some Markdown',
      name: 'Markdown',
      props: {
        ownerId: 'syn7080714',
        wikiId: '470467',
      },
    },
  ],
}

export default routes
