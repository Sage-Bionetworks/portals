import { SynapseConfig } from "types/portal-config";

const news: SynapseConfig = {
  name: 'NewsFeedMenu',
    props: {
      menuConfig: [
        {
          feedName:'Data Releases',
          feedUrl:'https://portalnews.wpengine.com/?feed=rss2&cat=4',
          defaultItemsToShow:3,
        },
        {
          feedName:'Updates',
          feedUrl:'https://portalnews.wpengine.com/?feed=rss2&cat=3',
          defaultItemsToShow:3,
          twitterFeedUrl:'https://twitter.com/AMPADPortal?ref_src=twsrc%5Etfw'
        },
        {
          feedName:'Newsletter',
          feedUrl:'https://portalnews.wpengine.com/?feed=rss2&cat=5',
          defaultItemsToShow:3,
          mailChimpSignupText:'Subscribe to the AMP-AD quarterly newsletter. Use the unsubscribe link in those e-mails to opt out at any time.  We will not share your email with any third parties or use it for any other purposes',
          mailChimpUrl:'https://sagebase.us7.list-manage.com/subscribe/post?u=b146de537186191a9d2110f3a&amp;id=96b614587a'
        },
      ]
    }
}

export default news
