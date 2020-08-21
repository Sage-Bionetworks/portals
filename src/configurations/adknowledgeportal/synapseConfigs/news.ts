import { SynapseConfigArray } from 'types/portal-config'

const news: SynapseConfigArray = [
  {
    name: 'Markdown',
    title: 'News',
    props: {
      markdown:
        'The latest from the AD Community, including the latest data releases, updates such as events and stories, and links to the quarterly newsletter\n---------',
    },
  },
  {
    name: 'NewsFeedMenu',
    props: {
      menuConfig: [
        {
          feedName: 'Updates',
          feedDescription:
            'The AD Knowledge Portal reaches the broader scientific community through multiple channels that encourage open-science collaborations. News updates include videos, events, and presentations that highlight the community behind the data.',
          feedUrl: 'https://portalnews.wpengine.com/?feed=rss2',
          feedKeyValue: { cat: '3' },
          defaultItemsToShow: 3,
          twitterFeedUrl: 'https://twitter.com/AMPADPortal?ref_src=twsrc%5Etfw',
        },
        {
          feedName: 'Data Releases',
          feedDescription:
            "The AD Knowledge Portal releases new Alzheimer's disease data twice annually, in May and November. Data releases may include new data, analyses, and results; as well as changes and updates to previously released data.",
          feedUrl: 'https://portalnews.wpengine.com/?feed=rss2',
          feedKeyValue: { cat: '4' },
          defaultItemsToShow: 3,
        },
        {
          feedName: 'Newsletter',
          feedDescription:
            'The AD Knowledge Portal sends a quarterly newsletter to interested members of the scientific community, delivering consolidated information and updates related to the Portal.',
          feedUrl: 'https://portalnews.wpengine.com/?feed=rss2',
          feedKeyValue: { cat: '5' },
          defaultItemsToShow: 3,
          mailChimpListName: 'Quarterly AD Knowledge Portal Newsletter',
          mailChimpUrl:
            'https://sagebase.us7.list-manage.com/subscribe/post?u=b146de537186191a9d2110f3a&amp;id=96b614587a',
        },
        {
          feedName: 'Webinars',
          feedDescription:
            'The AMP-AD Knowledge Portal webinar series is an opportunity to discuss data, analysis, and tools related to the Portal. It features speakers from the AMP-AD Target Discovery Program and associated consortia.',
          feedUrl: 'https://portalnews.wpengine.com/?feed=rss2',
          feedKeyValue: { cat: '93' },
          defaultItemsToShow: 3,
        },
      ],
      routeToNewsFeed: '/News',
    },
  },
]

export default news
