import { GenericRoute } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import {
  datasets,
  files,
  studies,
  publications,
  tools,
  initiatives,
  hackathons,
} from './synapseConfigs'
import {
  newStudiesSql,
  studyHeaderIconOptions,
  studyCardConfiguration,
  studiesDetailPage,
} from './synapseConfigs/studies'
import {
  hackathonCardConfiguration,
  hackathonsDetailPage,
} from './synapseConfigs/hackathons'

import {
  initiativeCardConfiguration,
  initiativeDetailsPageConfiguration,
} from './synapseConfigs/initiatives'
import routeControlWrapperProps from './routeControlWrapperProps'
import { facetAliases } from './synapseConfigs/commonProps'
import {
  organizationCardSchema,
  organizationDetailsPage,
  organizationDetailsPageLinkConfig,
} from './organizations'
import {
  fundersSql,
  hackathonsSql,
  initiativesSql,
  peopleSql,
  studiesSql,
} from './resources'
import { toolsDetailsPage } from './synapseConfigs/tools'
import datasetsV2, { datasetsDetailsPage } from './synapseConfigs/datasetsV2'

const limit = 3

const routes: GenericRoute[] = [
  {
    path: '',
    exact: true,
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
              title: "Children's Tumor Foundation",
              ownerId: 'syn26451327',
              wikiId: '614272',
            },
            {
              title: 'Neurofibromatosis Therapeutic Acceleration Program',
              ownerId: 'syn26451327',
              wikiId: '614277',
            },
            {
              title: 'Gilbert Family Foundation',
              ownerId: 'syn26451327',
              wikiId: '614275',
            },
            {
              title: 'DoD CDMRP Neurofibromatosis Research Program',
              ownerId: 'syn26451327',
              wikiId: '614274',
            },
            {
              title: 'DHART SPORE',
              ownerId: 'syn26451327',
              wikiId: '614273',
            },
            {
              title: 'Neurofibromatosis Research Initiative',
              ownerId: 'syn26451327',
              wikiId: '614276',
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
          sql: fundersSql,
          type: SynapseConstants.GENERIC_CARD,
          titleLinkConfig: organizationDetailsPageLinkConfig,
          genericCardSchema: {
            ...organizationCardSchema,
            imageFileHandleColumnName: 'cardLogo',
          },
          descriptionConfig: {
            showFullDescriptionByDefault: true,
          },
          ctaLinkConfig: {
            text: 'Visit Website',
            link: 'website',
          },
        },
      },
      {
        name: 'RssFeedCards',
        title: "What's New",
        centerTitle: true,
        outsideContainerClassName: 'home-spacer home-bg-dark',
        props: {
          url: 'https://news.nfdataportal.org',
          itemsToShow: 3,
          allowCategories: [
            'Newsletter',
            'Hackathon',
            'Publication',
            'Funding',
          ],
          // mailChimpListName: 'NF quarterly newsletter',
          // mailChimpUrl:'https://sagebase.us7.list-manage.com/subscribe/post?u=abcdefghi...',
          lockedColumn: {
            value: 'featured',
          },
        },
      },
    ],
  },
  {
    path: 'Browse Tools',
    exact: true,
    synapseConfigArray: [
      {
        name: 'BrowseToolsPage',
        props: undefined,
        isOutsideContainer: true,
      },
    ],
  },
  {
    path: 'Explore',
    routes: [
      {
        path: 'Initiatives',
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                outsideContainerClassName: 'container-fluid',
                props: {
                  ...routeControlWrapperProps,
                  synapseConfig: initiatives,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: true,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  sqlOperator: '=',
                  isHeader: true,

                  ...initiativeCardConfiguration,
                  facetAliases,
                  sql: initiativesSql,
                },
              },
              {
                name: 'DetailsPage',
                isOutsideContainer: false,
                props: initiativeDetailsPageConfiguration,
                containerClassName: 'container-full-width',
              },
            ],
          },
        ],
      },
      {
        path: 'Studies',
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                props: {
                  ...routeControlWrapperProps,
                  synapseConfig: studies,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            routes: [
              {
                path: '',
                synapseConfigArray: [
                  {
                    name: 'CardContainerLogic',
                    isOutsideContainer: true,
                    props: {
                      sqlOperator: '=',
                      isHeader: true,

                      ...studyCardConfiguration,
                      facetAliases,
                      iconOptions: studyHeaderIconOptions,
                      secondaryLabelLimit: Infinity,
                      sql: studiesSql,
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
        ],
      },
      {
        exact: true,
        path: 'Datasets',
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            props: {
              ...routeControlWrapperProps,
              synapseConfig: datasets,
            },
          },
        ],
      },
      {
        path: 'DatasetsV2',
        hideRouteFromNavbar: true,
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                props: {
                  ...routeControlWrapperProps,
                  synapseConfig: datasetsV2,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: true,
            synapseConfigArray: datasetsDetailsPage,
          },
        ],
      },
      {
        exact: true,
        path: 'Files',
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            props: {
              ...routeControlWrapperProps,
              synapseConfig: files,
            },
          },
        ],
      },
      {
        exact: true,
        path: 'Publications',
        synapseConfigArray: [
          {
            name: 'RouteControlWrapper',
            isOutsideContainer: true,
            props: {
              ...routeControlWrapperProps,
              synapseConfig: publications,
            },
          },
        ],
      },
      {
        path: 'Tools',
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                props: {
                  ...routeControlWrapperProps,
                  synapseConfig: tools,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: false,
            synapseConfigArray: toolsDetailsPage,
          },
        ],
      },
      {
        path: 'Hackathon',
        displayName: 'Hackathon Projects',
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                props: {
                  ...routeControlWrapperProps,
                  synapseConfig: hackathons,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  sqlOperator: '=',
                  isHeader: true,
                  ...hackathonCardConfiguration,
                  facetAliases: { ...facetAliases, studyStatus: 'Status' },
                  secondaryLabelLimit: Infinity,
                  sql: hackathonsSql,
                },
              },
              {
                name: 'DetailsPage',
                isOutsideContainer: false,
                props: hackathonsDetailPage,
                containerClassName: 'container-full-width',
              },
            ],
          },
        ],
      },
      {
        exact: true,
        path: 'Hackathon Projects',
        hideRouteFromNavbar: true,
        synapseConfigArray: [
          // PORTALS-2277 - Renamed "Hackathon Projects" to "Hackathon"
          {
            name: 'RedirectWithQuery',
            props: {
              exact: false,
              strict: false,
              from: 'Hackathon Projects',
              to: 'Hackathon',
            },
          },
        ],
      },
    ],
  },
  {
    path: 'Organizations',
    routes: [
      {
        hideRouteFromNavbar: true,
        path: 'DetailsPage',
        synapseConfigArray: organizationDetailsPage,
      },
      {
        displayName: 'CTF',
        path: 'DetailsPage?abbreviation=CTF',
      },
      {
        displayName: 'NTAP',
        path: 'DetailsPage?abbreviation=NTAP',
      },
      {
        displayName: 'GFF',
        path: 'DetailsPage?abbreviation=GFF',
      },
      {
        displayName: 'NCI DHART SPORE',
        path: 'DetailsPage?fundingAgency=NIH-NCI',
      },
      {
        displayName: 'CDMRP NFRP',
        path: 'DetailsPage?abbreviation=CDMRP',
      },
      {
        displayName: 'NFRI',
        path: 'DetailsPage?abbreviation=NFRI',
      },
    ],
  },

  {
    path: 'About',
    exact: true,
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'About',
        props: {
          ownerId: 'syn26451327',
          wikiId: '614265',
        },
      },
    ],
  },
  {
    exact: true,
    displayName: 'Contribute Data',
    path: undefined,
    target: '_blank',
    link: 'https://help.nf.synapse.org/NFdocs/How-to-Share-Data-(an-Overview).1994489966.html',
    synapseConfigArray: [],
  },
  {
    exact: true,
    displayName: 'News',
    path: undefined,
    target: '_blank',
    link: 'https://news.nfdataportal.org/',
    synapseConfigArray: [],
  },
  {
    exact: true,
    displayName: 'Help',
    path: undefined,
    target: '_blank',
    link: 'https://help.nf.synapse.org/',
    synapseConfigArray: [],
  },
]

export default routes
