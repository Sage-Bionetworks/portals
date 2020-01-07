import { GenericRoute } from 'src/types/portal-config'

const routes: GenericRoute[] = [
  {
    name: 'Home',
    to: '/',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        containerClassName: 'stop-ad-home-page',
        props: {
          ownerId: 'syn20717442',
          wikiId: '595390',
        },
      },
    ],
  },
  {
    name: 'Apply',
    to: '/Apply',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn20717442',
          wikiId: '595813',
        },
      },
      {
        name: 'SynapseFormSubmissionsGrid',
        props: {
          pathpart: '#/Apply',
          formGroupId: '9',
          itemNoun: 'Compound',
          formClass: 'drug-upload-tool',
        },
      },
    ],
    programmaticRouteConfig: [
      {
        name: 'SynapseFormWrapper',
        props: {
          formSchemaEntityId: 'syn20680102',
          fileNamePath: 'naming.compound_name',
          formUiSchemaEntityId: 'syn20693568',
          formNavSchemaEntityId: 'syn20680027',
          formTitle: 'Your Submission',
          formClass: 'drug-upload-tool',
        },
      },
    ],
  },
  {
    name: 'Help',
    to: '/Help',
    isNested: true,
    routes: [
      {
        name: 'How It Works',
        to: '/Help/How It Works',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'How It Works',
            props: {
              ownerId: 'syn20717442',
              wikiId: '595391',
            },
          },
        ],
      },
      {
        name: 'Data Requirements',
        to: '/Help/Data Requirements',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'Data Requirements',
            props: {
              ownerId: 'syn20717442',
              wikiId: '595544',
            },
          },
        ],
      },
    ],
  },
  {
    name: 'Terms',
    to: '/Terms',
    isNested: false,
    hideRouteFromNavbar: true,
    synapseConfigArray: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn20717442',
          wikiId: '596040',
        },
      },
    ],
  },
  // https://www.synapse.org/#!Synapse:syn20717442/wiki/596047
  {
    name: 'Contact Us',
    to: '/Contact Us',
    isNested: false,
    hideRouteFromNavbar: true,
    synapseConfigArray: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn20717442',
          wikiId: '596047',
        },
      },
    ],
  },
]

export default routes
