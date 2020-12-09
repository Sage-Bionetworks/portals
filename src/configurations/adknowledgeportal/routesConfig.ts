import { GenericRoute } from 'types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import {
  projects,
  studies,
  data,
  people,
  programs,
  publications,
} from './synapseConfigs'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import {
  studyCardConfiguration,
  studiesProgrammaticRouteConfig,
} from './synapseConfigs/studies'
import { projectCardConfiguration, projectsDetailsPageConfiguration } from './synapseConfigs/projects'
import { results } from './synapseConfigs/results'
import { iconHeaderOptions } from './synapseConfigs/iconOptions'
import { programCardConfiguration } from './synapseConfigs/programs'
import { programsHomePageConfig } from './synapseConfigs/programsHomePage'
import experimentalTools from './synapseConfigs/experimental_tools'
import computationalTools from './synapseConfigs/computational_tools'
import { projectsSql, studiesSql, peopleSql } from './resources'

const routes: GenericRoute[] = [
  {
    to: '',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Programs',
        title: 'Programs',
        centerTitle: true,
        props: {
          ...programsHomePageConfig,
        },
      },
      {
        name: 'FeaturedDataTabs',
        title: 'Featured Data',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer home-bg-dark',
        props: {
          sql:'select * from syn11346063',
          rgbIndex: 3,
          configs: [{
            title: 'Human Studies',
            icon: 'PERSON',
            explorePagePath:'/Explore/Studies',
            exploreObjectType:'Studies',
            plotsConfig: {
              configs: [{
                title:'The Religious Orders and Memory and Aging Project Study',
                facetsToPlot:['dataType', 'assay'],
                selectFacetColumnName:'study',
                selectFacetColumnValue:'ROSMAP',
                detailsPagePath:'/Explore/Studies/DetailsPage?Study=syn3219045'
              },
              {
                title:'The Mount Sinai Brain Bank Study',
                facetsToPlot:['dataType', 'assay'],
                selectFacetColumnName:'study',
                selectFacetColumnValue:'MSBB',
                detailsPagePath:'/Explore/Studies/DetailsPage?Study=syn3159438'
              },
              {
                title:'The RNAseq Harmonization Study',
                facetsToPlot:['dataType', 'assay'],
                selectFacetColumnName:'study',
                selectFacetColumnValue:'rnaSeqReprocessing',
                detailsPagePath:'/Explore/Studies/DetailsPage?Study=syn9702085'
              }]
            }
          },
          {
            title: 'Animal Model Studies',
            icon: 'MOUSE',
            explorePagePath:'/Explore/Studies',
            exploreObjectType:'Studies',
            plotsConfig: {
              configs: [{
                title:'The UCI MODEL-AD 5XFAD Study',
                facetsToPlot:['dataType', 'assay'],
                selectFacetColumnName:'study',
                selectFacetColumnValue:'UCI_5XFAD',
                detailsPagePath:'/Explore/Studies/DetailsPage?Study=syn16798076'
              },
              {
                title:'The IU/Jax/Pitt MODEL-AD Primary Screen Study',
                facetsToPlot:['dataType', 'assay'],
                selectFacetColumnName:'study',
                selectFacetColumnValue:'Jax.IU.Pitt_PrimaryScreen',
                detailsPagePath:'/Explore/Studies/DetailsPage?Study=syn21595258'
              },
              {
                title:'The IU/Jax/Pit MODEL-AD APOE/TREM2 Study',
                facetsToPlot:['dataType', 'assay'],
                selectFacetColumnName:'study',
                selectFacetColumnValue:'Jax.IU.Pitt_APOE4.Trem2.R47H',
                detailsPagePath:'/Explore/Studies/DetailsPage?Study=syn17095980'
              }
            ]}
          }]        
        },
      },
      {
        name: 'UserCardListRotate',
        title: 'Our People and Institutions',
        outsideContainerClassName: 'home-spacer',
        centerTitle: true,
        props: {
          sql: `${peopleSql} where isFeatured=true`,
          count: 3,
          size: SynapseConstants.MEDIUM_USER_CARD,
          useQueryResultUserData: true,
          summaryLink: 'Explore/People',
          summaryLinkText: 'EXPLORE ALL PEOPLE',
        },
      },
      {
        name: 'RssFeedCards',
        title: 'What\'s New',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer home-bg-dark',
        props: {
          url: 'https://news.adknowledgeportal.org',
          itemsToShow:3,
          allowCategories: ['Data Release', 'News', 'Webinar','rosMAP'],
          mailChimpListName: 'AMP-AD quarterly newsletter',
          mailChimpUrl:'https://sagebase.us7.list-manage.com/subscribe/post?u=b146de537186191a9d2110f3a&amp;id=96b614587a',
          lockedFacet: {
            value: 'what\'s-new'
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
        to: 'Programs',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: {
                name: 'CardContainerLogic',
                props: {
                  ...programs,
                  sql: 'SELECT  * FROM syn17024173',
                },
              },
            },
          },
        ],
        routes: [
          {
            isNested: false,
            to: 'DetailsPage',
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  sql: 'SELECT  * FROM syn17024173',
                  isHeader: true,
                  ...programCardConfiguration,
                  genericCardSchema: {
                    ...programCardConfiguration.genericCardSchema!,
                    description: 'Long Description',
                  },
                  iconOptions: iconHeaderOptions,
                  backgroundColor: '#5960A5',
                },
              },
              {
                name: 'CardContainerLogic',
                title: 'Explore Projects',
                props: {
                  ...projectCardConfiguration,
                  sql: projectsSql,
                },
              },
              {
                name: 'CardContainerLogic',
                title: 'Explore Studies',
                props: {
                  ...studyCardConfiguration,
                  sql: studiesSql,
                },
              },

            ],
          },
        ],
      },
      {
        isNested: true,
        to: 'Projects',
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  sql: projectsSql,
                  isHeader: true,
                  ...projectCardConfiguration,
                  backgroundColor: '#DE9A1F',
                },
              },
              {
                name: 'DetailsPage',
                props: projectsDetailsPageConfiguration,
              },
            ],
          },
        ],
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: projects.explorePageSynapseObject,
            },
          },
        ],
      },
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
            synapseConfigArray: studiesProgrammaticRouteConfig,
          },
        ],
      },
      {
        isNested: false,
        to: 'Data',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: data.explorePageSynapseObject,
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
        to: 'People',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: people.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        isNested: false,
        to: 'Experimental Tools',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: experimentalTools.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        isNested: false,
        to: 'Computational Tools',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: computationalTools.explorePageSynapseObject,
            },
          },
        ],
      },
      {
        isNested: false,
        to: 'Results',
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'Explore',
            containerClassName: 'container-full-width',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: results,
            },
          },
        ],
      },
    ],
  },
  {
    isNested: false,
    to: 'Analytical Workspace',
    synapseConfigArray: [
      {
        name: 'Markdown',
        props: {
          ownerId: 'syn22300949',
          wikiId: '604940',
        },
      },
    ],
  },
  {
    to: 'DataAccess',
    displayName: 'Data Access',
    isNested: true,
    routes: [
      {
        displayName: 'Getting Access to Data',
        isNested: false,
        to: 'Instructions',
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'GETTING ACCESS TO DATA',
            props: {
              ownerId: 'syn12666371',
              wikiId: '585317',
            },
          },
        ],
      },
      {
        to: 'DataUseCertificates',
        displayName: 'Data Use Certificates',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'Data Use Certificates',
            props: {
              ownerId: 'syn12666371',
              wikiId: '585318',
            },
          },
        ],
      },
      {
        displayName: 'Acknowledging Data Use',
        isNested: false,
        to: 'AcknowledgementStatements',
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'ACKNOWLEDGEMENT STATEMENTS',
            props: {
              ownerId: 'syn2580853',
              wikiId: '584597',
            },
          },
        ],
      },
      {
        displayName: 'Data Use Proposals',
        isNested: false,
        to: 'DataUseProposals',
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'DATA USE PROPOSALS',
            props: {
              ownerId: 'syn2580853',
              wikiId: '409843',
            },
          },
        ],
      },
    ],
  },
  // Uncomment to expose Contribute route (once research team is monitoring submissions)
  {
    isNested: true,
    to: 'Contribute',
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'Contribute',
        className: 'amp-project-component',
        props: {
          ownerId: 'syn12666371',
          wikiId: '600033',
        },
      },
      {
        name: 'SynapseFormSubmissionsGrid',
        props: {
          pathpart: '/Contribute/FormSubmission',
          formGroupId: '11',
          itemNoun: 'contribution-request',
          formClass: 'contribution-request',
        },
      },
    ],
    routes: [
      {
        isNested: false,
        to: 'FormSubmission',
        hideRouteFromNavbar: true,
        synapseConfigArray: [
          {
            name: 'Markdown',
            props: {
              ownerId: 'syn12666371',
              wikiId: '600034',
            },
          },
          {
            name: 'SynapseFormWrapper',
            props: {
              formSchemaEntityId: 'syn20692910',
              fileNamePath: 'study.submission_name',
              formUiSchemaEntityId: 'syn20692911',
              formNavSchemaEntityId: 'syn20968007',
              isWizardMode: true,
              formTitle: 'Your Contribution Request',
              formClass: 'contribution-request',
            },
          },
        ],
      },
    ],
  },
  {
    isNested: false,
    to: 'About',
    hideRouteFromNavbar: true,
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'About',
        props: {
          wikiId: '581939',
          ownerId: 'syn12666371',
        },
      },
    ],
  },
  {
    isNested: false,
    displayName: 'News',
    to: undefined,
    target: '_blank',
    link: 'https://news.adknowledgeportal.org/',
    synapseConfigArray: [],
  },
  {
    to: 'Help',
    isNested: true,
    routes: [
      {
        isNested: false,
        to: 'FAQ',
        synapseConfigArray: [
          {
            name: 'Markdown',
            title: 'FAQ',
            props: {
              ownerId: 'syn12666371',
              wikiId: '605050',
            },
          },
        ],
      },
      {
        isNested: false,
        displayName: 'Forum',
        to: undefined,
        link: 'https://www.synapse.org/#!Synapse:syn2580853/discussion/default',
        synapseConfigArray: [],
      },
      {
        isNested: false,
        displayName: 'Contact Us',
        to: undefined,
        link: 'mailto:ampadportal@sagebionetworks.org',
        synapseConfigArray: [],
      },
    ],
  },
]

export default routes
