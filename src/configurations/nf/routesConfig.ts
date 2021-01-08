import { GenericRoute } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import {
  datasets,
  files,
  studies,
  publications,
  tools,
  funders,
} from './synapseConfigs'
import {
  newStudiesSql,
  studyHeaderIconOptions,
  studyCardConfiguration,
  studiesDetailPage,
} from './synapseConfigs/studies'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import { facetAliases } from './synapseConfigs/commonProps'
import { organizationDetailsPage } from './organizations'
import { peopleSql } from './resources'

const limit = 3

const routes: GenericRoute[] = [
  {
    to: '',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Goals',
        title: 'Portal Programs and Goals',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer',
        props: {
          entityId: 'syn23516796',
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'New Studies',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer home-bg-dark',
        link: '/Explore/Studies',
        props: {
          limit,
          facetAliases,
          sql: newStudiesSql,          
          ...studyCardConfiguration,
        },
      },
      {
        name: 'UserCardListRotate',
        title: 'Data Contributor Spotlight',
        outsideContainerClassName: 'home-spacer',
        centerTitle: true,
        props: {
          sql: `${peopleSql} where isFeatured=true`,
          count: 3,
          size: SynapseConstants.LARGE_USER_CARD,
          useQueryResultUserData: true,
          // summaryLink: 'Explore/People',
          // summaryLinkText: 'EXPLORE ALL PEOPLE',
        },
      },
      {
        name: 'Ecosystem',
        title: 'NF Grant Opportunities',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer home-bg-dark',
        props: {
          config: [
            {
              title: 'Children\'s Tumor Foundation',
              ownerId: 'syn5702691',
              wikiId: '606577',
            },
            {
              title: 'Neurofibromatosis Therapeutic Acceleration Program',
              ownerId: 'syn5702691',
              wikiId: '606578',
            },
            {
              title: 'Gilbert Family Foundation',
              ownerId: 'syn5702691',
              wikiId: '606579',
            },
            {
              title: 'DoD CDMRP Neurofibromatosis Research Program',
              ownerId: 'syn5702691',
              wikiId: '606580',
            },
            {
              title: 'Neurofibromatosis Research Initiative',
              ownerId: 'syn5702691',
              wikiId: '606582',
            },
          ],
        },
      },
      {
        name: 'CardContainerLogic',
        title: 'Our Partners',
        outsideContainerClassName: 'home-spacer',
        centerTitle: true,
        props: {
              facetAliases,
          sql: funders.sql,
          type: funders.type,
        },
      },
      {
        name: 'RssFeedCards',
        title: 'What\'s New',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer home-bg-dark',
        props: {
          url: 'https://news.nfdataportal.org',
          itemsToShow:3,
          allowCategories: ['Newsletter', 'Hackathon', 'Publication', 'Funding'],
          // mailChimpListName: 'NF quarterly newsletter',
          // mailChimpUrl:'https://sagebase.us7.list-manage.com/subscribe/post?u=abcdefghi...',
          lockedFacet: {
            value: 'featured'
          }
        }
      },
    ],    
  },
  {
    to: 'Explore',
    isNested: true,
    routes: [
      {
        isNested: true,
        to: 'Studies',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: studies.explorePageSynapseObject,
            },
          },
        ],
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  sqlOperator: '=',
                  isHeader: true,
                  backgroundColor: '#119488',
                  ...studyCardConfiguration,
                  facetAliases,
                  iconOptions: studyHeaderIconOptions,
                  secondaryLabelLimit: Infinity,
                  sql: 'SELECT * FROM syn16787123',
                },
              },
              {
                name: 'DetailsPage',
                isOutsideContainer: false,
                props: studiesDetailPage,
                containerClassName: 'container-full-width',
              },
            ],
          },
        ],
      },
      {
        isNested: false,
        to: 'Datasets',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: datasets.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        isNested: false,
        to: 'Files',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: files.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        isNested: false,
        to: 'Publications',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: publications.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        isNested: false,
        to: 'Tools',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: tools.explorePageSynapseObject,
            },
          },
        ],
      },
    ],
  },
  {
    to: 'Organizations',
    isNested: true,
    routes: [
      {
        displayName: 'CTF',
        to: 'DetailsPage?abbreviation=CTF',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
      {
        displayName: 'NTAP',
        to: 'DetailsPage?abbreviation=NTAP',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
      {
        displayName: 'GFF',
        to: 'DetailsPage?abbreviation=GFF',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
      {
        displayName: 'NCI DHART SPORE',
        to: 'DetailsPage?fundingAgency=NIH-NCI',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
      {
        displayName: 'CDMRP NFRP',
        to: 'DetailsPage?abbreviation=CDMRP',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
      {
        displayName: 'NFRI',
        to: 'DetailsPage?abbreviation=NFRI',
        isNested: false,
        synapseConfigArray: organizationDetailsPage,
      },
    ],
  },
  {
    to: 'About',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'About',
        props: {
          ownerId: 'syn5702691',
          wikiId: '583906',
        },
      },
    ],
  },
  {
    isNested: false,
    displayName: 'News',
    to: undefined,
    target: '_blank',
    link: 'https://news.nfdataportal.org/',
    synapseConfigArray: [],
  },
  {
    isNested: false,
    displayName: 'Docs',
    to: undefined,
    target: '_blank',
    link: 'https://nf-osi.github.io/',
    synapseConfigArray: [],
  },
]

export default routes
