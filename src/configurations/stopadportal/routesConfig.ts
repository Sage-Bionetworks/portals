import { GenericRoute } from 'types/portal-config'

const routes: GenericRoute[] = [
  {
    to: '',
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
    to: 'Apply',
    isNested: true,
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
          pathpart: '/Apply/FormSubmission',
          formGroupId: '9',
          itemNoun: 'Compound',
          formClass: 'drug-upload-tool',
        },
      },
    ],
    routes: [
      {
        isNested: false,
        hideRouteFromNavbar: true,
        to: 'FormSubmission',
        synapseConfigArray: [
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
    ],
  },
  {
    to: 'Help',
    isNested: true,
    routes: [
      {
        to: 'How It Works',
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
        to: 'Data Requirements',
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
    to: 'Terms',
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
    to: 'Contact Us',
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
